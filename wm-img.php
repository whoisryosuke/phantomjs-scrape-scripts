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

$sql_grab = "SELECT * from products_cali";
$grab = $conn->query($sql_grab);

if ($grab->num_rows > 0) {
    // output data of each row
    while($product = $grab->fetch_assoc()) {
      extract($product);

      // query brand db, if brand name is there
      $brand_name = ucfirst(str_replace('-', ' ', $brand));

      $sql_select = "SELECT image from cr_products WHERE name LIKE '$name' AND brand_name = '$brand_name'";
      $check = $conn->query($sql_select);

      if($check->num_rows > 0) {
        while($other_product = $check->fetch_assoc()) {
          $new_image = $other_product['image'];

        $sql = "UPDATE products_cali3
                    SET image = '$new_image'
                    WHERE name = '$name'";

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
}
