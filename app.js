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
        console.log(req);
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<html><body><p>Your Request has been received!</p></body></html>');
        res.end();
    }
});

server.listen(port);

console.log(`Server started on ${port}`);