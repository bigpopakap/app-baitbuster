/**
 * Follows any redirects to get to a final stable URL
 * @param url the url to start following
 * @returns {Promise<string>} the resolved URL
 * @throws if there was a network error along the way. For example:
 *         * some redirect along the way required authentication
 */
async function getRedirectedUrl(url) {
  try {
    // Security/privacy are OK here because we're not sending this URL to a different site,
    // we're "sending" it to the URL itself
    const response = await fetch(url, {
      redirect: "follow"
    });

    // TODO test this to see if it actually does follow redirects
    return response.url;
  } catch (ex) {
    console.error(`getRedirectedUrl url=${url} error=${ex}`);
    throw ex;
  }
}

/**
 * Gets a canonical URL. This is useful to be able to uniquely identify pages without random
 * query params for tracking/utm_campaign etc.
 * @param url the URL to resolve for a canonical
 * @returns {Promise<string>} the resolved canonical URL, or the given URL itself if there was an error
 *                            finding the canonical
 */
export async function getCanonicalUrl(url) {
  try {
    const redirectedUrl = await getRedirectedUrl(url);
    const encodedRedirectedUrl = encodeURI(redirectedUrl);

    // TODO for security/privacy, figure out a way not to send the URL to this API
    const canonicalQueryUrl = `https://canonicalurl.info/get?url=${encodedRedirectedUrl}`;
    const response = await fetch(canonicalQueryUrl, {
      headers: {
        "Content-Type": "application/json"
      }
    });

    const parsedResponse = await response.json();
    if (parsedResponse.result !== 'ok') {
      // TODO throw an error or something
    }

    return parsedResponse.url;
  } catch (ex) {
    console.error(`getCanonicalUrl url=${url} error=${ex}`);
    return url;
  }
}
