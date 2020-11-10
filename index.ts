import * as Discord from "discord.js"; 

// Boilerplate
/*
    if (msg.content.startsWith("$report"))
    {
        
    }
*/

let client: Discord.Client = new Discord.Client();

client.once("ready", () => {
    console.log("Ready!");
})

client.on("message", async (msg: Discord.Message) => {
    if (msg.guild.channels.cache.find(ch => ch.name == "join") == msg.channel) {
        if (msg.content == "$verify")
        {
            msg.guild.member(msg.author).roles.add(
                msg.guild.roles.cache.find(role => role.name == "member")
            )
            msg.delete({ timeout: 100 });
        }
        else {
            msg.delete({timeout:0});
        }
    }
    
    if (msg.content.startsWith("$kick") && msg.guild.member(msg.author).roles.cache.find(role => role.name == "Mod"))  
    {
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

    if (msg.content.startsWith("$ban") && msg.guild.member(msg.author).roles.cache.find(role => role.name == "Mod"))
    {
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

        member.ban().then(
            (member) => {
                msg.channel.send(`Successfully banned "${member.user.username}#${member.user.discriminator}"`)
            }
        ).catch(
            () => {
                msg.channel.send("Couldn't ban this member!")
            }
        )
    }

    if (msg.content.startsWith("$report"))
    {
        let arr = msg.content.split(" ");
        if (arr.length > 2 || arr.length == 2) {
            arr[1] = arr.slice(1,arr.length).join(" ");
        } else {
            msg.channel.send("Invalid Syntax: $modapply \"Reason\"")
            return;
        }
        
        let member = msg.guild.member(msg.author);
        if (!member) {return}
        let reports = msg.guild.channels.cache.find(channel => channel.name == "reports");
        (await reports.send(
            `**REPORT by ${msg.author.username}#${msg.author.discriminator} @ ${arr[1]}**`
        )).suppressEmbeds();        
    }

    if (msg.content.startsWith("$cr") && msg.guild.member(msg.author).roles.cache.find(role => role.name == "Creditor" || role.name == "Owner" || role.name == "Mod" )) {
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
        ).then( (role) => { msg.channel.send(`**Created role <@&${role.id}> with color ${role.hexColor}**`); msg.guild.member(msg.author).roles.add(role) } ).catch( (role) => {msg.channel.send("Man you're probably an admin or you messed up thr colors"); } )
    }

    if (msg.content.startsWith("$modapply"))
    {
        let arr = msg.content.split(" ");
        if (arr.length > 2 || arr.length == 2) {
            arr[1] = arr.slice(1,arr.length).join(" ");
        } else {
            msg.channel.send("Invalid Syntax: $modapply \"Reason\"")
            return;
        }
        
        let member = msg.guild.member(msg.author);
        if (!member) {return}
        let applications = msg.guild.channels.cache.find(channel => channel.name == "mod-requests");
        applications.send(
            `**${msg.author.username}#${msg.author.discriminator} has applied for <@&775643247103311885>**\n**The Reason provided for consideration:** ${eval(arr[1]) != "" ? eval(arr[1]) : "None"}`
        );
    }

    if (msg.content.startsWith("$trainee") && msg.guild.member(msg.author).roles.cache.find(role => role.name == "Mod" || role.name == "Admin"))
    {

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

    if (msg.content.startsWith("$apnt") && msg.guild.member(msg.author).roles.cache.find(role => role.name == "Mod" || role.name == "Admin"))
    {

        let assignee = msg.mentions.users.first();
        if (!assignee) { msg.channel.send("Did ya mention someone?") ;return }
        let member = msg.guild.member(assignee);
        if (!member) {return}
        member.roles.add(msg.guild.roles.cache.find(role => role.name == "Mod"))

    }

    if (msg.content.startsWith("$dapnt") && msg.guild.member(msg.author).roles.cache.find(role => role.name == "Admin"))
    {

        let assignee = msg.mentions.users.first();
        if (!assignee) { msg.channel.send("Did ya mention someone?") ;return }
        let member = msg.guild.member(assignee);
        if (!member) {return}
        member.roles.remove(msg.guild.roles.cache.find(role => role.name == "Mod"))

    }
})


client.login("Nzc1NjUxNjE5Mjc0MDk2Njcw.X6pb3A.NBQBemW458XlCe8VTdO7RWzY9lY")