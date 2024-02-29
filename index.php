<?php
$folders = scandir("./");
$current_file = basename(__FILE__);

$folders = array_filter($folders, fn($folder) => $folder != "." && $folder != ".." && $folder != $current_file);
$folders = array_values($folders);


?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
  <title>TodoList</title>
  <style>
    li:hover {
      background-color: #f5f5f5;
    }

    li {
      padding: 0 !important;

    }

    a {
      text-decoration: none;
      color: inherit;
    }
  </style>
</head>

<body>
  <div class="container text-center">

    <h1 class="my-4">TodoList</h1>
    <ul class="list-group list-group-flush">
      <?php foreach ($folders as $folder): ?>
        <li class="list-group-item">
          <a href="<?= $folder ?>" class="d-block p-2 w-100 h-100">
            <?= $folder ?>
          </a>
        </li>
      <?php endforeach; ?>

    </ul>

  </div>


</body>

</html>