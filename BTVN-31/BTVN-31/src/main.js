import { postLoginMethod, getPostMethod } from "./utils/api.js";
let token;

// get account from input
const username = document.querySelector("input[name='username']");
const password = document.querySelector("input[name='password']");

// const accountInfo = {
//   email: "admin@gmail.com",
//   password: "12345678",
// };

// validate input
const validateAccount = (accountInfo) => {
  // Validate email: required, include @ and no space
  if (
    !accountInfo.email ||
    !accountInfo.email.includes("@") ||
    accountInfo.email.includes(" ")
  ) {
    alert("Username is not valid, please try again");
    return false;
  }

  // Validate password: required, min 6 letters and no space
  if (
    !accountInfo.password ||
    accountInfo.password.length < 6 ||
    accountInfo.password.includes(" ")
  ) {
    alert("Password is not valid, please try again");
    return false;
  }

  return true;
};

const mainLogIn = async (accountInfo) => {
  const response = await postLoginMethod(accountInfo);
  return response;
};

const logIn = document.querySelector(".log-in");
if (logIn) {
  logIn.addEventListener("click", async () => {
    const accountInfo = {
      email: username.value.trim(),
      password: password.value.trim(),
    };
    console.log(username.value, password.value);
    if (validateAccount(accountInfo)) {
      token = await mainLogIn(accountInfo);
      if (token.access) {
        // save token to local storage
        localStorage.setItem("access_token", `${token.access}`);
        localStorage.setItem("refresh_token", `${token.refresh}`);

        console.log(token.access);
        // go to home page
        document.location.href = `./homepage.html`;
      }
    } else {
      console.log("No validate input");
    }
  });
}

export { token };
