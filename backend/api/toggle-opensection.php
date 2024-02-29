<?php

header("Content-Type: application/json");

if (empty($_POST))
  exit;

$section_index = isset($_POST["section-index"]) ? (int) $_POST["section-index"] : false;

// --debug
// $section_index = 1;

$json_string = file_get_contents("../db/db.json");
$data = json_decode($json_string, true);

$data[$section_index]["openedView"] = !$data[$section_index]["openedView"];

$json_res = json_encode($data);
file_put_contents("../db/db.json", $json_res);

echo $json_res;