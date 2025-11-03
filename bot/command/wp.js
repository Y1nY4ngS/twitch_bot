const fs = require('fs');
const path = require('path');

function loadWeapons() {
    const file = path.join(__dirname,'..', '..', 'data', 'weapons.json');
    const raw = fs.readFileSync(file, 'utf8');
    const json = JSON.parse(raw);

    const weapon_Name = {};
    const weapon_Code = {};

    for (const [name, info] of Object.entries(json)) {
      weapon_Code[name] = info.code;
      const aliases = Array.isArray(info.aliases) ? info.aliases : [];
      [name, ...aliases].forEach(a => { weapon_Name[a.toLowerCase()] = name; });
    }

    return { aliasToName: weapon_Name, canonicalToCode: weapon_Code };
}

function makeWpCommands() {
    const { aliasToName, canonicalToCode } = loadWeapons();

    const weaponList = Object.keys(canonicalToCode).join(', ');

    const commands = {
      wp: {
        response: () => `Available weapons: ${weaponList}`
      }
    };

    for (const [aliasLower, canonicalName] of Object.entries(aliasToName)) {
      commands[aliasLower] = {
        response: () => `Here is the ${canonicalName} build: ${canonicalToCode[canonicalName]}`
      };
    }

    return commands;
}

module.exports = { makeWpCommands };