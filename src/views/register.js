import { html } from "../../node_modules/lit-html/lit-html.js"
import { register } from "../api/data.js";

export function registerView(ctx){
    ctx.render(registerViewTemplate(onSubmit))
}

function registerViewTemplate(header){
    return html
    `<section id="register">
    <article class="narrow">
        <header class="pad-med">
            <h1>Register</h1>
        </header>
        <form @submit=${header} id="register-form" class="main-form pad-large">
            <div class="error">Error message.</div>
            <label>E-mail: <input type="text" name="email"></label>
            <label>Username: <input type="text" name="username"></label>
            <label>Password: <input type="password" name="password"></label>
            <label>Repeat: <input type="password" name="repass"></label>
            <input class="action cta" type="submit" value="Create Account">
        </form>
        <footer class="pad-small">Already have an account? <a href="#" class="invert">Sign in here</a>
        </footer>
    </article>
</section>
    `
}

function onSubmit(e){
    e.preventDefault();
    const dataForm = new FormData(e.target);
    const {email, username, password, repeat} = Object.fromEntries(dataForm);
    const pattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
    if(pattern.test(email)){
        debugger
    }



    // register()

    debugger

}