
chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: {tabId: tab.id},
    function: toggleDirection
  });
});

function toggleDirection() {
  const htmlElement = document.documentElement;
  const currentDir = htmlElement.getAttribute('dir');
  
  if (currentDir === 'ltr') {
    htmlElement.setAttribute('dir', 'rtl');
  } else if (currentDir === 'rtl') {
    htmlElement.setAttribute('dir', 'ltr');
  } else {
    htmlElement.setAttribute('dir', 'rtl');
  }
}
