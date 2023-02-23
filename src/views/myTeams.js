import { Spinner } from "../../node_modules/spin.js/spin.js";
import { html } from "../../node_modules/lit-html/lit-html.js"
import { getMembersStatusMember, getMyTeamsList } from "../api/data.js";
import { getUserData } from "../api/utils.js";

export async function myTeamsView(ctx){
    let spin = new Spinner().spin(document.querySelector('main'));
    const user = getUserData();
    const listOfMyTeams = await getMyTeamsList(user._id);
    const listOfMembers = await getMembersStatusMember();

    listOfMyTeams.forEach(x => {
        x.members = 0;
        listOfMembers.forEach(member => {
            if(x.team._id === member.teamId) {
                x.members ++;
            }
        })
    })
    
    spin.stop()
ctx.render(myTeamsViewTemplate(listOfMyTeams))
} 

function myTeamsViewTemplate(listOfMyTeams){
    return html
    `
    <section id="my-teams">

    <article class="pad-med">
        <h1>My Teams</h1>
    </article>

    <article class="layout narrow">
        <div class="pad-med">
            <p>You are not a member of any team yet.</p>
            <p><a href="/browse">Browse all teams</a> to join one, or use the button bellow to cerate your own
                team.</p>
        </div>
        <div class=""><a href="/create" class="action cta">Create Team</a></div>
    </article>
    ${listOfMyTeams.map(x => {
        return html`
        <article class="layout">
        <img src="..${x.team.logoUrl}" class="team-logo left-col">
        <div class="tm-preview">
            <h2>${x.team.name}</h2>
            <p>${x.team.description}</p>
            <span class="details">${x.members} Member${x.members > 1 ? "s" : ""}</span>
            <div><a href="/teamHome/${x.teamId}/${x._id}" class="action">See details</a></div>
        </div>
    </article>
    `
    })}
</section>
`
}