const REGEX = /^!([a-zA-Z0-9]+)(?:\W+)?(.*)?/;

const isCommand = (msg) => {
    return REGEX.test(msg);
}

const parseCommand = (msg) => {
    const [, name, arg] = msg.match(REGEX);
    return { name: name.toLowerCase(), arg: (arg || '') };
}
module.exports = { isCommand, parseCommand };