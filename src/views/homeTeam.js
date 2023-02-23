import { Spinner } from "../../node_modules/spin.js/spin.js";
import { html } from "../../node_modules/lit-html/lit-html.js";
import { getListAllMemberships, getMemberId, getTeamHomeInfo } from "../api/data.js";
import { getUserData } from "../api/utils.js";

export async function teamHomeView(cxt) {
    let spin = new Spinner().spin(document.querySelector('main'));
    
    const teamsId = cxt.params.id;
    let memberId = cxt.params.memberId;
    const user = getUserData();
    if(memberId === "is missing" && user) {
        memberId = await getMemberId(user._id, teamsId)
    }


    
    let teamInfo = await getTeamHomeInfo(teamsId);
    teamInfo.teamMemberships = await getListAllMemberships(teamsId);
    teamInfo.members = teamInfo.teamMemberships.filter(team => team.status === "member");

    spin.stop()

    if (!user) {
        return cxt.render(teamHomeTempGuest(teamInfo));
    }

    teamInfo.pending = teamInfo.teamMemberships.filter(team => team.status === "pending");
    teamInfo.user = user;
    teamInfo.memberId = memberId;


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
            <h2>${teamInfo.name}</h2>
            <p>${teamInfo.description}</p>
            <span class="details">${(teamInfo.members).length} Members</span>
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
            <h2>${teamInfo.name}</h2>
            <p>${teamInfo.description}</p>
            <span class="details">${(teamInfo.members).length} Members</span>
            <div>
            <a href="/edit" class="action">Edit team</a>
            </div>
        </div>
        <div class="pad-large">
            <h3>Members</h3>
            <ul class="tm-members">
              <li>${teamInfo.user.username}</li>
            ${teamInfo.members.map(x => {
                if(teamInfo.user.username != x.user.username){
                    return html`<li>${x.user.username}<a href="/leaveTeamCancel/${x.teamId}/${x._id}" class="tm-control action">Remove from team</a></li>`
                }
            })}
            </ul>
        </div>
        <div class="pad-large">
                        <h3>Membership Requests</h3>
                        <ul class="tm-members">
                        ${teamInfo.pending.map(x => {
        return html`<li>${x.user.username}<a href="/approve/${x._id}/${teamInfo._id}" class="tm-control action">Approve</a><a href="#"
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
            <h2>${teamInfo.name}</h2>
            <p>${teamInfo.description}</p>
            <span class="details">${(teamInfo.members).length} Members</span>
            <div>
            ${teamHomeTempLoggedUserFragment(teamInfo)}
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

function teamHomeTempLoggedUserFragment(teamInfo) {
    const userState = teamInfo.teamMemberships.filter(x => x.user._id === teamInfo.user._id);
    
    if(userState.length == 0){
        return html`<a  href="/joinTeam/${teamInfo._id}/${teamInfo.memberId}" class="action">Join team</a>`
    }

    if (userState[0].status === "pending") {
        return html`Membership pending. <a href="/leaveTeamCancel/${teamInfo._id}/${teamInfo.memberId}">Cancel request</a>`
    }
    
    if (userState[0].status === "member") {
        return html`<a href="/leaveTeamCancel/${teamInfo._id}/${teamInfo.memberId}" class="action invert">Leave team</a>`
    } 


}

