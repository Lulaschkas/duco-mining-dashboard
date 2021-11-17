<?php
//   _____                    _____  _    _ _____     __                     _               
//  |  __ \                  |  __ \| |  | |  __ \   / _|                   | |              
//  | |  | |_   _  ___ ___   | |__) | |__| | |__) | | |_ __ _ _   _  ___ ___| |_
//  | |  | | | | |/ __/ _ \  |  ___/|  __  |  ___/  |  _/ _` | | | |/ __/ _ \ __/
//  | |__| | |_| | (_| (_) | | |    | |  | | |      | || (_| | |_| | (_|  __/ |_
//  |_____/ \__,_|\___\___/  |_|    |_|  |_|_|      |_| \__,_|\__,_|\___\___|\__
//  This is a very simple PHP duco faucet created by Lulaschkas in 2021                                                                                         
                                                                                           

//ONLY FOR DEBUG AND DEVELOPEMENT
//ini_set('display_errors', 'On');
//ini_set('html_errors', 0);
//error_reporting(-1);

//For production
error_reporting(0);

//Set timezone
date_default_timezone_set("UTC"); 

//message for the transaction
$message = "Thanks for using the duco-dashboard faucet!";
try {
    //Get quiz questions from file
    require_once("quiz.php");
    //Start the session
    session_start();
    //If all values got set correctly over GET request and a correct session cookie was set continue
    if(isset($_SESSION["quiz"]) && isset($_GET["solution"]) && isset($_GET["captcha"])){
        //require passwords
        require_once("private/pass.php");
        //get hCAPTCHA code
        $responseKey = $_GET["captcha"];
        //Fetch hCAPTCHA result
        $verify = curl_init();
        curl_setopt($verify, CURLOPT_URL, "https://hcaptcha.com/siteverify");
        curl_setopt($verify, CURLOPT_POST, true);
        curl_setopt($verify, CURLOPT_POSTFIELDS, http_build_query(array("secret" => $secretKey, "response"=> $responseKey)));
        curl_setopt($verify, CURLOPT_RETURNTRANSFER, true);
        $response = curl_exec($verify);
        $responseData = json_decode($response);
        //If hCAPTCHA response was successfull
        if($responseData->success) {
            //If the submitted solution is correct
	        if($solution[$_SESSION["quiz"]]==$_GET["solution"]){
                //Get the username
                $username = $_GET["username"];
                //Check if username contains invalid characters
                if(namevalidation($username)){
                    //Check if the user already used the faucet today or ever
                    $jsonfile = file_get_contents('usertimeouts.json');
                    $time = json_decode($jsonfile,true);
                    $bypass = False;
                    $timeout = True;
                    //If the user isnt in the JSON file bypass time restriction
                    if(!isset($time[$username])){
                        $bypass = True;
                        $oldtime= time();
                    }
                    else{
                        //Save the oldtime in case something goes wrong
                        $oldtime = $time[$username];
                        //24h since last try?
                        if(time() - $time[$username] >=86400){
                            $timeout = False;
                        }
                        else{
                            $timeout = True;
                        }
                    }
                    //Check is the session cookie's time value is older than one day so the same browser cant take ducos for many accounts
                    if(isset($_SESSION["time"])){
                        if(time() - $_SESSION["time"] < 86400){
                            $bypass = False;
                            $timeout = True;    
                        }
                    }
                    //If there is no timrout ot the user gets bypassed
                    if(!$timeout || $bypass){
                        //Get the balance of the user
                        $response = file_get_contents("https://server.duinocoin.com/balances/".$username);
                        $json = json_decode($response, true);

                        //If the user is listed in the API
                        if(isset($json["result"]["balance"])){

                            //Write in the JSON file the current time
                            $jsonfile = file_get_contents('usertimeouts.json');
                            $data = json_decode($jsonfile,true);
                            $data[$username] = time();
                            $newjson = json_encode($data);
                            file_put_contents('usertimeouts.json', $newjson);

                            //If the users balance is less than 1000
                            if($json["result"]["balance"]<1000){
                                //Sleep for not sending too many requests to the faucet at once
                                sleep(1); 
                                //Get balance of the faucet
                                $response2 = file_get_contents("https://server.duinocoin.com/balances/dashboard");
                                $bala_dash = json_decode($response2, true);
                                    //If teh balance is hgiher than 10 continue
                                    if($bala_dash["result"]["balance"] > 10){
                                        //random amount of ducos (between 0.1 and 0.5)
                                        $duco = rand(800, 1200) / 1000;
                                        //Sleep for not sending too many requests to the faucet at once
                                        sleep(1); 
                                        //Send the ducos to the user over the REST-Api
                                        $response3 = file_get_contents("https://server.duinocoin.com/transaction/?username=" . $ducouser . "&password=" . rawurlencode($ducopass). "&recipient=" . rawurlencode($username) . "&amount=" . $duco . "&memo=" .rawurlencode($message));
                                        $sendresponse = json_decode($response3, true);
                                        $servermessage = explode(",", $sendresponse["result"]);
                                        //If the transaction was successfull show result + howmanyducos + trxid
                                        if($servermessage[0] == "OK"){
                                            $_SESSION["time"] = time();
                                            echo replacebad("DONE+" . strval($duco) . "+" . $servermessage[2]);
                                            //Write to statistic JSON file
                                            $jsonfile = file_get_contents('faucetinfo.json');
                                            $data = json_decode($jsonfile,true);
                                            //+1 transaction
                                            $data["transactions"]++;
                                            //+1 new user if not listed
                                            if(!isset($data["users"][$username])){
                                                $data["individual_users"]++;
                                                $data["users"][$username]["claimed"] = $duco;
                                                $data["users"][$username]["transactions"] = 1;
                                            }
                                            else{
                                                $data["users"][$username]["claimed"] += $duco;
                                                $data["users"][$username]["transactions"] += 1;
                                            }
                                            //Extend by new send ducos
                                            $data["total_ducos"]+=$duco;
                                            $data["last_coins"] = strval($duco);
                                            $data["last_user"]=replacebad($username);
                                            //new faucet balance
                                            $data["faucet_balance"]=replacebad(strval($bala_dash["result"]["balance"]));
                                            $newjson = json_encode($data);
					                        file_put_contents('faucetinfo.json', $newjson);
                                        }
                                        //If the transaction wasnt successfull set the old time in the json and show an error
                                        else{
                                            $jsonfile = file_get_contents('usertimeouts.json');
                                            $data = json_decode($jsonfile,true);
                                            $data[$username] = $oldtime;
                                            $newjson = json_encode($data);

                                            file_put_contents('usertimeouts.json', $newjson);
                                            echo "ERROR+There was an error while sending the coins. Please try again later.";
                                        }
                                    }
//All error messages:
                                    else{
                                        echo "ERROR+Sorry, but there are currently to less ducos in the faucet wallet to continue.";
                                    }

                            }
                            else{
                                echo "ERROR+Sorry, but you are too rich. We only pay out ducos for users with less than 1000 Ducos.";
                            }
                        }
                        else{
                            echo "ERROR+This user doesn't exist/isn't listed in the API or the REST-Api is currently down.";
                        }
                    }
                    else{
                        echo "ERROR+Sorry, but you have already taken your DUCOs today. Try again tomorrow.";
                    }

                }
                else{
                    echo "ERROR+The name contains invalid characters.";
                }
            }
            else{
                echo "ERROR+wrong answer! Try again.";
            }
        }
        else{
            echo "ERROR+You did not answer the Captcha correctly!";
        }
    }
    else{
        echo "ERROR+MISSING";

    }
    //Catch an unexpected error 
} catch(Exception $e){
    echo "ERROR+Internal server error - Please try again - is the Duino-Coin server having issues?";
}
//Namavalidation function with REGEX
function namevalidation($name){
        if(preg_match("/^[A-Za-z0-9_-]*$/",$name) && preg_match("/^.{3,64}$/",$name)) {
            return(true);  
        }
        else{
            return(false);
        }
    }
//replacebad characters function to prevent XSS 
function replacebad($input){
    $badchars = array("<", ">", "{", "}", "]", "[", "%", "$", "'", "\\", ",");
    return(htmlspecialchars(str_replace($badchars, "", $input)));
}

?>
