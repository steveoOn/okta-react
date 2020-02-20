const OktaJwtVerifier = require("@okta/jwt-verifier");

const oktaJwtVerifier = new OktaJwtVerifier({
  issuer: "https://dev-134053.okta.com/oauth2/default",
  clientId: "0oa2bibdf6J19GbEj4x6",
  assertClaims: {
    aud: "api://default"
  }
});

module.exports = async (req, res) => {
  try {
    const authHeader = req.headers.authorization || "";
    const match = authHeader.match(/Bearer (.+)/);

    if (!match) {
      return res.status(401).end();
    }

    const accessToken = match[1];
    const expectedAudience = "api://default";

    const jwt = await oktaJwtVerifier.verifyAccessToken(
      accessToken,
      expectedAudience
    );

    jwt && console.log("Get jwt success!");

    res.send({ ...jwt, verify: true });
  } catch (error) {
    res.status(401).send(error.message);
  }
};
