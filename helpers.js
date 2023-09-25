export function isAuthorized() {
    // Get the JWT token from the cookie
    const cookies = document.cookie.split("; ");
    const jwtCookie = cookies.find((cookie) => cookie.startsWith("jwt="));

    // If the JWT cookie is found
    if (jwtCookie) {
        // Extract the JWT token value from the cookie
        // const jwtToken = jwtCookie.split("=")[1];
        // maybe add server side confirmation later

        return true;
    } else {
        sessionStorage.clear();
        localStorage.clear();
        clearJwtCookie();
    }
    // If the JWT cookie is not found or is invalid
    return false;
}

// export function clearAllCookies() {
//     const cookies = document.cookie.split(";");
//     if (cookies[0] !== "") {
//         for (let i = 0; i < cookies.length; i++) {
//             const cookie = cookies[i];
//             const eqPos = cookie.indexOf("=");
//             const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
//             document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
//         }
//     }
// }

export function clearJwtCookie() {
    const cookies = document.cookie.split(";");
    const jwtCookie = cookies.find((cookie) => cookie.startsWith("jwt="));
    if (jwtCookie) {
        const eqPos = jwtCookie.indexOf("=");
        const name = eqPos > -1 ? jwtCookie.substr(0, eqPos) : jwtCookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}

export function getJwtToken() {
    const cookies = document.cookie.split("; ");
    const jwtCookie = cookies.find((cookie) => cookie.startsWith("jwt="));
    return jwtCookie.slice(4);
}
