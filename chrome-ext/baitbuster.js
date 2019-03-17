import { getCanonicalUrl } from "./canonicalize.js";

const SUBREDDIT_ENDPOINT = 'https://www.reddit.com/r/baitbuster';

/**
 * Gets the baitbuster subreddit post about a given URL if it exists.
 * @param url the URL we care about. We'll see if there are any subreddit posts about it
 * @returns {Promise<string|null>} the ID of the post in the subreddit, or null if none was found
 */
async function getPostIdForUrl(url) {
  url = await getCanonicalUrl(url);

  // TODO for security/privacy, figure out a way not to send the URL to reddit
  const queryUrl = `${SUBREDDIT_ENDPOINT}/search.json?restrict_sr=on&q=url:${url}&sort=score`;
  const response = await fetch(queryUrl, {
    headers: {
      "Content-Type": "application/json"
    }
  });
  const parsedResponse = await response.json();

  // TODO handle the case that there are multiple posts for this URL (which there shouldn't be, but just in case)
  // TODO use some util to do safe access on nested properties
  return parsedResponse &&
         parsedResponse.data &&
         parsedResponse.data.children[0] &&
         parsedResponse.data.children[0].data &&
         parsedResponse.data.children[0].data.id;
}

/**
 * Redirect to the baitbuster page if the given page is clickbait
 * @param url the URL to test for clickbaity-ness
 * @returns {Promise<string|null>} the URL to redirect to, or null if this is not clickbait
 */
export async function getBuster(url) {
  // Get the post from the subreddit if it exists
  const postId = await getPostIdForUrl(url);

  if (postId) {
    return `${SUBREDDIT_ENDPOINT}/comments/${postId}`;
  } else {
    return null;
  }
}
