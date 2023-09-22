import { clearAllCookies, isAuthorized } from "../helpers.js";
import { navigateTo } from "../main.js";

export default function () {
    if (isAuthorized()) {
        sessionStorage.clear();
        localStorage.clear();
        clearAllCookies();
        navigateTo("/login");
    } else {
        console.log("Not authorized / no cookie session found");
    }
}
