<?php

header("Content-Type: application/json");

if (empty($_POST))
  exit;

$section_index = isset($_POST["section-index"]) ? (int) $_POST["section-index"] : false;
$task_index = isset($_POST["task-index"]) ? (int) $_POST["task-index"] : false;
$task_newtext = $_POST["task-newtext"] ?? "";

// --debug
// $section_index = 0;
// $task_index = 0;
// $task_newtext = "test";

$json_string = file_get_contents("../db/db.json");
$data = json_decode($json_string, true);

$data[$section_index]["tasks"][$task_index]["text"] = $task_newtext;

$json_res = json_encode($data);
file_put_contents("../db/db.json", $json_res);

echo $json_res;
