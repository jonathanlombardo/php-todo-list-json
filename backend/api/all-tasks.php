<?php

header("Content-Type: application/json");

$json_string = file_get_contents("../db/db.json");

echo $json_string;