<?php

define('PORT', 8003);

$config = parse_ini_file(".env.ini");
$db = null;

$table = new Swoole\Table(8192);
$table->column('id', Swoole\Table::TYPE_INT, 4);
$table->create();

echo "on port ", PORT, "\n";
$server = new Swoole\Websocket\Server("127.0.0.1", PORT);
$server->table = $table;

$server->on('open', function ($server, $req) {
    echo "connection open: {$req->fd}\n";
    // $fds[$req->fd] = 0;
    // print_r($fds);
    $server->table->set(strval($req->fd), ['id' => 0]);
});

$server->on('message', function ($server, $frame) {
    echo date('c'), " received message: $frame->fd {$frame->data}\n";
    if ($frame->data === 'init') {
        $z = getById(0);
        if ($z) {
            $data = ['id' => intval($z[0]['id'])];
            $server->table->set(strval($frame->fd), $data);
            $server->push($frame->fd, json_encode($z));
        }
    } else {
        $j = json_decode(trim($frame->data), true);
        if ($j) {
            insertChat($j, $frame->fd);
        }

        // print_r($fds);
        // foreach ($fds as $fd => $id) {
        foreach ($server->table as $fd => $data) {
            $id = $data['id'];
            $z = getById($id);
            if ($z) {
                $data = ['id' => $z[0]['id']];
                $server->table->set($fd, $data);
                // echo json_encode($z) . "\n";
                echo "push ", $fd, "\n";
                $server->push(intval($fd), json_encode($z));
            }
        }
    }
});

$server->on('close', function ($server, $fd) {
    echo date('c'), " connection close: {$fd}\n";
    // unset($fds[$fd]);
    $server->table->del(strval($fd));
});

$server->start();

// =================================================================
function getDB()
{
    global $config;
    $db = new PDO($config['db_dsn'], $config['db_user'], $config['db_pass'], array(
        PDO::ATTR_PERSISTENT => true,
    ));
    $db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    return $db;
}
function prepare($sql)
{
    global $db;
    if (!$db) {
        $db = getDB();
    }
    try {
        return $db->prepare($sql);
    } catch (\Throwable $th) {
        //throw $th;
        print_r($th);
        echo "reconnecting...\n";
        $GLOBALS['db'] = $db = getDB();
    }
    return $db->prepare($sql);
}
function getById($id)
{
    global $db;
    $sql = "SELECT * from chat where id>? order by id desc limit 10";
    $s = prepare($sql);
    $s->execute([$id]);
    return $s->fetchAll(PDO::FETCH_ASSOC);
}
function insertChat($j, $uid)
{
    global $db;
    $j['uid'] = $uid;
    $s = prepare("INSERT into chat (username,content,uid,created)
    values(:username, :content, :uid, now())");
    $s->execute($j);
}
