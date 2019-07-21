"use strict";
(function() {
    var jsdom = require("jsdom");
    var JSDOM = jsdom.JSDOM;
    global.document = new JSDOM("login.html").window.document;


    var http = require('http');
    var fs = require('fs');
    var formidable = require('formidable');

    var upload_html = fs.readFileSync("Uploading_page.html");
    var login_html = fs.readFileSync("login.html");

    var upload_path = "qr_code/";

    http.createServer(function (req, res) {
        if (req.url == '/uploadform') {
            res.writeHead(200);
            res.write(upload_html);
            return res.end();
        } else if (req.url == '/fileupload') {
            var form = new formidable.IncomingForm();
            form.parse(req, function (err, fields, files) {
                // oldpath : temporary folder to which file is saved to
                var oldpath = files.qr_code.path;
                var newpath = upload_path + files.qr_code.name;
                // copy the file to a new location
                fs.rename(oldpath, newpath, function (err) {
                    if (err) throw err;
                    // you may respond with another html page
                    res.write('File uploaded and moved!');
                    res.end();
                });
            });
        } else if(req.url == '/start') {
            res.writeHead(200);
            res.write(login_html);
            return res.end();
        } else if(req.url == '/auth') {
            var qs = require('querystring');

            if (req.method == 'POST') {
                var body = '';

                req.on('data', function (data) {
                    body += data;

                    // Too much POST data, kill the connection!
                    // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
                    if (body.length > 1e6)
                        req.connection.destroy();
                });

                req.on('end', function () {
                    var post = qs.parse(body);
                    // use post['blah'], etc.
                    console.log(post.username);
                    console.log(post.password);
                });
            }
        }
    }).listen(8086);

    function qs(selector) {
        return document.querySelector(selector);
    }

    function id(idName) {
        return document.getElementById(idName);
    }

    function qsa(selector) {
        return document.querySelectorAll(selector);
    }
})();