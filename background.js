// @ts-check

// Setup Menu
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({ id: "archive-page", title: "Unlock and Archive", contexts: ["page", "link"] });
});

// URL Cleaner Helper
function cleanUrl(urlStr) {
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

// Handle Clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "archive-page") {
    const rawUrl = info.linkUrl || info.pageUrl;
    if (rawUrl) {
      const cleanLink = cleanUrl(rawUrl);
      const archiveUrl = `https://archive.ph/?run=1&url=${encodeURIComponent(cleanLink)}`;

      // New Tab vs Same Tab?
      chrome.storage.sync.get({ openMode: 'newTab' }, (items) => {
        if (items.openMode === 'sameTab') {
          chrome.tabs.update(tab.id, { url: archiveUrl });
        } else {
          chrome.tabs.create({ url: archiveUrl });
        }
      });
    }
  } 
});
