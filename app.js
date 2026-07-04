const http = require('http');

const server = http.createServer((req, res) => {

  if (req.url === '/protected-data' && req.method === 'GET') {
    
    const userIp = req.socket.remoteAddress
    const cleaned = userIp.replace(/[^\d]/g, '');
    console.log(cleaned)

    const authHeader = req.headers['authorization'];
        
   if (!authHeader) {
    res.writeHead(401, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: "Access Denied!" }));
      return;
    }
  const token = authHeader.split(' ')[1]
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: "Secret path", token: token }));
  } 
  
  else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end("Not Found!");
  }
});

server.listen(3000, () => {
  console.log('Server is running in Port 3000. ');
});


