let maxWidth = "1200px";

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ maxWidth });
  console.log("maxWidth set to ", maxWidth);
});
