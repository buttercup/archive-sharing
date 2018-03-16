const { ENCODING_PREFIX, ENCODING_SEPARATOR: S } = require("./symbols.js");

function buildPayload(title, sourceCredentials, archiveCredentials) {
    return sourceCredentials
        .toSecureString(archiveCredentials.password)
        .then(credentials => buildShareCode(title, credentials));
}

function buildShareCode(title, encContents) {
    const encodedTitle = title.toString("base64");
    return `${ENCODING_PREFIX}${S}${encodedTitle}${S}${encContents}`;
}

module.exports = {
    buildPayload,
    buildShareCode
};
