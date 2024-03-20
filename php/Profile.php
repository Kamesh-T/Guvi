<?php

// Connect to MongoDB server
$manager = new MongoDB\Driver\Manager("mongodb://localhost:27017");

// Specify the database and collection names
$databaseName = "my_database1";
$collectionName = "my_collection";

// Define database and collection options
$options = [];

// Create the database command
$databaseCommand = new MongoDB\Driver\Command([
    'create' => $databaseName,
]);

// Execute the database command
$manager->executeCommand('admin', $databaseCommand);

echo "Database created successfully.";

// Create the collection command
$collectionCommand = new MongoDB\Driver\Command([
    'create' => $collectionName,
]);

// Execute the collection command
$manager->executeCommand($databaseName, $collectionCommand);

echo "Collection created successfully.";
?>
