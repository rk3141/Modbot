exports.trainee = (msg) => {
    let assignee = msg.mentions.users.first();
    if (!assignee) { msg.channel.send("Did ya mention someone?") ;return }
    let member = msg.guild.member(assignee);
    if (!member) {msg.channel.send("Member not found!");return}
    console.log("Reached")
    member.roles.add(msg.guild.roles.cache.find(role => role.name == "Trainee Mod")).then(
        (mem) => {
            console.log(`${mem.user.username} is now a trainee mod`)
        }
    ).catch(
        () =>
        {
            console.log("Error")
        }
    )
}