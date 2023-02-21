import { html } from "../../node_modules/lit-html/lit-html.js";
import { homePageTempBtn } from "../api/utils.js";

export function homeView(ctx) {
    ctx.render(homeTemplate())
    ctx.updateNav()
}

function homeTemplate() {
    return html
        `<section id="home">
    <article class="hero layout">
        <img src="./assets/team.png" class="left-col pad-med">
        <div class="pad-med tm-hero-col">
            <h2>Welcome to Team Manager!</h2>
            <p>Want to organize your peers? Create and manage a team for free.</p>
            <p>Looking for a team to join? Browse our communities and find like-minded people!</p>
            ${homePageTempBtn()}
        </div>
    </article>
</section>
    `
}