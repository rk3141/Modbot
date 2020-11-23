import * as Discord from "discord.js"; 
import * as dotenv from "dotenv";
import { byrole, byroles, inchannel, onlycommand, opscommand } from "./utils";

dotenv.config();

// Boilerplate
/*
    if (opscommand(msg,prefix+"command"))
    {
        
    }
*/

let client: Discord.Client = new Discord.Client();

let prefix = "$";
const onready = () => {
    console.log("Ready!");
    client.user.setActivity(`${prefix}help`);
};

client.once("ready", onready)

import * as fs from "fs";
import { join } from "path";

// client.on("guildMemberAdd", (member) => {
//     member.guild.channels.cache.find(
//         ch => ch.name == "welcome"
//     ).send(
//         `**Welcome <@${member.user.id}>!**`
//     )
// })

client.on("message", async (msg: Discord.Message) => {
    if (onlycommand(msg,prefix,"help"))
    {
        msg.channel.send(fs.readFileSync("help.txt").toString().replace("$",prefix));
    }

    if (inchannel(msg,"join")) {
        if (onlycommand(msg,prefix,"verify"))
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
    
    if (onlycommand(msg,prefix,"ping"))
    {
        msg.channel.send("pong")
    }

    if (onlycommand(msg,prefix,"cleanc"))
    {
        msg.channel.messages.cache.array().forEach(
            message => {
                if (msg != message)
                    message.delete({timeout:0})
            }
        );
        
    }
    
    if (opscommand(msg,prefix,"getrole"))
    {
        
    }

    if (opscommand(msg,prefix,"grole"))
    {
        let assignee = msg.mentions.members.first();
        let role = msg.mentions.roles.first();
        if (!role) {return}
        if (!assignee) {return}
        let member = msg.guild.member(assignee);
        if (!member) {return}
        if (!(msg.mentions.roles.first().position < msg.guild.member(msg.author).roles.highest.position)){return}
        member.roles.add(
            msg.guild.roles.cache.find(
                rol => rol.name == role.name
            )
        ).then(
            (mem) => {
                msg.channel.send(`Gave <@&${role.id}> to <@${mem.id}>`)
            }
        ).catch(
            () => {
                msg.channel.send(`Couldn't give <@&${role.id}>`)
            }
        )
    }

    // https://discord.com/channels/756365171038879797/775645460769669161/775656803777511424
    if (opscommand(msg,prefix,"money"))
    {
        switch (msg.content.split(" ")[1])
        {
            case undefined:
            break;
            case "bal":
                if (msg.mentions.members.first()) {  }
            break;
        }
    }

    if (opscommand(msg,prefix,"kick") && byroles(msg,["Mod","Owner"]))
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
                msg.channel.send(`Successfully kicked **${member.user.username}#${member.user.discriminator}**`)
            }
        ).catch(
            () => {
                msg.channel.send("Couldn't kick this member!")
            }
        )
    }

    if (opscommand(msg,prefix,"ban") && byroles(msg,["Mod","Owner"]))
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
                msg.channel.send(`Successfully banned **${member.user.username}#${member.user.discriminator}**`)
            }
        ).catch(
            () => {
                msg.channel.send("Couldn't ban this member!")
            }
        )
    }
    
    if (opscommand(msg,prefix,"report"))
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
        if (reports.isText()) {
        (await reports.send(
            `**REPORT by ${msg.author.username}#${msg.author.discriminator} @ ${arr[1]}**`
        )).suppressEmbeds();
        }
    }

    if (opscommand(msg,prefix,"cr") && msg.guild.member(msg.author).roles.cache.find(role => role.name == "Creditor" || role.name == "Owner" || role.name == "Mod" )) {
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

    if (opscommand(msg,prefix,"modapply"))
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
        if (applications.isText()) {
            applications.send(
                `**${msg.author.username}#${msg.author.discriminator} has applied for <@&775643247103311885>**\n**The Reason provided for consideration:** ${eval(arr[1]) != "" ? eval(arr[1]) : "None"}`
            );
        }
    }

    if (opscommand(msg,prefix,"trainee") && byroles(msg,["Owner","Mod"]))
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

    if (opscommand(msg,prefix,"apnt") && msg.guild.member(msg.author).roles.cache.find(role => role.name == "Owner"))
    {

        let assignee = msg.mentions.users.first();
        if (!assignee) { msg.channel.send("Did ya mention someone?") ;return }
        let member = msg.guild.member(assignee);
        if (!member) {return}
        member.roles.add(msg.guild.roles.cache.find(role => role.name == "Mod"))

    }

    if (opscommand(msg,prefix,"dapnt") && msg.guild.member(msg.author).roles.cache.find(role => role.name == "Admin"))
    {

        let assignee = msg.mentions.users.first();
        if (!assignee) { msg.channel.send("Did ya mention someone?") ;return }
        let member = msg.guild.member(assignee);
        if (!member) {return}
        member.roles.remove(msg.guild.roles.cache.find(role => role.name == "Mod"))

    }

    if (opscommand(msg,prefix,"prefix"))
    {
        let nprefix = msg.content.split(" ")[1];
        if (!nprefix)
        {
            msg.channel.send("Syntax: `$prefix <THE_NEW_PREFIX>`");
            return;
        }
        prefix = nprefix;
        onready();
    }
})


client.login(process.env.TOKEN)
console.log(process.env.TOKEN)
