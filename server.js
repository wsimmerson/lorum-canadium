var connect = require('connect');
var serveStatic = require('serve-static');

var app = connect();
app.use(serveStatic("./site"));

app.listen(5000);
console.log('server running on port 5000\nThis server is for development purposes only. Consider using a real web server to serve the live files');
