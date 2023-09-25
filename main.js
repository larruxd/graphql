import { isAuthorized, clearJwtCookie } from "./helpers.js";
import { createHomePage } from "./profile.js";
import { loginListener } from "./login.js";

const loginForm = document.getElementById("login-form");
const homeDiv = document.getElementById("main");
const logoutBtn = document.getElementById("logoutBtn");

document.addEventListener("DOMContentLoaded", () => {
    display();
});

export function display() {
    if (isAuthorized()) {
        // show home page
        loginForm.style.display = "none";
        homeDiv.style.display = "flex";
        logoutBtn.style.display = "block";
        createHomePage();
        logoutBtn.addEventListener("click", logout);
    } else {
        // show login page
        loginForm.style.display = "block";
        homeDiv.style.display = "none";
        logoutBtn.style.display = "none";
        loginListener();
    }
}

function logout() {
    if (isAuthorized()) {
        clearJwtCookie();
        display();
    } else {
        console.log("Not authorized / no cookie session found");
    }
}
