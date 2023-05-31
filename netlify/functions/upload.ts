import { request } from "../utils";
import { toHex, padLeft } from "web3-utils";
const handler = async (event) => {
  const { headers, body } = event;

  const { address, slug, token, fileName } = JSON.parse(body);

  const auth = headers["authorization"] || "";

  if (!auth) {
    console.log({ "New Token Endpoint": { auth, headers } });
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Unauthorized" }),
    };
  }

  try {
    const nextTokenId = (await request(
      `https://api.generaitiv.xyz/v1/c/virtual/next/${address}`,
      {
        headers: {
          Authorization: auth,
        },
      }
    )) as { tokenId: string };

    const tokenId = nextTokenId?.tokenId;

    const structuredToken = {
      ...token,
      tokenId,
      attributes: [],
    };
    structuredToken.amount = padLeft(toHex(structuredToken.amount), 64);

    const newToken = await request(
      `https://api.generaitiv.xyz/v1/c/virtual/token/${slug}/${tokenId}`,
      {
        headers: {
          "Content-Type": "Application/json",
          Authorization: auth,
        },
        method: "POST",
        body: JSON.stringify(structuredToken),
      }
    );

    const fileUploadUrl = await request(
      `https://api.generaitiv.xyz/v1/upload/token/${tokenId}/${fileName}`,
      { headers: { Authorization: auth } }
    );

    return {
      statusCode: 200,
      body: JSON.stringify({
        tokenId,
        message: "New Token Complete",
        newToken,
        fileUploadUrl,
      }),
    };
  } catch (err) {
    console.log({ "New Token Endpoint": err, event });
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal server error" }),
    };
  }
};

export { handler };
