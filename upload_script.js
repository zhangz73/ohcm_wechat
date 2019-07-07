var http = require('http');
var fs = require('fs');
var formidable = require('formidable');

var upload_html = fs.readFileSync("Uploading_page.html");

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
    }
}).listen(8086);