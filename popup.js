let setMarginBtn = document.getElementById("setMarginBtn");
let inputMargin = document.getElementById("inputMargin");

chrome.storage.sync.set({ margin: 20 });

setMarginBtn.addEventListener("click", async () => {
  let newMargin = inputMargin.value;
  if (!newMargin) newMargin = 20;
  chrome.storage.sync.set({ margin: newMargin });

  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: renderWithMargins
  });
});

function renderWithMargins() {
  let width = window.innerWidth;

  chrome.storage.sync.get("margin", ({ margin }) => {
    let newWidth = width - margin * 20;
    document.body.style.width = newWidth;
    document.body.style.margin = "auto";
  });
}
