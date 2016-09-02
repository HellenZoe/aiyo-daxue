var http = require('http')
var createHandler = require('github-webhook-handler')
var handler = createHandler({ path: '/incoming', secret: 'aiyodaxue' })
// 上面的 secret 保持和 GitHub 后台设置的一致

function run_cmd(cmd, args, callback) {
  var spawn = require('child_process').spawn;
  var child = spawn(cmd, args);
  var resp = "";
  var error = "";
  child.stdout.on('data', function(buffer) { resp += buffer.toString(); console.log(buffer);});
  child.stderr.on('data', function(buffer) { error += buffer.toString(); console.log(buffer);});

  child.stdout.on('end', function() { callback ("work well", resp) });
  child.stderr.on('end', function() { callback ("work faild", error) });
  child.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
  console.log("run cmd");
}

http.createServer(function (req, res) {
  handler(req, res, function (err) {
    res.statusCode = 404
    res.end('no such location')
  })
}).listen(7777)
handler.on('error', function (err) {
  console.error('Error:', err.message)
})

handler.on('push', function (event) {
  console.log('Received a push event for %s to %s',
    event.payload.repository.name,
    event.payload.ref);
  run_cmd('sh', ['./bin/deploy-dev.sh'], function(hint, text){
  console.log(hint + "-->");
  console.log(text + "-->");});
})
