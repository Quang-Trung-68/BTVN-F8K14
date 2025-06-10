// api post a account to call login api

const postLoginMethod = async (body) => {
  try {
    const response = await fetch(
      "https://8fty49z8qb.execute-api.ap-southeast-1.amazonaws.com/login",
      {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );
    const responseConvert = await response.json();
    return responseConvert;
  } catch (error) {
    console.log(error);
  }
};

// api get token to save to local storage
const getPostMethod = async (token) => {
  try {
    const response = await fetch(
      "https://8fty49z8qb.execute-api.ap-southeast-1.amazonaws.com/post/",
      {
        method: "get",
        headers: {
          Authorization: `Bearer ${token.access}`,
        },
      }
    );

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

// api post to get new token if old token is expired
const postGetNewTokenMethod = async (body) => {
  try {
    const response = await fetch(
      "https://8fty49z8qb.execute-api.ap-southeast-1.amazonaws.com/login/get_new_token/",
      {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export { postLoginMethod, getPostMethod, postGetNewTokenMethod };
