const express = require('express');
const server = express();
const request = require('request');

server.set('view engine', 'ejs');
server.use(express.static('public'));

server.get('/', (req, res) =>
Promise.all([
    getContents('https://react-konzertportal-navbar.herokuapp.com/')
]).then(responses =>
res.render('index', { navbar: responses[0], featured: responses[1], concerts: responses[2], footer: responses[3]})
).catch(error =>
res.send(error.message)
)
);

const getContents = (url) => new Promise((resolve, reject) => {
    request.get(url, (error, response, body) => {
    if (error) return resolve("Error loading " + url + ": " + error.message);

return resolve(body);
});
});

const port = process.env.PORT || 8080;
server.listen(port, () => {
    console.log(`Homepage listening on port ${port}`);
});
