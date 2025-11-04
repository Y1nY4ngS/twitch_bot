const base = require('./base');
const makeWpCommands = require('./wp');

const command = {
    ...base,
    ...makeWpCommands()
};

module.exports = command;