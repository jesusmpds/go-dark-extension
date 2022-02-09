//Handle Icon change if there is a theme in LocalStorage
if (localStorage.getItem("theme")) {
  const theme = setPageDarkTheme();
  chrome.runtime.sendMessage({
    action: "updateIcon",
    value: theme,
  });
}

//Sets the dark theme
function setPageDarkTheme() {
  let currentTheme = localStorage.getItem("theme");
  if (currentTheme === "light" || null) {
    document.body.classList.toggle("dark-theme");
  } else {
    document.body.classList.toggle("dark-theme");
  }
  let theme = document.body.classList.contains("dark-theme") ? "dark" : "light";
  localStorage.setItem("theme", theme);
  return theme;
}

//Receives message from background whe user clicks on icon to set or unset dark mode
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "changeTheme") {
    let theme = setPageDarkTheme();
    sendResponse({ theme: theme });
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "changeIcon") {
    const currentTheme = localStorage.getItem("theme");
    sendResponse({ theme: currentTheme });
  }
});
