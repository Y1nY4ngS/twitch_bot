const fs = require('fs');
const path = require('path');

function loadWeapons() {
	const file = path.join(__dirname, '..', '..', 'data', 'weapons.json');
	const raw = fs.readFileSync(file, 'utf8');
	const json = JSON.parse(raw);

	const weapon_Name = {};
	const weapon_Code = {};

	for (const [name, info] of Object.entries(json)) {
		let codes = {};
		if (info.codes && typeof info.codes === 'object') {
			codes = info.codes;
		} else if (info.code && typeof info.code === 'string') {
			codes = { Default: info.code };
		}

		const aliases = Array.isArray(info.aliases) ? info.aliases : [];
		weapon_Code[name] = { codes, aliases };

		[name, ...aliases].forEach(a => {
			if (a) weapon_Name[a.toLowerCase()] = name;
		});
	}
	return { weapon_Name, weapon_Code };
};

function makeWpCommands() {
	const { weapon_Code } = loadWeapons();

	const commands = {
		wp: {
			response: (username) => {
				const names = Object.keys(weapon_Code).join(', ');
				return `@${username}, available weapons: ${names}`;
			}
		}
	};

	for (const [canonicalName, data] of Object.entries(weapon_Code)) {
		const { codes, aliases } = data;

		const weaponResponse = (username, arg) => {
			const variants = Object.entries(codes);
			const count = variants.length;

			if (count === 0) {
				return `@${username}, no codes available for ${canonicalName}.`;
			}

			const filter = (arg || '').trim().toLowerCase();

			if (filter) {
				const match = variants.find(([variantName]) =>
					variantName.toLowerCase() === filter ||
					variantName.toLowerCase().includes(filter)
				);
				if (match) {
					const [variantName, code] = match;
					return `@${username}, here is the ${canonicalName} ${variantName} build: "${code}"`;
				}
			}

			if (count === 1) {
				const [[variantName, code]] = variants;
				const label = variantName.toLowerCase() === 'default' ? '' : ` ${variantName}`;
				return `@${username}, here is the ${canonicalName}${label} build: "${code}"`;
			}

			const lines = variants.map(([variantName, code]) =>
				`${canonicalName} ${variantName}: "${code}"`
			);
			return `@${username}, here are the available ${canonicalName} builds:\n` + lines.join('\n');
		};

		commands[canonicalName.toLowerCase()] = { response: weaponResponse };

		for (const alias of aliases) {
			if (!alias) continue;
			commands[alias.toLowerCase()] = { response: weaponResponse };
		}
	};

	return commands;
};

module.exports = makeWpCommands;