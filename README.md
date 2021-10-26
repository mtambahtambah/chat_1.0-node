# chat_1.0
chat versi 1.0 ( node.js , express.js, socket.io)
```
chat realtime sesedarhana mungkin dan mudah untuk dipahami,
menggunakan node.js , framework express, dan module socket.io
```
keterangan node dan npm:
> `node 12.7.0` (node -v)

> `npm 6.14.5 ` (npm -v)

## step 1
buat folder dengan nama `chat-1.0`. yg kemudian file/folder selanjutnya akan
dibuat didalamnya.
```
mkdir chat-1.0
```

## step 2
masuk ke folder yg kita buat tadi
```
cd chat-1.0
```

## step 3
jangan lupa untuk meng init / Initialization
```
npm init
```

## step 4
instal express versi 4
```
npm install express@4.17.1
 --save
```

## step 5
instal socket versi 4
```
npm install socket.io@4.3.1
```

## step 6 
buat file dengan nama `app.js` dan isi seperti dibawah ini :

```js
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});

```

atau
```
echo "const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});" > app.js
```

## step 7
kemudian buatlah file dengan nama `index.html` dan isi seperti dibawah ini:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
 <h1>berhasil</h1>
</body>
</html>
```

atau
```
echo '<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
 <h1>berhasil</h1>
</body>
</html>' > index.html
```

kemudian coba hubungkan dengan `app.js` dengan ubah souce code
dibawah seperti ini :
```js
app.get('/tester/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

app.get('/',(req,res) => {
  res.sendFile(__dirname + '/index.html')
})
```

## step 8
ubah file `index.html` seperti ini:
```html
 <style>
      body { margin: 0; padding-bottom: 3rem; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; }

      #form { background: rgba(0, 0, 0, 0.15); padding: 0.25rem; position: fixed; bottom: 0; left: 0; right: 0; display: flex; height: 3rem; box-sizing: border-box; backdrop-filter: blur(10px); }
      #input { border: none; padding: 0 1rem; flex-grow: 1; border-radius: 2rem; margin: 0.25rem; }
      #input:focus { outline: none; }
      #form > button { background: #333; border: none; padding: 0 1rem; margin: 0.25rem; border-radius: 3px; outline: none; color: #fff; }

      #messages { list-style-type: none; margin: 0; padding: 0; }
      #messages > li { padding: 0.5rem 1rem; }
      #messages > li:nth-child(odd) { background: #efefef; }
    </style>
  </head>
  <body>
    <ul id="messages"></ul>
    <form id="form" action="">
      <input id="input" autocomplete="off" /><button>Send</button>
    </form>
  </body>
```

## step 9
masukan module `socket.io`
```js
const { Server } = require("socket.io");
const io = new Server(server);
```
kemudian masukan perintah socket
```js
io.on('connection', (socket) => {
  console.log('a user connected');
});
```

masukan script `socket.io` ke `index.html`
```html
<script src="/socket.io/socket.io.js"></script>
<script>
  var socket = io();
</script>
``` 

## step 10
kemudian ubah perintah seperti ini di `app.js`
```js
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});
```

## step 11
masukan script dibawah `socket.io`
```html
<script src="/socket.io/socket.io.js"></script>
<script>
  var socket = io();

  var form = document.getElementById('form');
  var input = document.getElementById('input');

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (input.value) {
      socket.emit('chat message', input.value);
      input.value = '';
    }
  });
</script>
```

kemudian tambahkan script ini di `app.js`
```js
socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
  });
```
contoh:
```js
io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
  });
});
```
## step 12
kemudian tambahkan script ini di `app.js`

```js
 io.emit('chat message', msg);
```
contoh:
```js
io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});
```

dan tambahkan jugha di `index.html`

```js
 var input = document.getElementById('input');

   socket.on('chat message', function(msg) {
    var item = document.createElement('li');
    item.textContent = msg;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
  });
```
contoh:
```html
<script>
  var socket = io();

  var messages = document.getElementById('messages');
  var form = document.getElementById('form');
  var input = document.getElementById('input');

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (input.value) {
      socket.emit('chat message', input.value);
      input.value = '';
    }
  });

  socket.on('chat message', function(msg) {
    var item = document.createElement('li');
    item.textContent = msg;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
  });
</script>
```

## step 13
taruh script dibawah ini dengan benar iya
```js
const port = process.env.PORT || 3000;
```
```js
console.log(`ctrl+click/click http://localhost:${port}/`);
```

`* jangan lupa untuk meluruskan kaki anda, cari tempat yang nyaman, bersandarlah di dinding, jika anda tidak punya bahu untuk bersandar. tarik napas rilex kemudian resapi jalani dan nikmati *`