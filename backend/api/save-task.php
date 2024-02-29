<?php

header("Content-Type: application/json");

if (empty($_POST))
  exit;

$section_index = $_POST["section-index"] ?? false;
$section_name = $_POST["section-name"] ?? false;
$task_text = $_POST["task-text"] ?? false;

// --debug
// $section_index = "new";
// $section_name = "ZIOOOOOOOOOOOO";
// $task_text = "test2";

$isNewSection = $section_index == "new" ? true : false;

$json_string = file_get_contents("../db/db.json");
$data = json_decode($json_string, true);

if ($isNewSection) {
  $section = [
    "name" => $section_name,
    "openedView" => true,
    "tasks" => []
  ];

  $task = [
    "text" => $task_text,
    "done" => false,
  ];

  $section["tasks"][] = $task;
  $data[] = $section;
} else {
  $task = [
    "text" => $task_text,
    "done" => false,
  ];

  $data[$section_index]["openedView"] = true;
  $data[$section_index]["tasks"][] = $task;
}

$json_res = json_encode($data);
file_put_contents("../db/db.json", $json_res);

echo $json_res;