import * as Discord from "discord.js"; 
import * as dotenv from "dotenv";
import { appointmod } from "./modules/appoint_mod";
import { ban } from "./modules/ban";
import { createRole } from "./modules/create_role";
import { kick } from "./modules/kick";
import { modapply } from "./modules/modapply";
import { rmmod } from "./modules/remove_mod";
import { report } from "./modules/report";
import { trainee } from "./modules/trainee";

dotenv.config();

// Boilerplate
/*
    if (msg.content.startsWith("$command"))
    {
        
    }
*/

let client: Discord.Client = new Discord.Client();

client.once("ready", () => {
    console.log("Ready!");
    client.user.setActivity("Helping the Mods");
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
        kick(msg);
    }

    if (msg.content.startsWith("$ban") && msg.guild.member(msg.author).roles.cache.find(role => role.name == "Mod"))
    {
        ban(msg);
    }

    if (msg.content.startsWith("$report"))
    {
        report(msg);
    }

    if (msg.content.startsWith("$cr") && msg.guild.member(msg.author).roles.cache.find(role => role.name == "Creditor" || role.name == "Owner" || role.name == "Mod" )) {
        createRole(msg);
    }

    if (msg.content.startsWith("$modapply"))
    {
        modapply(msg);
    }

    if (msg.content.startsWith("$trainee") && msg.guild.member(msg.author).roles.cache.find(role => role.name == "Mod" || role.name == "Admin"))
    {

        trainee(msg);

    }

    if (msg.content.startsWith("$apnt") && msg.guild.member(msg.author).roles.cache.find(role => role.name == "Mod" || role.name == "Admin"))
    {

        appointmod(msg);

    }

    if (msg.content.startsWith("$dapnt") && msg.guild.member(msg.author).roles.cache.find(role => role.name == "Admin"))
    {

        rmmod(msg);

    }
})


client.login(process.env.TOKEN)