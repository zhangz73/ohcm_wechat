"use strict";
(function() {
    var jsdom = require("jsdom");
    var JSDOM = jsdom.JSDOM;
    var FormData = require("form-data")
    var fetch = require("node-fetch");
    var request = require("request")

    global.document = new JSDOM("login.html").window.document;


    var http = require('http');
    var fs = require('fs');
    var formidable = require('formidable');

    var upload_html = fs.readFileSync("Uploading_page.html");
    var login_html = fs.readFileSync("login.html");

    var upload_path = "qr_code/";
    var url = "https://students.washington.edu/zhangz73/nodejs_test/add.php"

    http.createServer(function (req, res) {
        if (req.url === '/fileupload') {
            var form = new formidable.IncomingForm();
            form.parse(req, function (err, fields, files) {
                    // oldpath : temporary folder to which file is saved to
                    if(Object.keys(fields).length !== 0){
                        var oldpath = files.qr_code.path;
                        var newpath = upload_path + files.qr_code.name;

                        var formData = {
                            course: fields["course"],
                            qr_code: fs.createReadStream(oldpath)
                        }

                        request.post({url: url, formData: formData},
                            function optionalCallback(err, httpResponse, body){
                                if(err){
                                    return console.error("upload failed:", err);
                                }
                                res.write("<script>alert('file uploaded!')</script>");
                                res.write(upload_html);
                                res.end();
                        });

                    } else {
                        res.writeHead(200);
                        res.write(login_html);
                        return res.end();
                    }
            });
        } else if(req.url === '/start') {
            res.writeHead(200);
            res.write(login_html);
            return res.end();
        } else if(req.url === '/auth') {
            var qs = require('querystring');

            var username = '';
            var password = '';

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
                username = post.username;
                password = post.password;

                if(username === 'abc' && password === 'pass') {
                    res.writeHead(200);
                    res.write(upload_html);
                    return res.end();
                } else {
                    res.writeHead(200);
                    res.write("<script>alert('invalid username or password')</script>");
                    res.write(login_html);
                    return res.end();
                }
            });

        }
    }).listen(8086);
})();