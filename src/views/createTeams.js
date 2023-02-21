import { Spinner } from "../../node_modules/spin.js/spin.js";
import { html } from "../../node_modules/lit-html/lit-html.js";
import { createTeam } from "../api/data.js";


export function createTeamView(ctx){
    ctx.render(createTeamTemp(onSubmit))
}

function createTeamTemp(onSubmit){
    return html` <section id="create">
    <article class="narrow">
        <header class="pad-med">
            <h1>New Team</h1>
        </header>
        <form @submit = ${onSubmit} id="create-form" class="main-form pad-large">
            <div class="error">Error message.</div>
            <label>Team name: <input type="text" name="name"></label>
            <label>Logo URL: <input type="text" name="logoUrl"></label>
            <label>Description: <textarea name="description"></textarea></label>
            <input class="action cta" type="submit" value="Create Team">
        </form>
    </article>
</section>`
}

async function onSubmit(e){
    e.preventDefault();
    const spin = new Spinner().spin(document.querySelector('main'));
    const dataForm = new FormData(e.target);
    const {name, logoUrl, description} = Object.fromEntries(dataForm);
    
    try {
        if(name.length < 4){
            throw new Error('Team name: at least 4 characters.')
        }
        if(!/(?:png|jpg|jpeg|gif|png|svg)/.test(logoUrl)){
            throw new Error('Invalid Logo Url!')
        }
        if(description.length < 10){
            throw new Error('Description: at least 10 characters.')
        }

       const newTeam = await createTeam(name, logoUrl, description);
       spin.stop();
       page.redirect("/Team Details")

        
    } catch (error) {
        
    }


}