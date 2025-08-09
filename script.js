const icons = {
  active: {
    16: "icons/icon16-active.png",
    32: "icons/icon32-active.png",
    48: "icons/icon48-active.png",
    128: "icons/icon128-active.png"
  },
  inactive: {
    16: "icons/icon16.png",
    32: "icons/icon32.png",
    48: "icons/icon48.png",
    128: "icons/icon128.png"
  }
};

chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: {tabId: tab.id},
    function: toggleDirection
  });
});

chrome.runtime.onMessage.addListener((msg, sender) => {
  if (msg.type === "change-icon" && sender.tab) {
    chrome.action.setIcon({
      path: msg.state === "rtl" ? icons.active : icons.inactive,
      tabId: sender.tab.id
    });
  }
});

function toggleDirection() {
  const htmlElement = document.documentElement;
  const currentDir = htmlElement.getAttribute('dir');
  
  if (currentDir === 'ltr') {
    htmlElement.setAttribute('dir', 'rtl');
    chrome.runtime.sendMessage({ type: "change-icon", state: "rtl" });
  } else if (currentDir === 'rtl') {
    htmlElement.setAttribute('dir', 'ltr');
    chrome.runtime.sendMessage({ type: "change-icon", state: "ltr" });
  } else {
    htmlElement.setAttribute('dir', 'rtl');
    chrome.runtime.sendMessage({ type: "change-icon", state: "rtl" });
  }
}
