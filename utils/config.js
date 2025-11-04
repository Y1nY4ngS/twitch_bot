function validateEnv() {
    const required = ['TWITCH_BOT_USERNAME', 'TWITCH_OAUTH_TOKEN', 'TWITCH_CHANNEL'];
    const missing = required.filter((key) => !process.env[key]);
    if (missing.length > 0) {
        throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
    }
};

module.exports = validateEnv;