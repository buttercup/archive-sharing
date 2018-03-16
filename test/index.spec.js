const { Archive, ArchiveSource, createCredentials } = require("buttercup");
const { generateShareForCredentials } = require("../source/index.js");

describe("index", function() {
    describe("generateShareForCredentials", function() {
        beforeEach(function() {
            this.archiveCredentials = createCredentials.fromPassword("test");
            this.sourceCredentials = createCredentials("webdav");
            this.sourceCredentials.setValue("datasource", JSON.stringify({
                type: "webdav",
                endpoint: "https://test.com",
                path: "/test.bcup"
            }));
        });

        it("generates a data URI", function() {
            return expect(generateShareForCredentials("test", this.sourceCredentials, this.archiveCredentials))
                .to.eventually.satisfy(val => /^data:image\/png;base64,/.test(val));
        });

        it("generates a valid encoding", function() {
            return generateShareForCredentials("test", this.sourceCredentials, this.archiveCredentials)
                .then(encodedURI => {
                    console.log(encodedURI);
                });
        });
    });
});
