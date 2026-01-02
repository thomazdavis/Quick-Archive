// @ts-check

function cleanUrlForPopup(urlStr) {
    try {
        const url = new URL(urlStr);
        const paramsToDelete = [];
        url.searchParams.forEach((value, key) => {
            if (key.startsWith("utm_") || key === "fbclid" || key === "gclid" || key === "ref") paramsToDelete.push(key);
        });
        paramsToDelete.forEach(p => url.searchParams.delete(p));
        return url.toString();
    } catch (e) { return urlStr; }
}

document.addEventListener('DOMContentLoaded', () => {
    
    chrome.storage.sync.get({
        openMode: 'newTab',
        autoClean: false
    }, (items) => {
        const settings = /** @type {{ openMode: string, autoClean: boolean }} */ (items);

        // Set Checkbox
        const cleanCheckbox = /** @type {HTMLInputElement} */ (document.getElementById('autoClean'));
        if (cleanCheckbox) cleanCheckbox.checked = settings.autoClean;

        // Set Radio Button
        const radio = /** @type {HTMLInputElement} */ (
            document.querySelector(`input[name="openMode"][value="${settings.openMode}"]`)
        );
        if (radio) radio.checked = true;
    });

    // Save settings
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('change', () => {
            const openMode = /** @type {HTMLInputElement} */ (document.querySelector('input[name="openMode"]:checked')).value;
            const autoClean = /** @type {HTMLInputElement} */ (document.getElementById('autoClean')).checked;

            chrome.storage.sync.set({ openMode, autoClean }, () => {
                const status = document.getElementById('status');
                status.style.opacity = '1';
                setTimeout(() => { status.style.opacity = '0'; }, 1000);
            });
        });
    });

    document.getElementById('archiveNow').addEventListener('click', () => {
        // Get current tab
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const currentTab = tabs[0];
            if (currentTab && currentTab.url) {
                const cleanLink = cleanUrlForPopup(currentTab.url);
                const archiveUrl = `https://archive.ph/?run=1&url=${encodeURIComponent(cleanLink)}`;
                
                // Read setting to decide how to open
                const openMode = /** @type {HTMLInputElement} */ (document.querySelector('input[name="openMode"]:checked')).value;
                
                if (openMode === 'sameTab') {
                    chrome.tabs.update(currentTab.id, { url: archiveUrl });
                } else {
                    chrome.tabs.create({ url: archiveUrl });
                }
            }
        });
    });
});