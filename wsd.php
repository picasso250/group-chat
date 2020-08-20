#!/usr/bin/php
<?php

$config = parse_ini_file(".env.ini");

$db = new PDO($config['db_dsn'], $config['db_user'], $config['db_pass']);
$db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$id = 0;

while (1) {

    $s = $db->prepare("SELECT * from chat where id>? order by id desc limit 10");
    $s->execute([$id]);
    $z = $s->fetchAll(PDO::FETCH_ASSOC);
    if ($z) {
        $id = $z[0]['id'];
        echo json_encode($z) . "\n";
    }
    usleep(1);
}
