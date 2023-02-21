import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAllTeamsList } from "../api/data.js";
import {createTeamTemplateBtn} from "../api/utils.js"



export async function browseTeamView(ctx) {
    const listOfTeams = await getAllTeamsList();
    ctx.render(browseTeamTemplate(listOfTeams));
    
}




function browseTeamTemplate(listOfTeams){
    return html `
    <section id="browse">

    <article class="pad-med">
        <h1>Team Browser</h1>
    </article>

    ${createTeamTemplateBtn()}
    ${listOfTeams.map(team => {
        return html `
        <article class="layout">
        <img src=".${team.logoUrl}" class="team-logo left-col">
        <div class="tm-preview">
            <h2>${team.name}</h2>
            <p>${team.description}</p>
            <span class="details">5000 Members</span>
            <div><a href="#" class="action">See details</a></div>
        </div>
    </article>
    `
    })}

    



</section>
`
}