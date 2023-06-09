import { request } from "../utils";

const handler = async (event) => {
  const { headers } = event;
  const auth = headers["authorization"];

  if (!auth) {
    console.log({ "User Endpoint": { auth, headers } });
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Unauthorized" }),
    };
  }
  try {
    const currentAddress = (await request(
      "https://api.generaitiv.xyz/v1/consumer/user-info/",
      {
        headers: { Authorization: auth },
      }
    )) as { address: string };

    const user = (await request(
      `https://api.generaitiv.xyz/v1/u/${currentAddress?.address}/`
    )) as { message: string };

    const userCollections = (await request(
      `https://api.generaitiv.xyz/v1/u/${currentAddress?.address}/collections/`,
      {
        headers: {
          Authorization: auth,
        },
      }
    )) as { owner: string }[];

    return {
      statusCode: 200,
      body: JSON.stringify({
        user: user?.message ? { address: currentAddress.address } : user,
        userCollections,
      }),
    };
  } catch (err) {
    console.log({ "User Endpoint": err, event });

    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal server error" }),
    };
  }
};

export { handler };
