import { approveMembership } from "../api/data.js";

export async function approve(ctx) {
    const memberId = ctx.params.recId;
    const teamId = ctx.params.teamId;
    await approveMembership(memberId, {"status":"member"});
    ctx.page.redirect(`/teamHome/${teamId}/${memberId}`);
}