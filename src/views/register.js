import { html } from "../../node_modules/lit-html/lit-html.js"
import { register } from "../api/data.js";
import page from "../../node_modules/page/page.mjs";
import { modalTemplate } from "../api/utils.js";
import { Spinner } from "../../node_modules/spin.js/spin.js";

let context = null;
export function registerView(ctx) {
    context = ctx;
    ctx.render(registerViewTemplate(onSubmit))
}

function registerViewTemplate(header, error) {
    return html
        `<section id="register">
    <article class="narrow">
        <header class="pad-med">
            <h1>Register</h1>
        </header>
        <form @submit=${header} id="register-form" class="main-form pad-large">
            ${error && modalTemplate("register-form", error)}
            <label>E-mail: <input type="text" name="email"></label>
            <label>Username: <input type="text" name="username"></label>
            <label>Password: <input type="password" name="password"></label>
            <label>Repeat: <input type="password" name="repass"></label>
            <input class="action cta" type="submit" value="Create Account">
        </form>
        <footer class="pad-small">Already have an account? <a href="/login" class="invert">Sign in here</a>
        </footer>
    </article>
</section>
    `
}

async function onSubmit(e) {
    e.preventDefault();
    let spin = new Spinner().spin(document.querySelector('main'));
    const dataForm = new FormData(e.target);
    const repeatInput = dataForm.get("repass");
    const emailInput = dataForm.get("email");
    const usernameInput = dataForm.get("username");
    const passwordInput = dataForm.get("password");

    try {

        if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(emailInput)) {
            throw Error("Invalid email!")
        }

        if (usernameInput.length < 3) {
            throw Error("Invalid username!")
        }

        if (passwordInput != repeatInput || !/^[0-9]/.test(passwordInput)) {
            throw Error("Invalid password!")
        }

        const { accessToken, email, username, _createdOn, _id } = await register(emailInput, usernameInput, passwordInput);

        localStorage.setItem("userData", JSON.stringify({ accessToken, email, username, _createdOn, _id }));
        spin.stop();
        page.redirect("/");

    } catch (error) {
        spin.stop()
        context.render(registerViewTemplate(onSubmit, error.message))
    }
}

