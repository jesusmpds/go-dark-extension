chrome.action.onClicked.addListener(async () => {
  let tab = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.tabs.sendMessage(tab[0].id, { theme: "change" }, (response) => {
    console.log(response.theme);
    chrome.storage.sync.set({ theme: response.theme });
  });
});
