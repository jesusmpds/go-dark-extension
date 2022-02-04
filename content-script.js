// const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

// let currentTheme = localStorage.getItem("theme");
// if (currentTheme == "dark") {
//   document.body.classList.toggle("dark-theme");
// } else if (currentTheme == "light") {
//   document.body.classList.toggle("light-theme");
// }

function setPageDarkTheme() {
  let currentTheme = getOSPreference();
  if (currentTheme === "dark") {
    // ...then apply the .light-theme class to override those styles
    document.body.classList.toggle("light-theme");
    // Otherwise...
  } else {
    // ...apply the .dark-theme class to override the default light styles
    document.body.classList.toggle("dark-theme");
  }
  let theme = document.body.classList.contains("dark-theme") ? "dark" : "light";
  localStorage.setItem("theme", theme);
  return theme;
}

function getOSPreference() {
  if (!window.matchMedia) return "light";
  const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const isLightMode = window.matchMedia(
    "(prefers-color-scheme: light)"
  ).matches;
  const isNotSpecified = window.matchMedia(
    "(prefers-color-scheme: no-preference)"
  ).matches;
  const hasNoSupport = !isDarkMode && !isLightMode && !isNotSpecified;
  let mode;

  if (isLightMode) {
    mode = "light";
  }

  if (isDarkMode) {
    mode = "dark";
  }

  if (isNotSpecified || hasNoSupport) {
    mode = "light";
  }
  return mode;
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Message from background", message);
  if (message.theme === "change") {
    let theme = setPageDarkTheme();
    sendResponse({ theme: theme });
  }
});
