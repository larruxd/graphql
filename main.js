import { isAuthorized, clearAllCookies } from "./helpers.js";
import { createHomePage } from "./profile.js";
import { loginListener } from "./login.js";
// import logout_page from "./views/logout.js";
// import error_page from "./views/error.js";

// window.addEventListener("popstate", router);
// window.addEventListener("load", router);
// window.addEventListener("beforeunload", router);

const loginForm = document.getElementById("login-form");
const homeDiv = document.getElementById("main");
const logoutBtn = document.getElementById("logoutBtn");

document.addEventListener("DOMContentLoaded", () => {
    // document.body.addEventListener("click", (e) => {
    //     if (e.target.matches("[data-link]")) {
    //         e.preventDefault();
    //         navigateTo(e.target.href);
    //     }
    // });
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
        sessionStorage.clear();
        localStorage.clear();
        clearAllCookies();
        display();
    } else {
        console.log("Not authorized / no cookie session found");
    }
}

// export const navigateTo = (url) => {
//     history.pushState(null, null, url);
//     router();
// };

// async function router() {
//     const routes = [
//         { path: "/", view: home_page },
//         { path: "/login", view: login_page },
//         { path: "/logout", view: logout_page },
//         { path: "/error", view: error_page },
//     ];

//     const potentialMatches = routes.map((route) => {
//         return {
//             route: route,
//             isMatch: location.pathname === route.path,
//         };
//     });

//     // find match
//     let match = potentialMatches.find((potentialMatch) => potentialMatch.isMatch);

//     if (match) {
//         match.route.view(); // <-- run page
//     } else {
//         error_page();
//     }
// }
