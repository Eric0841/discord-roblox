// Copyright (c) by Philip
// Licensed under the MIT License.


const Discord = require('discord.js');
const bot = new Discord.Client();
const { prefix, token, cookie, color } = require('./config.json'); // Get your token, prefix and cookie from here..
const nblx = require("noblox.js"); // The module of roblox..   
const fs = require('fs');
const path = require("path");
const config = require('./config.json');


//const { config } = require('dotenv');
var groupId = 12475608 // Your group id

// To change the permissions go to line 30, 56, 99 ,127, 155, 176

// Logining in..
nblx.setCookie("_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_B2610BBCFC41451AA953AA136341944CADB5FC9C363A38A0A52A5AFCB78F03FED69BEB33321B7B0180888B36A3DB69AA03F34C64B76FC33E441B684806C6E7C960C15EFB794A7572800CA479ADF94479226E1093D8AD1AE79E97BB84B7BE26973FCD46DDAACF745AFF6677402251DCAD97FD162E7FDF074DAD8717E4EAAE6CED64D09A0F4AE25B2751095C73904E088069F0A6DE4A2449324DD1A9D14FFA044783074D731C6BB9BEDF90B69EF46B632B4A6C2B0025C6E93661C6CC19A5CC51744833D276C2994370863AD225C9D32C1EDA8F8CB3056F16FD97C85A38A61E935438C6E66E754ADBDAE231B66C0C01587F1574CF173270CF564ABCAF02AC28D3EB7AFF412AD8BF4494E581F58D5AC89D1D9F2C3F275924C780CACC38F0B0EACD7D029A6ACB00B966DC843E7C1E2F15050841B5C10D4F6DA08C186CE7BC201ACFA748B9DD8104B31E23AA0220EFAA36C138AD06EBC7AD0EF56190AC65455B853C383D6CE0A96E2F60345D095D8268D1DD6F182FA8F30A425FFAEAEAECD5D25E638F20DA7510") // Logs into the acc
bot.on('ready', () => {
	console.log(`Nobloxjs bot is ready! and logged in as ${bot.user.tag}`); // Make bot online..
});



//  All the commands! do not edit ( you can edit msgs )

