const express = require('express');
const app = express();
const port = 4000;
const bodyParser = require('body-parser');
const { SERVER_ROOT_URI, GOOGLE_CLIENT_ID } = require('./config');
const redirectURI = "auth/google";
app.use(express.static(__dirname + '/public'));
var querystring = require('query-string');

function getGoogleAuthURL() {
    const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
    const options = {
        redirect_uri: `${SERVER_ROOT_URI}/${redirectURI}`,
        client_id: GOOGLE_CLIENT_ID,
        access_type: "offline",
        response_type: "code",
        prompt: "consent",
        scope: [
            "https://www.googleapis.com/auth/userinfo.profile",
            "https://www.googleapis.com/auth/userinfo.email"
        ].join(" ")
    };

    return `${rootUrl}?${querystring.stringify(options)}`;
}

app.get("/auth/google/url", (req, res) => {
    return res.send(getGoogleAuthURL());
});

app.get("/auth/google", (req, res) => {
  return res.send('potato');
});

app.get('/', (req, res) => {
  res.render('index');
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})