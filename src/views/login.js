import { html } from "../../node_modules/lit-html/lit-html.js";
import { login } from "../api/data.js"
import page from "../../node_modules/page/page.mjs";

let context = null;
export function loginView(ctx) {
    context = ctx;
    ctx.render(loginViewTemplate(onSubmit));
}

function loginViewTemplate(onSubmit, error) {
    return html
        `
    <section id="login">
    <article class="narrow">
        <header class="pad-med">
            <h1>Login</h1>
        </header>
        <form @submit = ${onSubmit} id="login-form" class="main-form pad-large">
        ${error && html`<div class="error">${error}</div>`}
            <label>E-mail: <input type="text" name="email"></label>
            <label>Password: <input type="password" name="password"></label>
            <input class="action cta" type="submit" value="Sign In">
        </form>
        <footer class="pad-small">Don't have an account? <a href="#" class="invert">Sign up here</a>
        </footer>
    </article>
</section>
    `
}

async function onSubmit(e) {
    e.preventDefault();
    const dataForm = new FormData(e.target);
    const emailInput = dataForm.get("email");
    const passwordInput = dataForm.get("password");

    try {
        if (!emailInput || !passwordInput) {
            throw new Error("Fill in all the fields")
        }
        await login(emailInput, passwordInput);
        // updateNav()
        page.redirect("/")

    } catch (error) {
        context.render(loginViewTemplate(onSubmit, error.message));
    }



}