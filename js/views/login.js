import { isAuthorized } from "../helpers.js";
import { navigateTo } from "../main.js";

export default function () {
    document.title = "Login";

    document.getElementById("menu").innerHTML = ``;
    document.getElementById("body").innerHTML = `

        <form id="login-form">
            <div class="login-container">
                <h1>Log In</h1>
                <hr />

                <label for="LoginID" class="loginLabel">Username / Email</label>
                <input
                    id="LoginID"
                    type="text"
                    placeholder="Enter username or email"
                    name="LoginID"
                    class="loginInput"
                    required
                />

                <label for="password" class="loginLabel">Password</label>
                <input
                    id="password"
                    type="password"
                    placeholder="Enter Password"
                    name="password"
                    class="loginInput"
                    required
                />

                <span id="loginFeedback" class="error"></span>

                <div class="clearfix">
                    <button type="submit" id="loginBtn">Login</button>
                </div>
                
            </div>
        </form>

    `;

    loginListener();
}

function loginListener() {
    if (isAuthorized()) {
        navigateTo("/");
        return;
    } else {
        const loginForm = document.getElementById("login-form");

        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();

            let formData = new FormData(loginForm);
            let loginData = {};

            for (let [key, value] of formData.entries()) {
                loginData[key] = value;
            }

            auth(loginData.LoginID, loginData.password);
        });
    }
}

async function auth(username, password) {
    const authURL = "https://01.kood.tech/api/auth/signin";
    // const username = "lauri.laretei@gmail.com";
    // const password = "";
    const credentials = btoa(`${username}:${password}`);

    let jwtToken = await getToken(authURL, credentials);

    console.log("JWT: " + jwtToken);
    if (jwtToken) {
        document.cookie = `jwt=${jwtToken}; path=/; secure; samesite=Lax`;
        await new Promise((r) => setTimeout(r, 500));
        navigateTo("/");
    }
}

async function getToken(url, credentials) {
    const requestOptions = {
        method: "POST",
        headers: {
            Authorization: `Basic ${credentials}`,
            "Content-Type": "application/json",
        },
    };

    try {
        let resp = await fetch(url, requestOptions);
        if (resp.status === 200) {
            return resp.json();
        } else if (resp.status === 401) {
            loginErr("User doesn't exist");
            clearUsername();
            clearPassword();
        } else if (resp.status === 403) {
            loginErr("Wrong password");
            clearPassword();
        } else {
            throw new Error("Failed to obtain JWT");
        }
    } catch (e) {
        console.error(e);
    }
}

function loginErr(text) {
    document.getElementById("loginFeedback").innerHTML = text;
}

function clearPassword() {
    document.getElementById("password").value = "";
}

function clearUsername() {
    document.getElementById("LoginID").value = "";
}
