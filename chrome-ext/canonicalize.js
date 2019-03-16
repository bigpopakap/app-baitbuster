const axios = require('./node_modules/axios');

debugger;
const canonicalizer = axios.create({
  baseURL: 'https://canonicalurl.info/',
  timeout: 500
});

export async function getRedirectedUrl(url) {
  return url;
}

export async function getCanonicalUrl(url) {
  try {
    debugger;
    const response = await canonicalizer.get(`/get?url=${encodeURI(url)}`);
    console.log(response);
    debugger;
  } catch {
    debugger;
  }
}
