import { getPostMethod, postGetNewTokenMethod } from "./utils/api.js";

// Function to get token from localStorage safely
const getTokenFromStorage = () => {
  return {
    access: localStorage.getItem("access_token"),
    refresh: localStorage.getItem("refresh_token"),
  };
};

// Function to set token to localStorage
const setTokenToStorage = (accessToken, refreshToken) => {
  if (accessToken) localStorage.setItem("access_token", accessToken);
  if (refreshToken) localStorage.setItem("refresh_token", refreshToken);
};

// Function to clear tokens from localStorage
const clearTokensFromStorage = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
};

// Function to redirect to login page
const redirectToLogin = () => {
  clearTokensFromStorage();
  window.location.href = "./index.html";
};

// Main function to handle authentication and load home page
const homePage = async () => {
  let token = getTokenFromStorage();
  
  // Check if we have any tokens
  if (!token.access && !token.refresh) {
    redirectToLogin();
    return;
  }

  try {
    // Try to get posts with current access token
    const posts = await getPostMethod(token);
    
    // Check if access token is expired (assuming API returns detail field on error)
    if (posts.detail && token.refresh) {
      console.log("Access token expired, refreshing...");
      console.log(posts);
      
      try {
        // Attempt to refresh the access token
        const body = { refresh: token.refresh };
        const newTokens = await postGetNewTokenMethod(body);
        
        console.log("New tokens received:");
        console.log(newTokens);
        
        // Update localStorage with new tokens
        setTokenToStorage(newTokens.access, newTokens.refresh);
        
        // Update local token object
        token = getTokenFromStorage();
        
        // Retry getting posts with new token
        const retryPosts = await getPostMethod(token);
        if (retryPosts.detail) {
          // If still failing, redirect to login
          console.error("Failed to authenticate with new token");
          redirectToLogin();
        } else {
          console.log("Successfully authenticated with new token");
          console.log(retryPosts);
        }
        
      } catch (refreshError) {
        console.error("Error refreshing token:", refreshError);
        redirectToLogin();
      }
      
    } else if (posts.detail && !token.refresh) {
      // No refresh token available, redirect to login
      console.log("No refresh token available, redirecting to login");
      redirectToLogin();
      
    } else {
      // Token is valid, posts retrieved successfully
      console.log("Login token is valid");
      console.log(posts);
    }
    
  } catch (error) {
    console.error("Error in homePage:", error);
    // On any other error, redirect to login
    redirectToLogin();
  }
};

// Initialize the home page
homePage();

// Handle logout functionality
const logout = document.querySelector(".logout");
if (logout) {
  logout.addEventListener("click", (event) => {
    event.preventDefault();
    console.log("Logging out...");
    redirectToLogin();
  });
}