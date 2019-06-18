const http = require('http');
const fs = require('fs');
const port = 7000;

const server = http.createServer((req, res)=>{
    if(req.url == '/' ){
        res.writeHead(200, {'Content-Type': 'text/html'});
        const htmlFile = 'index.html';
        fs.stat(`./${htmlFile}`, (err, stats) => {
            if(stats) {
                res.statusCode = 200;
                fs.createReadStream(htmlFile).pipe(res);
            }
        });
    } else if(req.url == '/getChat') {
        res.writeHead(200, {'Content-Type':'text/html'});

        const chat = fs.createReadStream(__dirname+'/data.txt', {encoding: 'utf8'});
        chat.on('data', (buffer)=>{
            res.write(buffer);
            res.end();
        });
        
    }
    else if(req.url == '/setChat'){
        var body = "";
        req.on('data', function (chunk) {
            body += chunk;
        });
        req.on('end', function () {
            console.log('POSTed: ' + body);
            res.writeHead(200);
            res.end('<html><body><p>Your Request has been received!</p></body></html>');
        });
    }
});

server.listen(port);

console.log(`Server started on ${port}`);