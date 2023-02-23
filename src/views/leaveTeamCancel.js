import {delTeamMember} from '../api/data.js';

export async function leaveTeamCancel(ctx){
    const memberId = ctx.params.memberId;
    const teamId = ctx.params.teamId;

    await delTeamMember(memberId); 
    
    ctx.page.redirect(`/teamHome/${teamId}/${memberId}`)
    
}