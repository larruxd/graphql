import home_page from "./views/home.js";
import login_page from "./views/login.js";
import logout_page from "./views/logout.js";
import error_page from "./views/error.js";

// window.addEventListener("popstate", router);
// window.addEventListener("load", router);
// window.addEventListener("beforeunload", router);

document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", (e) => {
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            navigateTo(e.target.href);
        }
    });
    router();
});

export const navigateTo = (url) => {
    history.pushState(null, null, url);
    router();
};

async function router() {
    const routes = [
        { path: "/", view: home_page },
        { path: "/login", view: login_page },
        { path: "/logout", view: logout_page },
        { path: "/error", view: error_page },
    ];

    const potentialMatches = routes.map((route) => {
        return {
            route: route,
            isMatch: location.pathname === route.path,
        };
    });

    // find match
    let match = potentialMatches.find((potentialMatch) => potentialMatch.isMatch);

    if (match) {
        match.route.view(); // <-- run page
    } else {
        error_page();
    }
}
