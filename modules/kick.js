exports.kick = (msg) => {
    let user = msg.mentions.members.first();
    if (!user)
    {
        msg.channel.send("Did you even mention someone")
    }
    let member = msg.guild.member(user);
    
    if (!member)
    {
        msg.channel.send("This person ain't a member I suppose. :thinking:");
    }

    member.kick(
        (msg.content.split(" ").slice(2,msg.content.split(" ").length) ? msg.content.split(" ").slice(2,msg.content.split(" ").length) : []).join(" ")
    ).then(
        (member) => {
            msg.channel.send(`Successfully kicked "${member.user.username}#${member.user.discriminator}"`)
        }
    ).catch(
        () => {
            msg.channel.send("Couldn't kick this member!")
        }
    )
}