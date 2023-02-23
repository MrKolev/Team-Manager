import { html } from "../../node_modules/lit-html/lit-html.js";


export function modalTemplate(id, error) {
    return html`   
        <div class="overlay">
            <div class="modal">
                <p>${error}</p>
                <a @click=${document.getElementById(id).reset()} href="/create" class="action">Close</a>
            </div>
        </div>`

}

export function homePageTempBtn() {
    if (getUserData()) {
        return html`
            <a href="/browse" class="action cta">Browse Teams</a>`
    } else {
        return html`<a href="/register" class="action cta">Sign Up Now</a>`
    }
} export function createTeamTemplateBtn() {
    if (getUserData()) {
        return html`
    <article class="layout narrow">
        <div class="pad-small"><a href="/create" class="action cta">Create Team</a></div>
    </article>
    `
    }
    return null;
}



export function getUserData() {
    const user = localStorage.getItem("userData");
    if (user) {
        return JSON.parse(user);
    }
    return null;
}
