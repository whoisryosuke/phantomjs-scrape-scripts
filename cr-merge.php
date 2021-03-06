<?php

// Turn off all error reporting
error_reporting(0);

//mySQL
// connect to mysql
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "weedmaps_brands";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Query products db, get all data

$sql_grab = "SELECT * from cr_products";
$grab = $conn->query($sql_grab);

if ($grab->num_rows > 0) {
    // output data of each row
    while($product = $grab->fetch_assoc()) {
      extract($product);

      // query brand db, if brand name is there

      $sql_select = "SELECT name from brands_california WHERE name LIKE '$brand_name'";
      $check = $conn->query($sql_select);

      if($check->num_rows > 0) {

        // Insert into DB
        $sql = "INSERT INTO cr_products_cali2 (name, link, image, brand_name, brand_link, type, strain, lab_test, thc, cbd, cannabis, hash_oil, date_created, date_modified)
        VALUES ('$name', '$link', '$image', '$brand_name', '$brand_link', '$type', '$strain', '$lab_test', '$thc', '$cbd', '$cannabis', '$hash_oil', '$date_created', '$date_created')";

        //check for errors - print in JS console
        if ($conn->query($sql) === TRUE) {
            ?>
          <script>
            console.log('Success');
          </script>
            <?php
        } else {
            ?>
          <script>
            console.log('Error');
          </script>
            <?php
            echo "MYSQL ERROR" . mysqli_error($conn);
        }
      }


    }
}
