//Helper Funtions ------------------------------------------------
async function getCurrentTab() {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

async function changeThemeIcon(theme) {
  if (theme === "dark") {
    chrome.action.setIcon({ path: "/images/moon_16px.png" });
  } else {
    chrome.action.setIcon({ path: "/images/sun_16px.png" });
  }
}

async function handleClickOnExtensionIcon() {
  let tab = await getCurrentTab();

  chrome.tabs.sendMessage(tab.id, { action: "changeTheme" }, (response) => {
    const { theme } = response;
    changeThemeIcon(theme);
    chrome.storage.sync.set({ theme: theme });
  });
}

// Chrome methods ----------------------------------------------------------------
chrome.tabs.onActivated.addListener(function (activeInfo) {
  try {
    chrome.tabs.sendMessage(
      activeInfo.tabId,
      { action: "changeIcon" },
      (response) => {
        if (response) {
          const { theme } = response;
          changeThemeIcon(theme);
          chrome.storage.sync.set({ theme: theme });
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
});

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  if (msg.action === "updateIcon") changeThemeIcon(msg.value);
});

chrome.action.onClicked.addListener(handleClickOnExtensionIcon);
