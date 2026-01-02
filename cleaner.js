(function() {
    function executeClean() {
        console.log("Quick Archive: Cleaning page...");
        
        const archiveSelectors = [
            '#HEADER', 
            '#div_top_bar',
            'div[id*="top_bar"]', 
            'div[style*="position:fixed"][style*="z-index: 9999"]', // The "Share" button overlay
            'a[href^="https://archive.ph/download"]'
        ];

        archiveSelectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(el => {
                if (el instanceof HTMLElement) {
                    el.style.display = 'none';
                }
            });
        });

        document.body.style.overflowX = "hidden";
        document.documentElement.style.overflowX = "hidden";
    }

    chrome.storage.sync.get({ autoClean: false }, (items) => {
        if (items.autoClean) {
            executeClean();
        }
    });
})();