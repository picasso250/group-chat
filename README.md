# group-chat

## 使用方式

和别人约定好密钥（最好是足够复杂），然后就能在这里愉快的聊天了。

体验地址：

[http://picasso250.gitee.io/group-chat/](http://picasso250.gitee.io/group-chat/)

## 部署

1. 部署一个静态服务器，并将main.js 中的第5行改成第三步部署的php服务器的地址。
2. 部署一个mysql服务器，并新建xx库，导入chat.sql 文件
3. 部署一个php+swoole的服务器，并且在项目根目录建立 `.env.ini` 文件，填好内容后，执行 `php sws.php`

```
db_dsn='mysql:dbname=xx;host=127.0.0.1;charset=utf8'
db_user='xxx'
db_pass='xxx'
```


