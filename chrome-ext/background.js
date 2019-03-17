import { getBuster } from "./baitbuster.js";

chrome.webRequest.onBeforeRequest.addListener(async (details) => {
  // TODO figure out how to synchronously redirect so that we don't start loading the site
  //      ex. return { redirectUrl: '...' };

  // Asynchronously redirect. This means we'll have already made the request to load the site,
  // but hopefully this will be quick enough that it won't be too jarring to the user.
  const redirectUrl = await getBuster(details.url);
  if (redirectUrl) {
    chrome.tabs.update(details.tabId, { url: redirectUrl })
  }
}, {
  urls: ["*://*/*"],
  types: ["main_frame"]
}, ["blocking"]);
