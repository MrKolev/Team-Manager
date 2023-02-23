import { postJoinTeam } from "../api/data.js";

export async function joinTeamAutomatically (ctx) {
    const teamId = ctx.params.id;
    const request = await postJoinTeam(teamId);

    ctx.page.redirect(`/approve/${request._id}/${teamId}`);
}

export async function joinTeam(ctx){
    const teamId = ctx.params.id;
    const request = await postJoinTeam(teamId);
    
    ctx.page.redirect(`/teamHome/${teamId}/${request._id}`);

}