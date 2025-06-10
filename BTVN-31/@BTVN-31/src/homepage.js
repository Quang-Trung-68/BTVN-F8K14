import { getPostMethod, postGetNewTokenMethod } from "./utils/api.js";
// assign token from local storage
let token = {
  access: localStorage["access_token"],
  refresh: localStorage["refresh_token"],
};
// function keep access by keep valid token
const autoKeepAccess = (token) => {
  setInterval(async () => {
    const posts = await getPostMethod(token);
    if (posts.detail === "token expired") {
      // log post
      console.log(posts);
      const body = {
        refresh: localStorage["refresh_token"],
      };
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
  }, 5000);
};
// function to call render homepage
const homePage = async (token) => {
  const posts = await getPostMethod(token);
  console.log(posts);
  autoKeepAccess(token);
};

homePage(token);

// logout
const logout = document.querySelector(".logout");
if (logout) {
  logout.onclick = () => {
    document.location.href = "./index.html";
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  };
}
