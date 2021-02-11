(function () {
    // 配置
    // var wsloc = "ws://127.0.0.1:8003/";
    var wsloc = "ws://106.54.229.185:8003/";
    // var host = "ws://ngrok2.xiaomiqiu.cn:8080/";
    // var wsloc = "ws://xiaochi.ngrok2.xiaomiqiu.cn:8002/";

    var secretKey = 'test'
    if (localStorage && localStorage.getItem('sk')) {
        secretKey = localStorage.getItem('sk')
    }

    // 一些helper

    // Encrypt
    function encrypt(msg) {
        return CryptoJS.AES.encrypt(msg, secretKey).toString();

    }
    function decrypt(ciphertext) {
        try {
            var bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
            return bytes.toString(CryptoJS.enc.Utf8);
        } catch (e) {
            console.log(e)
        }
        return ""
    }

    function c(tag, content, attrs) {
        var e = document.createElement(tag);
        if (typeof content === "string") {
            e.innerText = content;
        } else if (content instanceof Array) {
            for (let ee of content) {
                e.appendChild(ee)
            }
        }
        if (attrs) {
            for (var k in attrs) {
                e.setAttribute(k, attrs[k]);
            }
        }
        return e;
    }
    function g(id) {
        return document.getElementById(id);
    }

    // 逻辑
    var needToScrollEnd = false;
    var SetSecretButton = g("SetSecretButton")
    var SecretInput = g("SecretInput")
    SetSecretButton.addEventListener("click", function (evt) {
        evt.preventDefault();
        secretKey = SecretInput.value
        if (secretKey && localStorage) {
            localStorage.setItem("sk", secretKey)
            SecretInput.value = ""
            alert("密钥设置成功")
            location.reload()
        }
    })

    var ws;
    if ("WebSocket" in window) {
        // alert("您的浏览器支持 WebSocket!");

        // 打开一个 web socket
        ws = new WebSocket(wsloc);

        ws.onerror = function () {
            g('msg').innerText = "暂时连接不上服务器，请速去联系此间主人"
        }

        ws.onopen = function () {
            // Web Socket 已连接上，使用 send() 方法发送数据
            ws.send("init");
        };

        ws.onmessage = function (evt) {
            var received_msg = evt.data;
            // console.log(received_msg)
            var r = JSON.parse(received_msg)
            console.log(r)
            for (var i = r.length - 1; i >= 0; i--) {
                var m = r[i]
                var u = decrypt(m.username);
                u += "(" + m.uid + ")";
                if (u.length > 0) {
                    C.appendChild(c("div", [
                        c("div", u, { "class": "username" }),
                        c("div", decrypt(m.content), { "class": "content" }),
                        c("div", (m.created), { "class": "created" })
                    ], { "class": "chat-item" }))
                }
            }
            if (needToScrollEnd) {
                window.scrollTo(100, document.body.clientHeight)
                needToScrollEnd = false;
            }
        };
        // console.log(document.body.clientHeight)

        ws.onclose = function () {
            // 关闭 websocket
            console.log("连接已关闭...");
        };
    } else {
        // 浏览器不支持 WebSocket
        alert("您的浏览器不支持 WebSocket!");
    }
    var C = document.getElementById("C")
    var Name = document.getElementById("Name")
    var Text = document.getElementById("Text")
    var Send = document.getElementById("Send")
    function SendIt() {
        var name = Name.value.trim()
        var c = Text.value.trim()
        if (name.length > 0 && c.length > 0) {
            var data = JSON.stringify({
                username: encrypt(name),
                content: encrypt(c),
            })
            if (ws) {
                ws.send(data)
            }

            Text.value = ""

            // setTimeout(function () {
            needToScrollEnd = true;
            // }, 200)
        }
    }
    Send.addEventListener("click", SendIt)
    Text.addEventListener("keydown", function (event) {
        if (event.ctrlKey && event.keyCode == 13) {
            SendIt();
        }
    });
})()