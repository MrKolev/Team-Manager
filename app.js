import page from "./node_modules/page/page.mjs";
import { render } from "./node_modules/lit-html/lit-html.js";
import { homeView } from "./src/views/home.js";
import { loginView } from "./src/views/login.js";
import { registerView } from "./src/views/register.js";
import { myTeamsView } from "./src/views/myTeams.js";
import { logout } from "./src/api/data.js";



page("/",renderMiddleware, homeView);
page("/login", renderMiddleware, loginView );
page("/register", renderMiddleware, registerView);
page("/myTeams", renderMiddleware, myTeamsView);
page("/logout", logoutBtn);

page.start();

function logoutBtn(){
    logout();
    page.redirect("/");
}

function renderMiddleware(ctx, next){
    ctx.render = (content) => render(content, document.querySelector('main'));
    next();
}

