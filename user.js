const express = require('express');
const router = express.Router();

let posts = []; // 用来存储博客帖子

// 处理添加帖子请求 /users/addpost
router.post('/addpost', (req, res) => {
    const { title, content } = req.body;
    if (!title || !content) {
        return res.sendStatus(400); // 返回 400 如果缺少 title 或 content
    }
    posts.unshift({ title, content }); // 新帖子放在数组最前面
    res.sendStatus(200); // 返回 200 成功
});

// 处理获取所有帖子请求 /users/getposts
router.get('/getposts', (req, res) => {
    res.json(posts); // 返回所有帖子数据
});

module.exports = router;
