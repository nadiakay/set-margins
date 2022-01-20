let margin = 20;

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ margin });
  console.log("margin set to ", margin);
});
