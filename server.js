const express = require('express');
const server = express();
const request = require('request');
const proxy = require('http-proxy-middleware');

server.set('view engine', 'ejs');

const createProxy = (path, target) =>
server.use(path, proxy({ target, changeOrigin: true, pathRewrite: {[`^${path}`]: ''} }));

createProxy('/navbar', 'https://react-konzertportal-navbar.herokuapp.com/');
createProxy('/featured', 'https://react-konzertportal-featured.herokuapp.com/');
createProxy('/concerts', 'https://react-konzertportal-concerts.herokuapp.com/');
createProxy('/footer', 'https://react-konzertportal-footer.herokuapp.com/');

server.get('/', (req, res) => res.render('index'));

const port = process.env.PORT || 8080;
server.listen(port, () => {
    console.log(`Homepage listening on port ${port}`);
});