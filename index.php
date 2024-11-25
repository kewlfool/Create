<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Directory Listing</title>
    <!-- <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
        }
        ul {
            list-style-type: none;
            padding: 0;
        }
        li {
            margin: 10px 0;
        }
        a {
            text-decoration: none;
            color: #007BFF;
        }
        a:hover {
            text-decoration: underline;
        }
    </style> -->
</head>
<body>
    <h1>Subdirectory Listing</h1>
    <ul>
        <?php



        // Define the directory to scan
        // $directory = __DIR__;
        $directory = '/Users/bira/Documents/GitHub/Create/';

        // Scan the directory for files and folders
        $contents = scandir($directory);

        // Loop through each item in the directory
        foreach ($contents as $item) {
            // Skip . and ..
            if ($item === '.' || $item === '..') {
                continue;
            }

            // Check if the item is a directory
            if (is_dir($item)) {
                // Display as a link
                echo '<li><a href="' . htmlspecialchars($item) . '/">' . htmlspecialchars($item) . '</a></li>';
            }
        }
        ?>
    </ul>
</body>
</html>
