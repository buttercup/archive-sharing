const QRCode = require("qrcode");

const MAX_LENGTH = 2953;

function generateQRCode(payload) {
    if (payload.length > MAX_LENGTH) {
        return Promise.reject(new Error(`Failed to generate share image: Payload too large: ${payload.length}`));
    }
    return new Promise((yeah, nah) => {
        QRCode.toDataURL(payload, { errorCorrectionLevel: "H", color: { dark: "#00b7acff" } }, (err, url) => {
            if (err) {
                return nah(err);
            }
            return yeah(url);
        });
    });
}

module.exports = {
    generateQRCode
};
