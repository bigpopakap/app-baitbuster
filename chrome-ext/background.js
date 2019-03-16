import { getBuster } from "./baitbuster.js";

chrome.webRequest.onBeforeRequest.addListener(async (details) => {
  // TODO figure out how to synchronously redirect so that we don't feed the bloodthirsty clickbaiter
  //      ex. return { redirectUrl: '...' };

  // Asynchronously redirect. Unfortunately, this feeds the clickbait bloodsucker exactly
  // what it wants: page views. But to the user, this will hopefully happen quick enough
  // that it looks like they never even went to the clickbait garbage trap. And as a bonus,
  // they won't click on ads or other suggested foolish articles on that garbage site!
  const buster = await getBuster(details.url);
  if (buster.redirectUrl) {
    chrome.tabs.update(details.tabId, { url: buster.redirectUrl })
  }
}, {
  urls: ["*://*/*"],
  types: ["main_frame"]
}, ["blocking"]);
