import { getRedirectedUrl, getCanonicalUrl } from "./canonicalize.js";

export async function getBuster(originalUrl) {
  debugger;
  if (originalUrl.startsWith('https://www.buzzfeednews.com')) {
    originalUrl = await getRedirectedUrl(originalUrl);
    originalUrl = await getCanonicalUrl(originalUrl);

    return {
      originalUrl, redirectUrl: 'https://www.reddit.com/r/baitbuster'
    };
  } else {
    return {
      originalUrl
    };
  }
}
