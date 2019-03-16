async function getRedirectedUrl(url) {
  try {
    const response = await fetch(url, {
      redirect: "follow"
    });

    // TODO test this to see if it actually does follow redirects
    return response.url;
  } catch (ex) {
    console.error(`getRedirectedUrl url=${url} error=${ex}`);
    return url;
  }
}

export async function getCanonicalUrl(url) {
  try {
    const redirectedUrl = await getRedirectedUrl(url);
    const encodedRedirectedUrl = encodeURI(redirectedUrl);

    const canonicalQueryUrl = `https://canonicalurl.info/get?url=${encodedRedirectedUrl}`;
    const response = await fetch(canonicalQueryUrl, {
      headers: {
        "Content-Type": "application/json"
      }
    });

    const parsedResponse = await response.json();
    if (!parsedResponse.result === 'ok') {
      // TODO throw an error or something
    }

    return parsedResponse.url;
  } catch (ex) {
    console.error(`getCanonicalUrl url=${url} error=${ex}`);
    return url;
  }
}
