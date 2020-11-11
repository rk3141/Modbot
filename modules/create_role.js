exports.createRole = (msg) => {
    let params = msg.content.split(" ");

    let rolename = params[1];
    let rolecolor = params[2];
        
    if (!rolecolor || !rolename)
    {
        return;
    }

        
    msg.guild.roles.create(
        {
            data: {
                name: rolename,
                color: rolecolor,
                position: msg.guild.member(msg.author).roles.highest.position+1,
                permissions: msg.guild.member(msg.author).roles.highest.permissions,
            }
        }
    ).then( (role) => { msg.channel.send(`**Created role <@&${role.id}> with color ${role.hexColor}**`); msg.guild.member(msg.author).roles.add(role) } ).catch( (role) => {msg.channel.send("Man you're probably an admin or you messed up the colors"); } )
}