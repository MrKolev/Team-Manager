import page from "./node_modules/page/page.mjs";
import { render } from "./node_modules/lit-html/lit-html.js";
import { homeView } from "./src/views/home.js";
import { loginView } from "./src/views/login.js";
import { registerView } from "./src/views/register.js";
import { myTeamsView } from "./src/views/myTeams.js";
import { logout } from "./src/api/data.js";
import { browseTeamView } from "./src/views/browseTeams.js";
import { createTeamView } from "./src/views/createTeams.js";



page("/", renderMiddleware, homeView);
page("/login", renderMiddleware, loginView);
page("/register", renderMiddleware, registerView);
page("/myTeams", renderMiddleware, myTeamsView);
page("/logout", logoutBtn);
page("/browse", renderMiddleware, browseTeamView)
page("/create", renderMiddleware, createTeamView);

updateNav()

page.start();

async function logoutBtn() {
   await logout();
    updateNav()
    page.redirect("/");
}

function renderMiddleware(ctx, next) {
    ctx.render = (content) => render(content, document.querySelector('main'));
    ctx.updateNav = updateNav

    next();
}

export function updateNav() {
    const user = JSON.parse(localStorage.getItem('userData'));
  
    if (user) {
        document.querySelectorAll(".guest").forEach(x => x.style.display = "none");
        document.querySelectorAll(".user").forEach(x => x.style.display = "block");
    } else {
        document.querySelectorAll(".guest").forEach(x => x.style.display = "block");
        document.querySelectorAll(".user").forEach(x => x.style.display = "none");
    }
}

