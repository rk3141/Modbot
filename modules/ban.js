exports.ban = (msg) => {
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

    member.ban()
    .then(
        (member) => {
            msg.channel.send(`Successfully banned "${member.user.username}#${member.user.discriminator}"`)
        }
    ).catch(
        () => {
            msg.channel.send("Couldn't ban this member!")
        }
    )
}