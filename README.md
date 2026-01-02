# Quick Archive Extension

A streamlined Chrome Extension that cleans paywalled URLs and opens them in **archive.ph** with a single click. It features a built-in "Reader Mode" to remove clutter from archived pages.

## Features

* **Smart URL Cleaning:** Automatically strips tracking parameters (UTM, fbclid, gclid) before archiving to ensure clean snapshots.
* **Two Ways to Archive:**
    * **Right-Click:** Use the Context Menu (`Unlock & Archive`) on any link or page.
    * **Popup:** Click the extension icon and hit "Archive Current Tab".
* **Reader Mode (Auto-Clean):** Automatically removes the `archive.ph` header banners and ads for a distraction-free reading experience.
* **Configurable:** Choose between opening in a **New Tab** or **Same Tab**.

## Installation (Developer Mode)

Since this is a custom tool, you will install it manually:

1.  **Download** or clone this repository to your computer.
2.  Open Chrome and navigate to `chrome://extensions`.
3.  Toggle **Developer mode** in the top right corner.
4.  Click **Load unpacked**.
5.  Select the folder containing `manifest.json`.
