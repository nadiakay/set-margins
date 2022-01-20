let setMargins = document.getElementById("setMargins");

chrome.storage.sync.get("maxWidth", ({ maxWidth }) => {
  setMargins.innerHTML = `Set max width to ${maxWidth}`;
});

setMargins.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setMargins
  });
});

function setMargins() {
  chrome.storage.sync.get("maxWidth", ({ maxWidth }) => {
    document.body.style.maxWidth = maxWidth;
    document.body.style.margin = "auto";
  });
}
