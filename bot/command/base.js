const age = require('../../bot/command/age');

module.exports = {
    help: {
        response: (username)=>
            `@${username}, here are the available commands:\n!help: List of all commands\n!info: Some info about me\n!wp: List of available weapon builds\n!<weapon_name>: Get the build code for the specified weapon.`,
    },
    info: {
        response: (username)=>
            `@${username}, my name is Quoc Hung Nguyen, I'm ${age(process.env.BOD)} and live in Switzerland.`,
  },
};
