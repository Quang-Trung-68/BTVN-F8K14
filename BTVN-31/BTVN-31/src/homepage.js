import { getPostMethod, postGetNewTokenMethod } from "./utils/api.js";

// assign token from local storage
let token = {
  access: localStorage["access_token"],
  refresh: localStorage["refresh_token"],
};

// function keep access by keep valid token
const homePage = async (token) => {
  // function auto checking token is not expired or expired, after post to get new access token
  try {
    const posts = await getPostMethod(token);
    // if token access is expired
    if (posts.detail === "token expired") {
      // log post
      console.log(posts);
      const body = {
        refresh: localStorage["refresh_token"],
      };
      // refresh a new access token
      const tokenNew = await postGetNewTokenMethod(body);
      console.log("New token is:");
      console.log(tokenNew);
      //   assign new token to localstorage
      localStorage["access_token"] = tokenNew.access;
      localStorage["refresh_token"] = tokenNew.refresh;
      //   reassign token from localstorage
      token = {
        access: localStorage["access_token"],
        refresh: localStorage["refresh_token"],
      };
    } else {
      console.log("Login token is valid");
      console.log(posts);
    }
  } catch (error) {
    console.log(error);
  }
};

homePage(token);

// logout
const logout = document.querySelector(".logout");
if (logout) {
  // go to login page and clear token is saved at localstorage
  logout.onclick = () => {
    document.location.href = "./index.html";
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  };
}
