import { Spinner } from "../../node_modules/spin.js/spin.js";
import { html } from "../../node_modules/lit-html/lit-html.js";
import { getListAllMemberships, getTeamHomeInfo } from "../api/data.js";
import { getUserData } from "../api/utils.js";

export async function teamHomeView(cxt) {
    let spin = new Spinner().spin(document.querySelector('main'));
    
    const teamsId = cxt.params.id;
    const user = getUserData();

    let teamInfo = await getTeamHomeInfo(teamsId);
    teamInfo.teamMemberships = await getListAllMemberships(teamsId);

    spin.stop()

    if (!user) {
        return cxt.render(teamHomeTempGuest(teamInfo));
    }

    teamInfo.members = teamInfo.teamMemberships.filter(team => team._ownerId != user._id && team.status === "member");
    teamInfo.pending = teamInfo.teamMemberships.filter(team => team._ownerId != user._id && team.status === "pending");
    teamInfo.user = user;

    if (user._id === teamInfo._ownerId) {
        cxt.render(teamHomeTempOwner(teamInfo));
    } else {
        cxt.render(teamHomeTempLoggedUser(teamInfo));
    }
}

function teamHomeTempGuest(teamInfo) {
    return html`
<section id="team-home">
    <article class="layout">
        <img src="../${teamInfo.logoUrl}" class="team-logo left-col">
        <div class="tm-preview">
            <h2>${teamInfo.user.username}</h2>
            <p>${teamInfo.description}</p>
            <span class="details">${(teamInfo.teamMemberships).length} Members</span>
            <div></div>
        </div>
        <div class="pad-large">
            <h3>Members</h3>
            <ul class="tm-members">
            ${teamInfo.members.map(x => {
        return html`<li>${x.user.username}</li>`
    })}
            </ul>
        </div>
    </article>
</section>
`

}

function teamHomeTempOwner(teamInfo) {
    return html`
<section id="team-home">
    <article class="layout">
        <img src="../${teamInfo.logoUrl}" class="team-logo left-col">
        <div class="tm-preview">
            <h2>${teamInfo.user.username}</h2>
            <p>${teamInfo.description}</p>
            <span class="details">${(teamInfo.teamMemberships).length} Members</span>
            <div>
            <a href="/edit" class="action">Edit team</a>
            </div>
        </div>
        <div class="pad-large">
            <h3>Members</h3>
            <ul class="tm-members">
              <li>${teamInfo.userName}</li>
              ${teamInfo.members.map(x => {
        return html`<li>${x.user.username}<a href="#" class="tm-control action">Remove from team</a></li>`
    })}
            </ul>
        </div>
        <div class="pad-large">
                        <h3>Membership Requests</h3>
                        <ul class="tm-members">
                        ${teamInfo.pending.map(x => {
        return html`<li>${x.user.username}<a href="#" class="tm-control action">Approve</a><a href="#"
                            class="tm-control action">Decline</a></li>`
    })}
                        </ul>
                    </div>
    </article>
</section>
`

}

function teamHomeTempLoggedUser(teamInfo) {
    return html`
<section id="team-home">
    <article class="layout">
        <img src="../${teamInfo.logoUrl}" class="team-logo left-col">
        <div class="tm-preview">
            <h2>${teamInfo.user.username}</h2>
            <p>${teamInfo.description}</p>
            <span class="details">${(teamInfo.teamMemberships).length} Members</span>
            <div>
            ${teamHomeTempLoggedUserFragment(teamInfo.teamMemberships, teamInfo.user)}
            </div>
        </div>
        <div class="pad-large">
            <h3>Members</h3>
            <ul class="tm-members">
            ${teamInfo.members.map(x => {
        return html`<li>${x.user.username}</li>`
    })}
            </ul>
        </div>
    </article>
</section>
`
}

function teamHomeTempLoggedUserFragment(teamMemberships, user) {
    const userState = teamMemberships.filter(x => x.user._id === user._id).status;

    if (userState === "pending") {
        return html`Membership pending. <a href="#">Cancel request</a>`
    } else if (userState === "member") {
        return html`<a href="#" class="action invert">Leave team</a>`
    } else {
        return html`<a href="#" class="action">Join team</a>`
    }

}

