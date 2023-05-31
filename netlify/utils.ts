import fetch from "node-fetch";

const request = async (url: string, body: object = {}) =>
  (await fetch(url, body)).json();

export { request };
