const express = require('express');
const bodyParser = require('body-parser');
const usersRouter = require('./users');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

// 处理 /brew 路由的 GET 请求
app.get('/brew', (req, res) => {
    const drink = req.query.drink;
    if (drink === 'tea') {
        res.send('A delicious cup of tea!');
    } else if (drink === 'coffee') {
        res.sendStatus(418); // 418 I'm a teapot
    } else {
        res.sendStatus(400); // 400 Bad Request
    }
});

// 处理 /pass-it-on 路由的 POST 请求
let lastMessage = 'first';

app.post('/pass-it-on', (req, res) => {
    const message = req.body.message;
    if (!message || message.trim() === '') {
        res.sendStatus(400);
    } else {
        const responseMessage = lastMessage;
        lastMessage = message;
        res.send(responseMessage);
    }
});

// 引入用户博客路由
app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`服务器运行在 http://localhost:${port}`);
});
