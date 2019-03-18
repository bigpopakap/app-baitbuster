import { getBuster } from "./baitbuster.js";

chrome.webRequest.onBeforeRequest.addListener(async (details) => {
  // TODO figure out how to synchronously redirect so that we don't start loading the site
  //      ex. return { redirectUrl: '...' };

  // TODO don't do any redirects if we're already on or are going to the baitbuster subreddit

  // Asynchronously redirect. This means we'll have already made the request to load the site,
  // but hopefully this will be quick enough that it won't be too jarring to the user.
  const redirectUrl = await getBuster(details.url);
  if (redirectUrl) {
    chrome.pageAction.hide(details.tabId);
    chrome.tabs.update(details.tabId, { url: redirectUrl })
  } else {
    chrome.pageAction.show(details.tabId);
  }
}, {
  urls: ["*://*/*"],
  types: ["main_frame"]
});
