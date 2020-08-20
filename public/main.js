(function () {
    // 配置
    var host = "ws://localhost:8080/";

    var secretKey = 'secret key 123'

    // Encrypt
    var ciphertext = CryptoJS.AES.encrypt('my message', secretKey).toString();
    console.log(ciphertext)

    // Decrypt
    var bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
    var originalText = bytes.toString(CryptoJS.enc.Utf8);

    console.log(originalText); // 'my message'

    // 一些helper

    // Encrypt
    function encrypt(msg) {
        return CryptoJS.AES.encrypt(msg, secretKey).toString();

    }
    function decrypt(ciphertext) {
        var bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
        return bytes.toString(CryptoJS.enc.Utf8);
    }

    var c = function (tag, content, attrs) {
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

    if ("WebSocket" in window) {
        // alert("您的浏览器支持 WebSocket!");

        // 打开一个 web socket
        var ws = new WebSocket(host);

        ws.onopen = function () {
            // Web Socket 已连接上，使用 send() 方法发送数据
            ws.send("init");
        };

        ws.onmessage = function (evt) {
            var received_msg = evt.data;
            console.log(received_msg)
            var r = JSON.parse(received_msg)
            console.log(r)
            for (var i = r.length - 1; i >= 0; i--) {
                var m = r[i]
                C.appendChild(c("div", [
                    c("div", decrypt(m.username), { "class": "username" }),
                    c("div", decrypt(m.content), { "class": "content" }),
                    c("div", decrypt(m.created), { "class": "created" })
                ], { "class": "chat-item" }))
                // C.innerHTML += "" + m.username + ":" + m.content + "." + m.created + "<br>"
            }
        };

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
    Send.addEventListener("click", function () {
        var name = Name.value.trim()
        var c = Text.value.trim()
        if (name.length > 0 && c.length > 0) {
            var data = JSON.stringify({
                username: encrypt(name),
                content: encrypt(c),
            })
            var request = new XMLHttpRequest();
            request.open('POST', 'api.php', true);
            request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
            request.send(data);

            Text.value = ""
        }
    })
})()