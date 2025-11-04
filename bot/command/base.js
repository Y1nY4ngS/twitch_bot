const age = require('../command/age');
const randomNumber = require('../command/randomNumber');
const lurkMessageController = require('../middleware/lurkMessageController');

module.exports = {
    help: {
        response: (username)=>
            `@${username}, here are the available commands:\n!help: List of all commands\n!info: Some info about me\n!random <1-10>: Random number game\n!wp: List of available weapon builds\n!<weapon_name>: Get the build code for the specified weapon.`,
    },
    info: {
        response: (username)=>
            `@${username}, my name is Hung, I'm ${age(process.env.BOD)} and currently I'm in Switzerland.`,
  },
    random: {
        response: (username, argument) =>
            `@${username},${randomNumber(argument)}`,
    },
    lurk: {
        response: (username) =>
            `${lurkMessageController(username)}`
    }
};
