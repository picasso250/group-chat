<?php

$config = parse_ini_file("../.env.ini");

$db = new PDO($config['db_dsn'], $config['db_user'], $config['db_pass']);
$db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$id = 0;

$entityBody = file_get_contents("php://input");
// echo $entityBody;
$j = json_decode(trim($entityBody), true);
if ($j) {
    $s = $db->prepare("INSERT into chat (username,content,created)
            values(:username, :content, now())");
    $s->execute($j);
}
