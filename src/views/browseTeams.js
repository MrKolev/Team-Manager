import { Spinner } from "../../node_modules/spin.js/spin.js";
import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAllTeamsList, getMembersStatusMember } from "../api/data.js";
import { createTeamTemplateBtn } from "../api/utils.js"


export async function browseTeamView(ctx) {
    
   let spin = new Spinner().spin(document.querySelector('main'));
    const listOfTeams = await getAllTeamsList();
    const listOfMembers = await getMembersStatusMember();
    
    listOfTeams.forEach(teams => {
        teams.members = 0;
        listOfMembers.forEach(member => {
            if(teams._id === member.teamId) {
                teams.members ++;
            }
        })
    })

    spin.stop()
    ctx.render(browseTeamTemplate(listOfTeams));   

}

function browseTeamTemplate(listOfTeams) {
    return html`
    <section id="browse">

    <article class="pad-med">
        <h1>Team Browser</h1>
    </article>

    ${createTeamTemplateBtn()}
    ${listOfTeams.map(team => {
        return html`
        <article class="layout">
        <img src=".${team.logoUrl}" class="team-logo left-col">
        <div class="tm-preview">
            <h2>${team.name}</h2>
            <p>${team.description}</p>
            <span class="details">${team.members} Member${team.members > 1 ? "s" : ""}</span>
            <div><a href="/teamHome/${team._id}" class="action">See details</a></div>
        </div>
    </article>
    `
    })}
</section>
`
}