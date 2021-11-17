<?php   
    //check if the cookie as already set and then continue
    if(isset($_COOKIE["cookiesaccepted"])){
        if($_COOKIE["cookiesaccepted"] == "true"){
            //Start the session with max time of one day
            ini_set('session.cookie_lifetime', 3600);
            ini_set('session.gc_maxlifetime', 3600);
            session_set_cookie_params(3600,"/");
            session_start();
            //If no session for quiz is set 
            if(!isset($_SESSION["quiz"])){
                //Choose a random answer for this day
                $_SESSION["quiz"] = rand(0,8    );
            }
        }
    }
    
?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <!--Meta data-->
        <meta name="title" content="Duino-Coin dashboard">
        <meta name="description" content="The Duino-Coin dashboard provides a miner analysis, duco faucet, server information and more!">
        <meta name="keywords" content="duino-coin, mining, dashboard">
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta name="language" content="English">
        
        <!--open graph meta tags-->
        <meta property="og:title" content="Duino-Coin dashboard">
        <meta property="og:description" content="The Duino-Coin dashboard provides a miner analysis, duco faucet, server information and more!">
        <meta property="og:image" content="https://raw.githubusercontent.com/Lulaschkas/duco-mining-dashboard/main/ducomining.png">
        <meta property="og:url" content="https://lulaschkas.github.io/duco-mining-dashboard/index.php">

        <title>Duino-Coin Dashboard</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta charset="UTF-8">

        <link rel="shortcut icon" type="image/x-icon" href="img/ducominingdashboarddark.png">
        <link type="text/css" rel="stylesheet" href="css/main.css?version=2.2">

        <!--Google libarys-->
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@600&display=swap" rel="stylesheet"> 

        <!--hCaptcha libary -Only loaded if cookies are accepted-->
        <?php
            if(isset($_COOKIE["cookiesaccepted"])){
                if($_COOKIE["cookiesaccepted"] == "true"){
                    echo"<!--hCAPTCHA libary--><script src='https://www.hCaptcha.com/1/api.js' async defer></script>";
                }
            }
        ?>
        <!--For icons of FA-->
        <link rel="stylesheet" href="//use.fontawesome.com/releases/v5.0.7/css/all.css">
        <!--For gauges-->
        <script src="https://bernii.github.io/gauge.js/dist/gauge.min.js" type="text/javascript"></script>
        <!--For charts-->
        <script src="https://cdn.jsdelivr.net/npm/chart.js@3.1.1/dist/chart.min.js" type="text/javascript"></script>
        <!--For math formulars-->
        <script src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js" type="text/javascript"></script>




        
    </head>
    <body>
        <div class="container1">
            
            <article class="middle2">        
            <div id="dashboard">
                <img loading="lazy" src="img/banner.png" style="width:100%">
                <center>
                    <div class="tabs">
                        <ul>
                          <li id="tab1" class="is-active"><a onclick="showmy();">My Data</a></li>
                          <li id="tab2" class=""><a onclick="shownetwork();">Network data</a></li>
                        </ul>
                    </div>
                    
                    <div id="myd">
                        <div class="container is-fluid">
                            <div class="tile is-ancestor">
                                <div class="tile is-vertical is-12">
                                    <div class="tile">
                                        <div class="tile is-parent is-vertical">
                                            <article class="tile is-child has-background-light2">
                                                <div class="cardheader">
                                                    <div class="iconr">
                                                        <i class="fas fa-chart-line fa-2x"></i>
                                                        <span class="helptext">The current user balance in Duino-Coin.</span>
                                                    </div>
                                                    <p class="title" id="usernamei">User balance</p>
                                                </div>
                                                <div style="width: 90%">
                                                    <canvas id="chart1" class="frontchart" width="200" height="120"></canvas>
                                                </div>
                                                <div id="balance">
                                                    <p id="balance_dashboard" class="middletext">Loading</p>
                                              
                                                </div>
                                               <br>
                                            </article>
                                        
                                        <article class="tile is-child has-background-light2">
                                            <div class="cardheader">
                                                <div class="iconr">
                                                    <i class="fas fa-percent fa-2x"></i>
                                                    <span class="helptext">This is the <u>total</u> efficiency for AVR/ESP and PC mining. Every new AVR/ESP mining connection has the efficiency of the connection before * 0,96 and every PC mining connection * 0,8 of the connection before.</span>
                                                </div>
                                                <p class="title">Efficiency</p>
                                            </div>
                                            <div id="efficiency">
                                                
                                                <p><b>Your Miners efficiency</b></p>
                                                <p id="efficiency_avr" class="middletext">Loading</p>
                                                <p id="efficiency_pc" class="middletext">Loading</p>
                                            </div>
                                        </article>
                                     </div>
                                        <div class="tile is-parent is-vertical">
                                            <article class="tile is-child has-background-light2">
                                                <div class="cardheader">
                                                    <div class="iconr">
                                                        <i class="fas fa-tachometer-alt fa-2x"></i>
                                                        <span class="helptext">This card show the hashrate for each device group as well as the connections for each device group. On the left side are two gauges one for the total hashrate (maximum calculated by Kolkas max value) and the other one for the total user connections to the server.</span>
                                                    </div>
                                                    <p class="title">Hashrate</p>
                                                </div>
                                                <center>
                                                    <div class="columns">
                                                        <div class="column is-half">
                                                            <p><b>Hashrate:</b></p>
                                                            <canvas id="gauge07" class="gauge" style="width: 70%;"></canvas>
                                                            <p id="gauge07_val">Loading, please wait</p>

                                                            <p><b>Connections:</b></p>
                                                            <canvas id="gauge08" class="gauge" style="width: 70%;"></canvas>
                                                            <p id="gauge08_val">Loading, please wait</p>
                                                            
                                                        </div>
                                                        <div class="column is-half" >
                                                            <div id="hashratetab">
                                                                    <p id="avr">Loading</p>
                                           
                                                                    <div class="line3"></div>
                                                         
                                                                    <p id="esp">Loading</p>
                                                      
                                                                    <div class="line3"></div>
                                                 
                                                                    <p id="pc">Loading</p>
                                                                </div>
                                                        </div>
                                                    </div>
                                                </center>
                                            </article>
                                            <article class="tile is-child has-background-light2">
                                                <div class="cardheader">
                                                    <div class="iconr">
                                                        <i class="fas fa-cogs fa-2x"></i>
                                                        <span class="helptext">all informations about your miners which belong to that category.</span>
                                                    </div>
                                                    <p class="title">All Miners</p>
                                                </div>
                                                <table>
                                                    <tr>
                                                        
                                                        <td> <a href="javascript:showesp()"> <div class="notification"><span id="notification_on_1" class="dot"></span><img id="esp_img"class="imgi" src="img/esp.png"></div></a></td>
                                                        <td><a href="javascript:showavr()"><div class="notification"><span id="notification_on_2" class="dot"></span><img id="avr_img"class="imgi" src="img/arduino.png"></div></a></td>
                                                        <td><a href="javascript:showpc()"><div class="notification"><span id="notification_on_3" class="dot"></span><img id="pc_img"class="imgi" src="img/pc.png"></div></a></td>

                                                    </tr>
                                                </table>
                                                <p>Click on an image to see all your miners.</p>
                                            </article>
                                        </div>
                                        <div class="tile is-parent is-vertical">
                                            <article class="tile is-child has-background-light2">
                                                <div class="cardheader">
                                                    <div class="iconr">
                                                        <i class="fas fa-calendar-check fa-2x"></i>
                                                        <span class="helptext">The estimated card calculates the estimated duco per day based on <br> changes on the users balance. Avg. daily is more accurat but slower because it takes the data from the last 2 minutes. </span>
                                                    </div>
                                                    
                                                    <p class="title">Estimated</p>
                                                </div>
                                                <table id="estimatedtable">
                                                    <tr>
                                                        <td class="subtitle">DUCOs Per day:</td>
                                                        <b><td id="perdayc" class="estimated">Loading</td></b>
                                                    </tr>
                                                    <tr>
                                                        <td class="subtitle">DUCOs Per week:</td>
                                                        <b><td id="perweek" class="estimated">Loading</td></b>
                                                    </tr>
                                                    <tr>
                                                        <td class="subtitle">DUCOs Per month:</td>
                                                        <b><td id="permonth" class="estimated">Loading</td></b>
                                                    </tr>
                                                </table>    
                                            </article>
                                            <article class="tile is-child has-background-light2">
                                                <div class="cardheader">
                                                    <div class="iconr">
                                                        <i class="fas fa-exclamation-circle fa-2x"></i>
                                                        <span class="helptext">This card shows possible problems with your miners based on common issues. </span>
                                                    </div>
                                                    <p class="title" id="probtitle">Problems (Beta)</p>
                                                </div>
                                                <div class="subtitle" id="problemt" style="height: 110%; max-height: 300px; min-height: 100px; overflow:auto;">We have not been able to analyse your Miners. </div>
                                            </article>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <br>
                            <div class="tile is-ancestor ">
                                <div class="tile is-vertical is-12">
                                    <div class="tile">
                                        
                                        <article class="tile is-child has-background-light2">
                                            <div class="cardheader">
                                            <p class="title">Hashrate & Connection Graphs</p>
                                        </div>
                                            <div class="tabs">
                                                <ul>
                                                  <li id="tab3" class="is-active"><a onclick="showhashrate()" id="showhashrate">Hashrate and Daily</a></li>
                                                  <li id="tab4" class=""><a onclick="showconnections()" id="showconnections">Connections</a></li>
                                                </ul>
                                            </div>
                                            <div id="chart">
                                                <div id="hashrate_chart_div">
                                                    <div class="chart-container">
                                                        <canvas id="hashrate_chart"></canvas>
                                                    </div>        
                                                </div>
                                                <div id="connection_chart_div">
                                                    <div class="chart-container">
                                                        <canvas  id="connection_chart"></canvas>
                                                    </div>
                                                </div>
                                            </div>

                                        </article>
                                    </div>
                                </div>
                            </div>
                            <br>
                            <table>
                                <tr>
                                    <td> <a href="https://discord.gg/QpAnyWdxjk"> <img loading="lazy" class="imgi2" src="img/discord.png"></a></td>
                                    <td><a href="https://server.duinocoin.com/webminer.html"><img loading="lazy" class="imgi2" src="img/webminer.png"></a></td>
                                    <td><a href="https://duinocoin.com"><img loading="lazy" class="imgi2" src="img/duco.png"></a></td>
                                    <td><a href="https://wallet.duinocoin.com"><img loading="lazy" class="imgi2" src="img/wallet.png"></a></td>
                                    <td><a href="https://github.com/Lulaschkas/duco-mining-dashboard"><img loading="lazy" class="imgi2" src="img/github.png"></a></td>
                                </tr>

                            </table>
                            <div class="line3"></div>
                            <center>
                                <a href="privacy.html"><button class="button is-info is-light">Privcy policy/Legal Notice</button></a>
                                <a href="about.html"><button  class="button is-success is-light">About</button></a>
                                <a href="fixes.html" ><button class="button is-danger is-light">Fix problems</button></a>
                                <a href="whatsduco.html"><button  class="button is-warning is-light">What is duco?</button></a>


                            </center>
                        </div>
                    </div>
                    <div id="dashboardd">
                        <div class="columns">
                            <div class="column">
                            
                                    <div id="gauge">
                                        <span class="icon">
                                            <i class="fas fa-users fa-2x"></i>
                                        </span>
                                        <p id="dashboard_title">Registered</p>
                                        <canvas id="gauge01" class="gauge">
                                            
                                        </canvas>
                                        <p id="gauge01_val" class="gaugeval"></p>
                                    </div>
                                    
                            
                            </div>
                            <div class="column">
                        
                                    <div id="gauge">
                                        <span class="icon">
                                            <i class="fas fa-wifi fa-2x"></i>
                                        </span>
                                        <p id="dashboard_title">Connections</p>
                                        <canvas id="gauge02" class="gauge" width="100px" height="100px">
                                            
                                        </canvas>
                                        <p id="gauge02_val" class="gaugeval"></p>
                                    </div>
                            
                            </div>
                            <div class="column">
                        
                                    <div id="gauge">
                                        <span class="icon">
                                            <i class="fas fa-tachometer-alt fa-2x"></i>
                                        </span>
                                        <p id="dashboard_title">Hashrate</p>
                                        <canvas id="gauge03" class="gauge">
                                            
                                        </canvas>
                                        <p id="gauge03_val" class="gaugeval"></p>
                                    </div>
                        
                            </div>
                            <div class="column">
                            
                                    <div id="gauge">
                                        <span class="icon">
                                            <i class="fas fa-dollar-sign fa-2x"></i>
                                        </span>
                                        <p id="dashboard_title">Price</p>
                                        <canvas id="gauge04" class="gauge">
                                            
                                        </canvas>
                                        <p id="gauge04_val" class="gaugeval"></p>
                                    </div>
                            
                            </div>
                            <div class="column">
                        
                                    <div id="gauge">
                                        <span class="icon">
                                            <i class="fas fa-server fa-2x"></i>
                                        </span>
                                        <p id="dashboard_title">CPU</p>
                                        <canvas id="gauge05" class="gauge">
                                            
                                        </canvas>
                                        <p id="gauge05_val" class="gaugeval"></p>
                                    </div>
                        
                            </div>
                            <div class="column">
                        
                                    <div id="gauge">
                                        <span class="icon">
                                            <i class="fas fa-clock fa-2x"></i>
                                        </span>
                                        <p id="dashboard_title">All-time</p>
                                        <canvas id="gauge06" class="gauge">
                                            
                                        </canvas>
                                        <p id="gauge06_val" class="gaugeval"></p>
                                    </div>
                            </div>
                            <div class="column">
                        
                                <div id="gauge">
                                    <span class="icon">
                                        <i class="fas fa-bolt fa-2x"></i>
                                    </span>
                                    <p id="dashboard_title">Net energy</p>
                                    <canvas id="gauge09" class="gauge">
                                        
                                    </canvas>
                                    <p id="gauge09_val" class="gaugeval"></p>
                                </div>
                        </div>

                        </div>
                        <div class="chart-container" id="chart">
                            <canvas id="net_chart"></canvas>
                        </div>
                        <div class="columns">
                            <div class="column">
                                <div class="card card2">
                                    <div class="card-image">
                                      <figure class="image">
                                        <img loading="lazy" src="https://server.duinocoin.com/minerchart.png">
                                      </figure>
                                    </div>
                                    <div class="card-content">
                                          <p class="title">Miner distribution</p>
                                      <div class="content">
                                        The Duino-Coin Miner chart shows the miner distribution from the main server. But keep in mind that one single PC can make multiple connections and thous shrink the Arduino/ESP side.
                                        <br>
                                      </div>
                                    </div>
                                </div>
                            </div>
                            <div class="column">
                                <div class="card card2">
                                    <div class="card-image">
                                      <figure class="image">
                                        <img loading="lazy" src="https://server.duinocoin.com/balancechart.png">
                                      </figure>
                                    </div>
                                    <div class="card-content">
                                          <p class="title">Balance distribution</p>
                                      <div class="content">
                                        This chart shows the distribution of coins in the network. Keep in mind that some of the top 10 accounts are exchange platforms like Node-s.
                                        <br>
                                      </div>
                                    </div>
                                </div>
                            </div>
                            <div class="column">
                                <div class="card card2">
                                    <div class="card-image">
                                      <figure class="image">
                                        <img loading="lazy" src="https://server.duinocoin.com/prices.png">
                                      </figure>
                                    </div>
                                    <div class="card-content">
                                          <p class="title">Price chart</p>
                                      <div class="content">
                                        This is the estimated price chart for the different services and exchange platforms. 
                                        <br>
                                      </div>
                                    </div>
                                  </div>
                            </div>

                        </div>
                        <p>Chat/Graph image source: <a href="https://explorer.duinocoin.com/">explorer.duinocoin.com</a></p>

                        <div class="line3"></div>
                        <center>

                            <a href="privacy.html"><button class="button is-info is-light">Privcy policy/Legal Notice</button></a>
                            <a href="about.html"><button  class="button is-success is-light">About</button></a>
                            <a href="fixes.html" ><button class="button is-danger is-light">Fix problems</button></a>
                            <a href="whatsduco.html"><button  class="button is-warning is-light">What is duco?</button></a>

                            <br>

                        </center>
                    </div>


                </center>
                <br>
                <a href="index.php">
                    <button id="btn">
                        <span class="icon">
                            <i class="fas fa-arrow-circle-left fa-3x"></i>
                        </span>    
                    </button>
                </a>
                <img style="margin-bottom: -10px; width: 100%" src="img/banner2.png">
            </div>
        </article>
        <!-- MIner data popup here-->
       
            <div id="minerdata">
                <button onclick="closeminerdata()"id="btnback">
                    <span class="icon">
                        <i class="fas fa-times-circle fa-3x"></i>
                    </span>
                </button>
                <p class="title" id="minerdata_title">Loading</p>
                <div class="line"></div>
                <div style="height: 400px; overflow:auto;">
                    <table class="table" id="minerdata_data">
                    </table>
                </div>
            </div>
  
        <!--Server check page here-->

        <article class="middle3">
            <div id="pingjs" style="display: none;">
                <div id="card">
                <p id="login_header">Checking server</p>
                    
                    <div class="line"></div>

                    <table id="ping_table">
                        <tr>
                            <td>Duino-Coin Main Server</td>
                            <td>Duino-Coin APIs</td>
                        </tr>
                        <tr>
                            <td><img loading="lazy" id="s1" src="img/Spinner-2.gif"></td>
                            <td><img loading="lazy" id="s2" src="img/Spinner-2.gif"></td>
                        </tr>
                    </table>
                    <div id="loadingbar_1">
                        <div id="loadingbar_2">
                            
                        </div>
                        <div id="loadingbar_3">
                            
                        </div>
                    </div>
                    <br>
                

                    <br>
                    <center>
                        <div id="consoleu">
                            <p id="inputz">[Info] Waiting for username verification</p>
                            <p id="console"></p>

                        </div>
                    </center>
                    <br>
                
                    <button id="btn" onclick="btnfuncback()">
                        <span class="icon">
                            <i class="fas fa-arrow-circle-left fa-3x"></i>
                        </span>
                    </button>

                    <button onclick="showdebug()"id="btn">
                        <span class="icon">
                            <i class="fas fa-bug fa-3x"></i>
                        </span>
                    </button>
                    <button id="btn" onclick="btnfuncskip()">
                        <span class="icon">
                            <i class="fas fa-forward fa-3x"></i>
                        </span>
                    </button>
                    <button id="btn" onclick="btnfuncret()">
                        <span class="icon">
                            <i class="fas fa-redo fa-3x"></i>
                        </span>
                    </button>
                </div>
            </div>
        </article>


        <!--Home and login screen -->
        <div id="vueappfaucet">
            <article class="middle">
                <div id="login" class="columns">
                    <div class="news column">
                        <div id="card">
                            <center>
                                <img  id="faucetimg" v-bind:src="faucetimage" :style="imagestyle">
                            </center>
                            <div style="margin-bottom: 0px; margin-top: -20px;" class="line3"></div>
                                <div v-if="items.length">
                                    <p class="chat" v-for="item in items">{{ item }} <a :href="link">{{ ducoexplorer }}</a></li>
                                </div>
                                <div class="faucet">
                                <label style="margin-bottom: 10px;" class="checkbox">
                                    <input v-model="tos"type="checkbox">
                                    I accept the <a href="tos.html">terms of service</a>
                                </label>
                                <input v-model="username" :class="faucetinput" id="faucetinput" placeholder="duco username"> 
                                <button v-on:click="startfaucet()" id="faucetbtn">
                                    <span class="icon has-text-success">
                                        <i class="fas fa-play-circle  fa-3x"></i>
                                    </span>
                                </button>
                                </div>
                                <br>
                                <table class="table transparent is-narrow is-hoverable is-fullwidth">
                                    <tr>
                                        <th>Balance</th>
                                        <th>{{ balance }}</th>

                                    </tr>
                                    <tr>
                                        <th>Transactions</th>
                                        <th>{{ transactions }}</th>

                                    </tr>
                                    <tr>
                                        <th>Users</th>
                                        <th>{{ users }}</th>

                                    </tr>
                                    <tr>
                                        <th>Last user</th>
                                        <th>{{ last }}</th>

                                    </tr>
                                    <tr>
                                        <th>Last donator</th>
                                        <th>{{ donator }}</th>

                                    </tr>
                                </table>                            
                        </div>
                    </div>
                    <div class="column is-6">
                        <div id="card">
                            <a href="https://duinocoin.com"><img id="ducoimg" src="img/duco.png"></a>
                            <img id="ducoimg2" src="img/ducominingdashboarddark.png">
                            <p id="login_header">Duino-Coin mining Dashboard</p>
                            
                            <div class="line"></div>

                            <div id="usrname_input"> 
                                <input type="text" id="inputt" placeholder="username"> 
                                <button id="btn" onclick="btnfunc()">
                                    <span class="icon has-text-success">
                                        <i class="fas fa-arrow-circle-right  fa-3x"></i>
                                    </span>
                                </button>
                            </div>
                            
                            
                            <div style="text-size: 0.8rem;">
                                <center>
                                    <a href="privacy.html"><button class="button is-small is-info is-light">Privacy policy&Legal notice</button></a>
                                    <a href="about.html"><button  class="button is-small is-success is-light">About</button></a>
                                    <a href="fixes.html" ><button class="button is-small is-danger is-light">Fix problems</button></a>
                                    <a href="whatsduco.html"><button  class="button is-small is-warning is-light">What is Duino-Coin?</button></a>
                                    <a href="api.html"><button  class="button is-small is-primary is-light">APIs</button></a>
                                    <br>
                                </center>
                            </div>
                        </div>
                    </div>
                    <div class="column news">
                        <div id="card">
                            <div class="tabs">
                                <ul>
                                    <li id="tabn1" class="is-active"><a onclick="dashn();">Dash. updates</a></li>
                                    <li id="tabn2" class=""><a onclick="ducon();">Duco updates</a></li>
                                </ul>
                            </div>
                            <center>
                                <button style="display: none" id="external" onclick="showexternal()" >Show external content <br> from server.duinocoin.com</button>
                            </center>
                            <iframe id="duconi" class="newsframe" frameborder="0" width="100%" src="img/Spinner-2.gif"></iframe>
                            <iframe id="dashni" class="newsframe" frameborder="0" width="100%" src="news.html"></iframe>

                        </div>
                    </div>

            </div>
            <div id="servercheck" class="columns">
                    <div class="column" >
                        <div id="card" class="cardfade">
                            <p style="text-align: center;" class="fadein">Daily new users:</p>
                            <div style="margin-top: -10px" class="line3"></div>
                            <div id="minerchart" style="padding: 20px;">
                                <canvas id="daily_users" style="margin-bottom: 30px; max-height: 95%;"width="100%" height="100%"></canvas>
                            </div>
                        </div>
                    </div>
                    <div class="column is-6">
                        <div id="card"  class="cardfade">
                            <p style="text-align: center;" class="title">Server status:</p>
                                <div style="margin-top: -10px" class="line3"></div>
                                    <div style="overflow:auto;">
                                        <table id="statustable"class="table transparent" style="text-align: center; margin-bottom: 60px;">
                                            <tbody>
                                                <tr>
                                                <?php
                                                    //Print out all data from the json file
                                                    $data = file_get_contents("ducostats.json");
                                                    $stats = json_decode($data, true);
                                                    $stats = (array) $stats;
                                                    $keys = array_keys($stats);
                                                    foreach($keys as $elements){
                                                        if($elements == "lastupdate"){
                                                            break;
                                                        }
                                                        print("<th>" . $elements . "</th>");
                                                    }
                                                ?>
                                                </tr>
                                                <tr>
                                                    <?php
                                                    foreach($stats as $value => $row){
                                                        if(isset($stats[$value]["online"])){
                                                            if($stats[$value]["online"]==True){
                                                                $value = "<div class='greenpulse'></div>";
                                                            }
                                                            else{
                                                                $value = "<div class='redpulse'></div>";
                                                            }
                                                            echo"<td>" . $value . "</td>";
                                                        }
                                                    }
                                                    ?>
                                                </tr>
                                                <tr>
                                                
                                                <?php
                                                //print last update form json file
                                                    foreach($stats as $value => $row){
                                                        if(isset($stats[$value]["online"])){
                                                            date_default_timezone_set('UTC');
                                                            echo"<td>" . date('H:i d/m/y', $stats[$value]["since"]) . "</td>";
                                                        }
                                                    }
                                                    ?>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <?php echo "<center><p style='margin-bottom: 10px;'>Last update:  " . date("H:i", $stats["lastupdate"]). " UTC</p></center>"?>
                        </div>
                                
                    </div>

                    <div class="column" >
                        <div id="card" class="cardfade">
                            <p style="text-align: center;" class="fadein">Miner distribution:</p>
                            <div style="margin-top: -10px" class="line3"></div>
                            <div id="minerchart">
                                <canvas id="miner_distro" width="100%" height="100%"></canvas>
                            </div>
                        </div>
                    </div>
                    
                    </div> 
                    <div class="columns" id="rewards">
                    <div class="column is-9">
                    <div id="card" class="cardfade">
                        <div style="position: absolute;"class="button is-primary is-light is-rounded">BETA</div>

                            <p style="text-align: center;" class="title ">Current rewards:</p>
                            <div style="margin-top: -10px" class="line3"></div>
                            <?php
                                $data = file_get_contents("ducorewards.json");
                                $rewards = json_decode($data, true);

                            ?>
                        <nav class="level" style="margin:5px;">
                            <div class="level-item has-text-centered">
                                <div>
                                <p class="heading">Arduino daily coins</p>
                                <p class="title"><?php echo htmlspecialchars(round($rewards["avr"]["dailycoins"],1));?></p>
                                </div>
                            </div>
                            <div class="level-item has-text-centered">
                                <div>
                                <p class="heading">ESP8266 daily coins:</p>
                                <p class="title"><?php echo htmlspecialchars(round($rewards["esp8266"]["dailycoins"],1));?></p>
                                </div>
                            </div>
                              <p class="level-item has-text-centered">
                                <img src="img/ducominingdashboarddark.png" alt="" style="height: 30px;">
                            </p>
                            <div class="level-item has-text-centered">
                                <div>
                                <p class="heading">ESP32 daily coins:</p>
                                <p class="title"><?php echo htmlspecialchars(round($rewards["esp32"]["dailycoins"],1));?></p>
                                </div>
                            </div>
                            <div class="level-item has-text-centered">
                                <div>
                                <p class="heading">Rpi 4 dailycoins:</p>
                                <p class="title"><?php echo htmlspecialchars(round($rewards["pc/pi"]["dailycoins"],1));?></p>
                                </div>
                            </div>
                            </nav>
                            <br>
                            <div class="content has-text-centered">
                            <p>Last update: <?php echo date('H:i d/m/y', $rewards["lastupdate"]); ?></p>
                            <p>This data gets updated every 15 minutes and was created by the real made ducos in this time period by the duco community. If some value is 0 this is propably due to an error of our test devices and doesn't mean you will get 0 ducos/d.</p>
                            <p><strong>Thanks to LooTTaxi for supporting this test</strong></p>
                            </div>
                        </div>
                        </div>
                        <div class="column">
                            <div id="card" class="cardfade">
                                <p style="text-align: center;" class="title ">Duco test:</p>
                                <div style="margin-top: -10px" class="line3"></div>
                                <p class="is-3">This test determines with 6 easy questions if Duino-Coin is something for you.</p>
                                <center>
                                    <a href="ducotest.html"><button style="background: linear-gradient(90deg, rgba(251,140,63,1) 0%, rgba(252,70,103,1) 100%); " class="button is-large is-rounded"><i class="fas fa-arrow-right"></i>Duco-test</button></a>
                                </center>                            
                            </div>
                        </div>
                    </div>  
                    <div :style="faucetpopup" class="middle3" id="faucetpopup">
                        <button v-on:click="solutionclose()"class="btn" id="solutionclosebtn">
                                    <span class="icon">
                                        <i class="fas fa-times-circle  fa-3x"></i>
                                    </span>
                        </button>
                        <p class="title">Solve the Quiz</p>
                        <p>Did you thought you could just enter your username and get free ducos?</p>
                        <p>You have to work to get them, solve this simple quiz and they are yours!</p>
                        <br>
                        <?php
                            //Require quiz and echo question if session cookie was set 
                            if(isset($_SESSION["quiz"])){
                                require_once("quiz.php");
                                echo  $tasks[$_SESSION["quiz"]];
                            }
                        ?>
                        <br>
                        <div class="h-captcha" data-sitekey="95e3ff02-1c51-4904-8ba4-d3c6abee2b5b"></div>
                        <br>
                        <input v-model="solution" class="input is-warning is-rounded" id="faucetsolution" placeholder="solution"> 
                            <button v-on:click="submitsolution()"class="btn" id="solutionbtn">
                                <span class="icon has-text-success">
                                    <i class="fas fa-play-circle  fa-3x"></i>
                                </span>
                            </button>
                    </div>
                    </div>
                
            </div>
            </article>
        </div>

    </div>
    <div id="vuecookiebanner">
        <div :style="banner" id="banner" class="cookie-banner content" >
            <p >This website needs <strong>Cookies</strong> to work properly. Cookies are only used when they are strictly necessary. We use them for: </p>
            <ul>
                <li>Knowing if a user already used the faucet today</li>
                <li>Verifying that the user using the faucet is a real human through <a href="https://www.hcaptcha.com/">hCaptcha</a></li>
            </ul>
            <p>If you agree you allow us to save cookies on your device. This also includes the processing of your data in the USA by hCAPTCHA.</p>
            <p>You can find more information in our <a href="privacy.html">privacy policy</a> and the privacy policy of <a href="https://www.hcaptcha.com/privacy/">hCaptcha</a>
            <p>If you don't agree we wont save non technically necessary cookies on your device but we also can't provide the faucet for you.</p>
            <button v-on:click="accept()" class="button is-success">I agree</button>
            <button v-on:click="reject()" class="button is-danger is-light">I do not agree</button>

        </div>
        <div class="cookieinfo">
            <button v-on:click="show()" class="button">🍪</button>            
        </div>
    </div>

    <script type="text/javascript" src="js/vue.global.prod.js"></script>
    <script type="text/javascript" src="js/faucet.js?version=1.12"></script>
    <script src="js/cookiebanner.js" type="text/javascript"></script>
        <!--Main JS code-->
    <script type="text/javascript" src="js/gauges.js?version=1"></script>
    <script type="text/javascript" src="js/buttonfunctions.js?version=2.2"></script>
    <script type="text/javascript" src="js/main.js?version=2.34"></script>
    <script type="text/javascript" src="js/charts.js?v=1"></script>

    </body>
</html>
