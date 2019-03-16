import { getCanonicalUrl } from "./canonicalize.js";

export async function getBuster(url) {
  url = await getCanonicalUrl(url);

  const redditQueryUrl = `https://www.reddit.com/r/baitbuster/search.json?restrict_sr=on&q=url:${url}&sort=score`;
  const response = await fetch(redditQueryUrl, {
    headers: {
      "Content-Type": "application/json"
    }
  });
  const parsedResponse = await response.json();
  debugger;

  return {
    originalUrl: url,
    redirectUrl: 'https://www.reddit.com/r/baitbuster'
  };
}
