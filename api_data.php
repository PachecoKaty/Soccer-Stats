<?php
    //Retrieve the league code to search
    $code = $_REQUEST['league'];
    
    //Create the channel variable that initializes the curl function
    $ch = curl_init();

    // set URL and other appropriate options
    $options = array(

        CURLOPT_URL => 'https://api.football-data.org/v4/competitions/' .$code. '/standings',
        // Use array for set up header
        CURLOPT_HTTPHEADER => array('X-Auth-Token: 5aae9f3ca6c840c79937939aa4f77491'), 
        //Transfer data
        CURLOPT_RETURNTRANSFER => TRUE
    );

    curl_setopt_array($ch, $options);

    //store the response
    $response = curl_exec($ch);

    //check errors
    if(curl_errno($ch)) {
        echo 'Error CURL: ' . curl_error($ch);
    }

    //Closed
    curl_close($ch);

    // Set the content type to JSON
    header('Content-Type: application/json');

    //Encode JSON
    $data = json_decode($response, true);

    // Set the content type to JSON
    header('Content-Type: application/json');

    // Send data JSON like response HTTP
    echo json_encode($data);
    
?>