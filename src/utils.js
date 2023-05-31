const request = async (url, body) => (await fetch(url, body)).json();

export { request };
