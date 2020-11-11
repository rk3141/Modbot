exports.appointmod = (msg) => {
    let assignee = msg.mentions.users.first();
if (!assignee) { msg.channel.send("Did ya mention someone?") ;return }
let member = msg.guild.member(assignee);
if (!member) {return}
member.roles.add(msg.guild.roles.cache.find(role => role.name == "Mod"))
}