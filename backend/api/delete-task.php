<?php

header("Content-Type: application/json");

if (empty($_POST))
  exit;

$section_index = isset($_POST["section-index"]) ? (int) $_POST["section-index"] : false;
$task_index = isset($_POST["task-index"]) ? (int) $_POST["task-index"] : false;

// --debug
// $section_index = 2;
// $task_index = 0;

$json_string = file_get_contents("../db/db.json");
$data = json_decode($json_string, true);

unset($data[$section_index]["tasks"][$task_index]);
$data[$section_index]["tasks"] = array_values($data[$section_index]["tasks"]);

$json_res = json_encode($data);
file_put_contents("../db/db.json", $json_res);

echo $json_res;