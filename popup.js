let setMarginBtn = document.getElementById("setMarginBtn");
let inputMargin = document.getElementById("inputMargin");

const initMargin = 200;
inputMargin.placeholder = initMargin;

chrome.storage.sync.set({ margin: initMargin });

setMarginBtn.addEventListener("click", async () => {
  let newMargin = inputMargin.value;
  if (!newMargin) newMargin = initMargin;
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
    let newWidth = width - margin * 2;
    document.body.style.width = newWidth;
    document.body.style.margin = "auto";
  });
}
