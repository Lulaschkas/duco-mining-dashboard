<?php 
//For production
error_reporting(0);
$path_info = parse_path();
$style=null;
$ration=null;
if(isset($path_info[3])){
    $style = $path_info[3];
    $ratio = $path_info[2];
}
if(namevalidation($style) && namevalidation($ratio)){
    $imagerandom = random_int(1,6);
    header('Content-Type: image/jpeg');
    $image = imagecreatefromjpeg("private/img/".$imagerandom.".jpg");
    if($ratio=="mobile"){

        // Neue Größe berechnen
        $width = imagesx($image);
        $height = imagesy($image);
        $factor = 1920 / $height;
        $newwidth = $width * $factor;
        $newheight = $height * $factor;    

        // Bild laden
        $thumb = imagecreatetruecolor($newwidth, $newheight);
        // Skalieren
        imagecopyresized($thumb, $image, 0, 0, 0, 0, $newwidth, $newheight, $width, $height);
        $image = imagecrop($thumb, ['x' => 1000, 'y' => 0, 'width' => 1080, 'height' => 1920]);

    }
    else{
        // Neue Größe berechnen
        $width = imagesx($image);
        $height = imagesy($image);
        $factor = 1920 / $width;
        $newwidth = $width * $factor;
        $newheight = $height * $factor;    

        // Bild laden
        $thumb = imagecreatetruecolor($newwidth, $newheight);
        // Skalieren
        imagecopyresized($thumb, $image, 0, 0, 0, 0, $newwidth, $newheight, $width, $height);
        $image = imagecrop($thumb, ['x' => 0, 'y' => 0, 'width' => 1920, 'height' => 1080]);
    }
    
    $imageauthor=["user", "user", "user", "user", "user", "user", "user", "user"];
    $color = imagecolorallocate($image, 255, 255, 255);
    $string = "(C) Duino-Coin | image by: " . $imageauthor[$imagerandom];
    $fontSize = 5;
    $x = imagesx($image)/2-100;
    $y = imagesy($image)-100;
    imagestring($image,  $fontSize, $x, $y, $string, $color);
    if($style == "white"){
        if($image && imagefilter($image, IMG_FILTER_BRIGHTNESS, 50) && imagefilter($image, IMG_FILTER_CONTRAST, 05) && imagefilter($image, IMG_FILTER_SMOOTH, 10) ){ 
            imagejpeg($image, null, 60);
        }
    }
    else if($style == "dark"){
        if($image && imagefilter($image, IMG_FILTER_BRIGHTNESS, -70) && imagefilter($image, IMG_FILTER_CONTRAST, 10) && imagefilter($image, IMG_FILTER_SMOOTH, 10) ){ 
            imagejpeg($image, null, 60);
        }
    }
    else{
        imagejpeg($image, null, 60);
    }
    imagedestroy($image);
}
else{
    echo "<body>ERROR - Please provide all parameters. In the scheme: /arg1/arg2 <br> arg1 = mobile; desktop <br> arg2 = white; dark; normal</body>";
}
function namevalidation($name){
    if(preg_match("/[^A-Za-z0-9]+/",$name) || !preg_match("/^.{4,8}$/",$name)) {
        return(false);  
    }
    else{
        return(true);
    }
}
function parse_path() {
    $path = array();
    if (isset($_SERVER['REQUEST_URI'])) {
      $path = explode('/', $_SERVER['REQUEST_URI']);
    }
  return $path;
  }

?>
