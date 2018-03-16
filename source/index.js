const { buildPayload } = require("./payload.js");
const { generateQRCode } = require("./image.js");

function generateShareForCredentials(title, sourceCredentials, archiveCredentials) {
    return buildPayload(title, sourceCredentials, archiveCredentials)
        .then(payload => generateQRCode(payload));
}

function generateShareForSource(archiveSource) {
    if (archiveSource.status !== "unlocked") {
        return Promise.reject(new Error(`Failed generating share for source: Invalid state: ${archiveSource.status}`));
    }
    return generateShareForCredentials(
        archiveSource.name,
        archiveSource._sourceCredentials,
        archiveSource._archiveCredentials
    );
}

module.exports = {
    generateShareForCredentials,
    generateShareForSource
};