bot.on("message", message => {
    const args = message.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();
    if (command ===  "가입허가") {
        const member = message.author;
        const name = message.author.username;
        const url = member.displayAvatarURL();
        if (message.member.roles.cache.has('1027442387959681044')) {  //if(message.member.hasPermission('ADMINISTRATOR')) {  
            if (!args[0]) {
            message.channel.send(":x: 닉네임을 입력해주세요!")
        } else {
            const mem = args[0];
            nblx.getIdFromUsername(mem).then(id => {
                if(!id){
                    message.channel.send(":x: 그룹 요청에서 해당 사용자를 찾을 수 없습니다!!");
                } else {
                    const embed = new Discord.MessageEmbed()
                    .setColor(`${color}`)
                    .setThumbnail(`https://www.roblox.com/bust-thumbnail/image?userId=${id}&width=420&height=420&format=png`)
                    .setTitle("**그룹 가입 신청 허가 완료**")

                    .setDescription(`성공적으로 그룹 가입 신청 수락을 완료 하였습니다.\n그룹에서 **${args}**가 그룹가입 신청 허가됨!\n유저아이디 : ${id}\n정상적으로 처리 되었는지 다시 한번 확인 부탁드립니다`)

                    .setFooter('Make By RCat') //.setFooter(`${name}`,`${url}`)
                    message.channel.send(embed);
                    nblx.handleJoinRequest(groupId, id, true)
                    .catch((error)=>{
                        message.reply(`오류 발생 : 그룹 가입 요청 설정이 활성화 되지 않았을꺼 같습니다`)
                    })
                }
            });
            console.log(args[0]);
        }
    } else {
        message.channel.send(":x: 이 명령어를 사용하는 데 필요한 역할이 없습니다.");
    }
    }

    if (command === "승급") {
        const member = message.author;
        const name = message.author.username;
        const url = member.displayAvatarURL();
        if (message.member.roles.cache.has('1027442387959681044')) {  //if(message.member.hasPermission('ADMINISTRATOR')) {  
        if (!args[0]) {
            message.channel.send(":x: 닉네임을 입력해주세요!")
        } else {
            const mem = args[0];
            nblx.getIdFromUsername(mem).then(id => {
                if(!id){
                    message.channel.send(":x: 그룹에서 해당 사용자를 찾을 수 없습니다!!");
                } else {
                    nblx.changeRank(groupId, id, 1)
                    const embed = new Discord.MessageEmbed()
                    .setColor(`${color}`)
                    .setThumbnail(`https://www.roblox.com/bust-thumbnail/image?userId=${id}&width=420&height=420&format=png`)
                    .setTitle("**계급 변경 완료**") //Roblox 그룹 진급
                    .setDescription(`성공적으로 계급을 변경했습니다.\n그룹에서 **${args}**가 진급되었습니다!\n유저아이디 : ${id}\n정상적으로 처리 되었는지 다시 한번 확인 부탁드립니다`)
                    .setFooter('Make By RCat') //.setFooter(`${name}`,`${url}`)
                    message.channel.send(embed);
                }
        });
    }
} else {
    message.channel.send(":x: 이 명령을 사용하는 데 필요한 역할이 없습니다.");
}
}

if (command === "유저") {



    var rbxbot = require(`noblox.js`)
    var config = require(`./config.json`)

            const robloxname = args[0]
    
            if (!robloxname) {
                message.reply("로블록스 닉네임을 입력하세요.")
            }
            
            rbxbot.getIdFromUsername(robloxname)
                .then(async (robloxid) => {
                    rbxbot.getRankNameInGroup(config.GroupID, robloxid)
                        .then((rankname) => {
                            message.reply(`${robloxname}님은 ${rankname}에 위치해 있습니다.`)
                        })
                        .catch((err) => {
                            console.log(err)
                
                        })
              })
        
    }



if (command === "명령어") {
    const member = message.author;
        const name = message.author.username;
        const url = member.displayAvatarURL();
        const embed = new Discord.MessageEmbed()
        .setColor(`${color}`)
        .setThumbnail(`${bot.user.displayAvatarURL()}`)
        .setTitle(`${bot.user.username} Commands`)
        .setDescription(`${prefix}명령어 -- 명령 목록 표시\n${prefix}가입허가 [player_name] -- 그룹의 플레이어 가입요청 허가\n${prefix}승급 [player_name]  -- 해당 플레이어를 1등급 진급\n${prefix}강등 [player_name] -- 해당 플레이어를 1등급 강등\n${prefix}공지 [msg] -- 그룹 담벼락에 메시지를 공지합니다 (미완성)..\n${prefix}담벼락 [msg] -- 담벼락에 메시지를 게시합니다 (미완성)..\n${prefix }킥 [player_Name] -- 그룹에서 플레이어를 추방합니다.`)
        .setFooter('Make By RCat') //.setFooter(`${name}`,`${url}`)
        message.channel.send(embed);
}


if (command === "강등") {
    const member = message.author;
    const name = message.author.username;
    const url = member.displayAvatarURL();
    if (message.member.roles.cache.has('1027442387959681044')) {  //if(message.member.hasPermission('ADMINISTRATOR')) {  
        if (!args[0]) {
        message.channel.send(":x: 닉네임을 입력해주세요!")
    } else {
        const mem = args[0];
        nblx.getIdFromUsername(mem).then(id => {
            if(!id){
                message.channel.send(":x: 그룹에서 해당 사용자를 찾을 수 없습니다!!");
            } else {
                nblx.changeRank(groupId, id, -1)
                const embed = new Discord.MessageEmbed()
                .setColor(`${color}`)
                .setThumbnail(`https://www.roblox.com/bust-thumbnail/image?userId=${id}&width=420&height=420&format=png`)
                .setTitle("**계급 변경 완료**") //로블록스 그룹 강등

                .setDescription(`성공적으로 계급을 변경했습니다.\n그룹에서 **${args}**가 강등되었습니다!\n유저아이디 : ${id}\n정상적으로 처리 되었는지 다시 한번 확인 부탁드립니다`)

                .setFooter('Make By RCat') //.setFooter(`${name}`,`${url}`)
                message.channel.send(embed);
            }
    });
}
} else {
message.channel.send(":x: 이 명령어를 사용하는 데 필요한 역할이 없습니다.");
}
}

if (command === "킥") {
    const member = message.author;
    const name = message.author.username;
    const url = member.displayAvatarURL();
    if (message.member.roles.cache.has('1027442387959681044')) {  //if(message.member.hasPermission('ADMINISTRATOR')) {  
        if (!args[0]) {
        message.channel.send(":x: 닉네임을 입력해주세요!")
    } else {
        const mem = args[0];
        nblx.getIdFromUsername(mem).then(id => {
            if(!id){
                message.channel.send(":x: 그룹에서 해당 사용자를 찾을 수 없습니다!!");
            } else {
                nblx.exile(groupId, id)
                const embed = new Discord.MessageEmbed()
                .setColor(`${color}`)
                .setThumbnail(`https://www.roblox.com/bust-thumbnail/image?userId=${id}&width=420&height=420&format=png`)
                .setTitle("**추방 완료**") //로블록스 그룹 추방

                .setDescription(`성공적으로 추방을 완료하였습니다.\n그룹에서 **${args}**가 추방되었습니다!\n유저아이디 : ${id}\n정상적으로 처리 되었는지 다시 한번 확인 부탁드립니다`)

                .setFooter('Make By RCat') //.setFooter(`${name}`,`${url}`)
                message.channel.send(embed);
            }
    });
}
} else {
message.channel.send(":x: 이 명령어를 사용하는 데 필요한 역할이 없습니다.");
}
}

if (command === "공지") {
    const member = message.author;
    const name = message.author.username;
    const url = member.displayAvatarURL();
    if (message.member.roles.cache.has('995187556297756713')) {  //if(message.member.hasPermission('ADMINISTRATOR')) {  
        if (!args[0]) {
        message.channel.send(":x: 메시지를 넣어주세요!")
    } else {
        const embed = new Discord.MessageEmbed()
                .setColor(`${color}`)
                .setTitle("**공지 완료**")
                
                .setDescription(`성공적으로 공지하였습니다.\n그룹에 **${args}**가 공지되었습니다!`)

                .setFooter('Make By RCat') //.setFooter(`${name}`,`${url}`)
                message.channel.send(embed);
                nblx.shout({ group: groupId, message: `${args}` })
                .catch((error)=>{
                    message.reply(`오류 발생 : ${error}`)
                })
    }
    } else {
        message.channel.send(":x: 이 명령어를 사용하는 데 필요한 역할이 없습니다.");
    }
}

if (command === "담벼락") {
    const member = message.author;
    const name = message.author.username;
    const url = member.displayAvatarURL();
    if (message.member.roles.cache.has('995187556297756713')) {  //if(message.member.hasPermission('ADMINISTRATOR')) {  
        if (!args[0]) {
        message.channel.send(":x: 메시지를 넣어주세요!")
    } else {
        const embed = new Discord.MessageEmbed()
                .setColor(`${color}`)
                .setThumbnail(`${nblx.getLogo(groupId)}`)
                .setTitle("게시 완료")

                .setDescription(`성공적으로 게시하였습니다.\n그룹에 **${args}**가 게시되었습니다!`)
                
                .setFooter('Make By RCat') //.setFooter(`${name}`,`${url}`)
                message.channel.send(embed);
                nbx.post(groupId, `${args}`)
                .catch((error)=>{
                    message.reply(`오류 발생 : ${error}`)
                })
    }
    } else {
        message.channel.send(":x: 이 명령어를 사용하는 데 필요한 역할이 없습니다.");
    }
}

});


// Starts the bot
bot.login(process.env.token);
    