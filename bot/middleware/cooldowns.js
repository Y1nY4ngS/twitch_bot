const store = new Map();
const Cooldown_MS = 10000;

const Per_Command = {
    help: 15,
    info: 30,
    wp: 20,
};

function getCooldown(command) {
    return Per_Command[command] ?? Cooldown_MS;
};

function applyCooldown(tags, command){
    const isPrivileged = tags.mod === true;
    if (isPrivileged) return true;

    const key = `${tags['user-id'] || tags.username}:${command}`;
    const now = Date.now();
    const last = store.get(key) || 0;
    const cooldown = getCooldown(command) * 1000;

    if (now - last < cooldown){
        return false;
    }
    return true;
};

module.exports =  applyCooldown ;