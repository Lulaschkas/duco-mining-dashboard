//#####################################################################################################################################//
//     | |                               (_)     (_)                     | |         | |   | |                       | |               //
//   __| |_   _  ___ ___ ______ _ __ ___  _ _ __  _ _ __   __ _ ______ __| | __ _ ___| |__ | |__   ___   __ _ _ __ __| |               //
//  / _` | | | |/ __/ _ \______| '_ ` _ \| | '_ \| | '_ \ / _` |______/ _` |/ _` / __| '_ \| '_ \ / _ \ / _` | '__/ _` |               //
// | (_| | |_| | (_| (_) |     | | | | | | | | | | | | | | (_| |     | (_| | (_| \__ \ | | | |_) | (_) | (_| | | | (_| |               //
//  \__,_|\__,_|\___\___/      |_| |_| |_|_|_| |_|_|_| |_|\__, |      \__,_|\__,_|___/_| |_|_.__/ \___/ \__,_|_|  \__,_|               //
//                                                         __/ |                                                                       //
//                                                        |___/                                                                        //
//#####################################################################################################################################//

let miners = [];              // Global miners array. Needs to be accessed by all different functions
let start;                    // Global variable for the beginning time
let balance;                  // Global variable for the start userbalance - (Avg. daily calculation)
let ducomadesincesartdaily;   // Global variable for the total ducos made since start (Avg. daily calculation)


//The general function that gets executed every 3 seonds and calls all other functions to update smth on the dashboard
function dashboardloop(chart,user,chart_net, chart_hash, chart_con){ //Every 3 seconds
    var current = new Date();
    var time = current.getHours() + ":" + current.getMinutes() +":" + current.getSeconds(); //calulcate time 
    updateuserbalance(user, chart, time);            //Fetch data from balances.json AND Update the userbalance and graph
    networkgauges(chart_net, time);                    //Fetch data from api.json AND Update the network gauges and graph 
    minerdata(user, chart_hash, chart_con, time);       //Fetch data from miners.json AND Update the minerdata, call the problems function...
}


//Show all devices which belong to category X 
const tabletitle = "<tr><th style='width:100px;'>Device</th><th>Identifier</th><th>Hashrate</th><th>Accepted / Rejected</th><th>Last time per share</th><th>Algorithm</th><th>Difficulty</th></tr>"
//Not in buttonfunctions.js because these depend on the global miner array
function showesp(){
     //Array miners 0=sotware 1=hashrate 2=accepted shares 3= rejected shares 4=sharetime 5=algo 6=difficult 7=identifier
     document.getElementById("minerdata").style.display="block";
    
    setTimeout(()=>{
        document.getElementById("minerdata").style.opacity=80;
    },500); 
    document.getElementById("minerdata_title").innerHTML="Mining ESPs:";
    document.getElementById("minerdata_data").innerHTML=tabletitle;
    let i = false;
    miners.forEach((element) => {
            if(element[0].includes("ESP")){
                i =true;
                document.getElementById("minerdata_data").innerHTML+="<tr><td><b>"+element[0]+"</b></td><td>" +element[7] +"</td><td>" +Math.round((element[1]/1000)*10)/10 +"KH/s</td><td>" + element[2] + "/" + element[3] + " (" + Math.round(element[3]/element[2]*10000)/100  + "%)</td><td>" +  element[4] + "</td><td>" + element[5] + "</td><td>" + element[6] + "</td>";
            }
        }
    );
    if(!i){
        document.getElementById("minerdata_data").innerHTML+="<tr><td><b>nothing here</b></td><td>nothing here</td><td>? KH/s</td><td>?/? (?%)</td><td>nothing here</td><td>Nothing here</td><td>Nothing here</td>";
    }

}
function showavr(){ //Show all miners (with popup) that are in the category Arduino 
    //Array miners 0=sotware 1=hashrate 2=accepted shares 3= rejected shares 4=sharetime 5=algo 6=difficult 7=identifier
    document.getElementById("minerdata").style.display="block";
    setTimeout(()=>{
        document.getElementById("minerdata").style.opacity=80;
    },500);
   document.getElementById("minerdata_title").innerHTML="Mining Arduinos:";
   document.getElementById("minerdata_data").innerHTML=tabletitle;
   let i = false;
   miners.forEach((element) => {
           if(element[0].includes("AVR")){ //For every miner with AVR in sofware name add a new row in the table
               document.getElementById("minerdata_data").innerHTML+="<tr><td><b>"+element[0]+"</b></td><td>" +element[7] +"</td><td>" +element[1] +"H/s</td><td>" + element[2] + "/" + element[3] + " (" + Math.round(element[3]/element[2]*10000)/100  + "%)</td><td>" +  element[4] + "</td><td>" + element[5] + "</td><td>" + element[6] + "</td>";
                i=true;
            }
       }
   );
   if(!i){
    document.getElementById("minerdata_data").innerHTML+="<tr><td><b>nothing here</b></td><td>nothing here</td><td>? KH/s</td><td>?/? (?%)</td><td>nothing here</td><td>Nothing here</td><td>Nothing here</td>";
    }

}
function showpc(){ // Show ALl miners (with the popup) that are in the category PC/other
    //Array miners 0=sotware 1=hashrate 2=accepted shares 3= rejected shares 4=sharetime 5=algo 6=difficult 7=identifier
    document.getElementById("minerdata").style.display="block";
        setTimeout(()=>{
        document.getElementById("minerdata").style.opacity=80;
    },500);
   document.getElementById("minerdata_title").innerHTML="Mining PCs and other devices:";
   document.getElementById("minerdata_data").innerHTML=tabletitle;
   let i =false;
   miners.forEach((element) => {
           if(!element[0].includes("ESP") && !element[0].includes("AVR")){ //Show every other element that doesnt include ESP and AVR in softwarename
               document.getElementById("minerdata_data").innerHTML+="<tr><td><b>"+element[0]+"</b></td><td>" +element[7]+"</td><td>" +Math.round((element[1]/1000000)*100)/100 +"MH/s</td><td>" + element[2] + "/" + element[3] + " (" + Math.round(element[3]/element[2]*10000)/100  + "%)</td><td>" +  element[4] + "</td><td>" + element[5] + "</td><td>" + element[6] + "</td>";
                i=true;
            }
       }
   );
   if(!i){
    document.getElementById("minerdata_data").innerHTML+="<tr><td><b>nothing here</b></td><td>nothing here</td><td>? KH/s</td><td>?/? (?%)</td><td>nothing here</td><td>Nothing here</td><td>Nothing here</td>";
    }

}


//Global vars which get actualised from this function:
let cpu;
let hashrate;
let connections;
//Function to update the network gauges and also update the network graph - Data from the duco api "api.json"
function networkgauges(chart_net, time){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
        if (this.readyState == "4" && this.status == 200) {   //Check if the website is not loading anymore and webserver returns status code 200#
                var api = xmlhttp.response;
                
                //Get data from the JSON file and put it in Variables - First pass everything to validate function to prevent XSS
                var registeredusers = validate(api["Registered users"].toString());
                connections = validate(api["Active connections"].toString());
                cpu = validate(api["Server CPU usage"].toString());
                hashrate = validate(api["Pool hashrate"].toString());
                var price = validate(api["Duco price"].toString());
                var alltime = validate(api["All-time mined DUCO"].toString());

                var hashrate2 = hashrate.split(' ');

                if(hashrate2[1] == "GH/s"){             //To convert GH/s to MH/s 
                    hashrate2[0] = hashrate2[0]*1000;
                }

                
                var roundedhashrate = Math.round(hashrate2[0] * 100) / 100;    //Round hashrate
                
                //Update the gauges - see gauges.js file
                gauge01(registeredusers);
                gauge02(connections);
                gauge03(roundedhashrate);
                gauge04(price);
                gauge05(cpu);
                gauge06(alltime);

                //Update the text under the gauges 
                document.getElementById("gauge01_val").innerHTML = registeredusers;
                document.getElementById("gauge02_val").innerHTML = connections;
                document.getElementById("gauge03_val").innerHTML = roundedhashrate + " MH/s";
                document.getElementById("gauge04_val").innerHTML = price.toString() + " $";
                document.getElementById("gauge05_val").innerHTML = cpu.toString() + " %" ;
                document.getElementById("gauge06_val").innerHTML = Math.round(alltime);


                //Update the graph
                addgraphnet(time, cpu, connections, hashrate2[0], chart_net);
        }
    };
    xmlhttp.open("GET", "https://server.duinocoin.com/api.json", true); //request the api.json file
    xmlhttp.responseType = 'json';
    xmlhttp.send();
}


//Global variables by this function:
let wait=0;
let oldb = 0;
let userbalance;
//This function updates the userbalane text and userbalance graph 
function updateuserbalance(user, graph, time){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange =function(){
    if (this.readyState == "4" && this.status == 200) {   //Check if the website is not loading anymore and webserver returns status code 200
        if(xmlhttp.response["result"]["username"] == user){    
            userbalance = parseFloat(validate(xmlhttp.response["result"]["balance"].toString())); //Update the global var
            var rounded = Math.round(userbalance * 100) / 100;
            document.getElementById("balance_dashboard").innerHTML = rounded + "ᕲ"; //Update userbalance text box
            
            if(wait==0){                   //set the firt userbalance for the Duco per day valculation tool
                oldb = userbalance; 
            }
            if(wait==5){                   //After 30s (because this gets executed every 3s) call the calculatedaily funtion and reset the counter
                wait=0;
                calculdaily(userbalance, oldb)
            }
            else{                       //If shorter than 15s since last recalculation add 1 to i
                wait++;
            }
            addgraph(time, userbalance, graph);  //Update the userbalance graph
        }
        else{
            document.getElementById("problemt").innerHTML="<p id='problems'><b>API ERROR:</b><br>The REST API is having issues - please try again later - delivered data may be delayed or wrong</p> ";
            console.log("[ERROR] API gave data with wrong username")
        }

    }
    };
    xmlhttp.open("GET", "https://server.duinocoin.com/balances/" + user, true); //request the balances.json file
    xmlhttp.responseType = 'json';
    xmlhttp.send();
}

function problems(miners, geseffavr, geseffpc){                    //Check for possible problems while mining
//This function checks every mining device after its cateory for some points and shows error if it detects a problem
    document.getElementById("problemt").innerHTML="";
    var problems = 0;
    if(geseffavr<50){
        problems++;
        document.getElementById("problemt").innerHTML+="<p id='problems'><b>Too low efficiency on AVR/ESP:</b> Kolka controls the reward of miners. Every new miner connection mines 4% less duco than the miner before. 1.=100%, 2.=96%, 3.=92%..<a href='fixes.html'>How to fix</a></p>"
    }
    if(geseffpc<50){
        problems++;
        document.getElementById("problemt").innerHTML+="<p id='problems'><b>Too low efficiency on PC/other:</b> Kolka controls the reward of miners. Every new PC miner connection mines 20% less duco than the miner before. 1.=100%, 2.=80%, 3.=64%...<a href='fixes.html'>How to fix</a></p>"
    }
    miners.forEach(//For each mining device
        function(element){                        
            var fix = "<a href='fixes.html'>How to fix</a></p>"
            if((element[0].includes("ESP8266") || element[0].includes("ESP")) && !element[0].includes("ESP32")){
                var info = "<p id='problems'><b>ESP8266 with Rigname:</b> " + element[7] + " <b>and Softwarename:</b> " + element[0] + " <b>with Hashrate:</b> " + element[1] + "H/s ";
                if(element[1]<5000){              //Too low Hashrate
                    document.getElementById("problemt").innerHTML+=info + " is mining too slow. " + fix;
                    problems++;
                }
                if(element[1]>13000){              //Too high hashrate
                    document.getElementById("problemt").innerHTML+=info + element[7] + " is mining too fast (thats not better). " + fix;
                    problems++;
                }
                if((element[3] / element[2]) > 0.05){  //Too many rejected
                    document.getElementById("problemt").innerHTML+=info + " has to many rejected Shares. " + fix;
                    problems++;
                }
                if(element[2]==0){                  //Not started mining
                    document.getElementById("problemt").innerHTML+=info + " does not start mining. " + fix;
                    problems++;
                }
            }
            if(element[0].includes("ESP32")){     //checking for ESP32
                var info = "<p id='problems'><b>ESP32 with Rigname:</b> " + element[7] + " <b>and Softwarename:</b> " + element[0] + " <b>with Hashrate:</b> " + element[1] + "H/s ";
                if(element[1]<4000){              //Too low Hashrate
                    document.getElementById("problemt").innerHTML+=info + " is mining too slow. " + fix;
                    problems++;
                }
                if(element[1]>17000){              //Too high hashrate
                    document.getElementById("problemt").innerHTML+=info + " is mining too fast (thats not better). " + fix;
                    problems++;
                }
                if((element[3] / element[2]) > 0.05){  //Too many rejected
                    document.getElementById("problemt").innerHTML+=info + " has to many rejected Shares. (" + (element[3] / element[2]+element[3])+ ")" + fix;
                    problems++;
                }
                if(element[2]==0){                  //Not started mining
                    document.getElementById("problemt").innerHTML+=info + " does not start mining. " + fix;
                    problems++;
                }
            }
            
            if(element[0].includes("AVR")){
                var info = "<p id='problems'><b>Arduino with Rigname:</b> " + element[7] + " <b>and Softwarename:</b> " + element[0] + " <b>with Hashrate:</b> " + element[1] + "H/s ";
                if(element[1]<40){              //Too low Hashrate
                    document.getElementById("problemt").innerHTML+=info +  " is mining too slow. " + fix;
                    problems++;
                }
                if(element[1]>235){              //Too high hashrate
                    document.getElementById("problemt").innerHTML+=info + " is mining too fast (thats not better). " + fix;
                    problems++;
                }
                if((element[3] / element[2]) > 0.05){  //Too many rejected
                    document.getElementById("problemt").innerHTML+=info+ " has to many rejected Shares. " + fix;
                    problems++;
                }
                if(element[2]==0){                  //Not started mining
                    document.getElementById("problemt").innerHTML+=info+ " does not start mining. " + fix;
                    problems++;
                }

            }
            if(element[0].includes("PC Miner") && element[5].includes("XXHASH")){
                var info = "<p id='problems'><b>PC (XXHASH) with Rigname: </b>" + element[7] + " <b>and Softwarename:</b> " + element[0] + " <b>with Hashrate:</b> " + element[1] + "H/s ";
                if(element[2] > 3){ //Only check if more than 3 shares got submitted
                    if(element[1]<30000){              //Too low Hashrate
                        document.getElementById("problemt").innerHTML+=info +  " is mining too slow. " + fix;
                        problems++;
                    }
                    if(element[1]>200000){              //Too high hashrate
                        document.getElementById("problemt").innerHTML+=info +  " is mining too fast (thats not better). " + fix;
                        problems++;
                    }
                    if((element[3] / element[2]) > 0.05){  //Too many rejected
                        document.getElementById("problemt").innerHTML+=info + " has to many rejected Shares. (" + (element[3] / element[2]+element[3])+ ")" +fix;
                        problems++;
                    }
                }
                if(element[2]==0){                  //Not started mining
                    document.getElementById("problemt").innerHTML+=info+ " does not start mining. " + fix;
                    problems++;
                }

            }
            if(element[0].includes("PC Miner") && element[5].includes("DUCO-S1")){
                var info = "<p id='problems'><b>PC (DUCO-S1) with Rigname:</b> " + element[7] + " <b>and Softwarename: </b>" + element[0] + " <b>with Hashrate:</b> " + element[1] + "H/s ";
                if(element[2] > 3){ //Only check if more than 3 shares got submitted
                    if(element[1]<30000){              //Too low Hashrate
                        document.getElementById("problemt").innerHTML+= info + " is mining too slow. " + fix;
                        problems++;
                    }
                    if(element[1]>200000){              //Too high hashrate
                        document.getElementById("problemt").innerHTML+= info + " is mining too fast (thats not better)." + fix;
                        problems++;
                    }
                    if((element[3] / element[2]+element[3]) > 0.05){  //Too many rejected
                        document.getElementById("problemt").innerHTML+= info + " has to many rejected Shares. "  + fix;
                        problems++;
                    }
                }
                if(element[2]==0){                  //Not started mining
                    document.getElementById("problemt").innerHTML+= info + " does not start mining. " + fix;
                    problems++;
                }

            }
            if(element[0].includes("Official") || element[0].includes("ESP")){
                if(!element[0].includes("v2.3") && !element[0].includes("v2.45") && !element[0].includes("v2.46")&& !element[0].includes("v2.47") && !element[0].includes("v2.4") && !element[0].includes("v2.5")){
                    document.getElementById("problemt").innerHTML+="<p id='problems'><b>Miner with Rigname:</b> " + element[7] + " <b>Full Software name:</b> " + element[0] + " <b>is propably using an old Version. Please upgrade.</b> <a href='https://github.com/revoxhere/duino-coin/releases'>Download</a></p>"
                    problems++;
                }
            }
        }

);
document.getElementById("probtitle").innerHTML="Problems (" + problems +")";  //Show the number of problems
let hashratereal = 0;
if(hashrate.split(" ")[1] == "GH/s"){             //To convert GH/s to MH/s 
    hashratereal = hashrate.split(" ")[0]*1000;
}
else{
    hashratereal = hashrate.split(" ")[0]*1000;
}
if(hashratereal<100 || cpu>90 || connections<500){   //Show an extra error-message if the server is having problems 
    document.getElementById("problemt").innerHTML+="<p id='problems'> The server is having issues, there might be mining problems. Please wait </p>";
}

}

function minerenergy(){
    console.log("[DEBUG] downloaded miners.json file");
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
        if (this.readyState == "4" && this.status == 200) { 
            allminer = xmlhttp.response;
            miners = [];
            let watt=0;
            allminer["result"].forEach(
                function(value){
                    if(value["software"].includes("ESP32") || value["software"].includes("esp32")){
                        watt+=0.7;  //1,4W for ESP32 @ peak 480mA/3,3V but has 2 cores
                    }
                    else if(value["software"].includes("ESP8266") || value["software"].includes("esp8266") || value["software"].includes("ESP") || value["software"].includes("esp")){
                        watt+=1.3; //1,3W for ESP8266 @ peak 400mA/3,3V
                    }
                    else if(value["software"].includes("AVR") || value["software"].includes("avr")){
                        watt+=0.2; //0,2W for Arduino @ peak 40mA/5V
                    }
                    else{
                        if(value["identifier"].includes("Raspberry") || value["identifier"].includes("pi")){
                            watt+=3.875; // 3,875 for one Pi4 core - pi4 max 15,8W 
                        }
                        else{
                            watt+=9; //~70W for normal CPU and 8 mining threads = 9W per mining thread
                        }
                    } 
                }
            );
            document.getElementById("allwatt").innerHTML="~" + Math.round(watt/10)/100 + "kW";
            document.getElementById("allwattday").innerHTML="~" + Math.round((Math.round(watt/10)/100)*240)/10 + "kW/h per day";
        }
    };
    xmlhttp.open("GET", "https://server.duinocoin.com/miners", true);
    xmlhttp.responseType = 'json';
    xmlhttp.send();
}

function minerdata(username, chart_hash, chart_con, time){  //This function is sorting all miners for the given username
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
        if (this.readyState == "4" && this.status == 200) {   //Check if the website is not loading anymore and webserver returns status code 200
            allminer = xmlhttp.response;
            let check = false;
            if([0] in allminer["result"]){
                if(allminer["result"][0]["username"] == username){
                    check = true;
                }
            }
            if(allminer["result"].length == 0 || check){
                
                miners = [];
                allminer["result"].forEach(
                    function(element){
                        miners.push([validate(element["software"]), parseFloat(element["hashrate"]), parseInt(element["accepted"]), parseInt(element["rejected"]), parseFloat(element["sharetime"]), validate(element["algorithm"]), parseInt(element["diff"]), validate(element["identifier"])]); //add a lot of data to the public array miners
                    }
                );
                var avr = [0,0];
                var pc = [0,0];
                var esp = [0,0];
                var hashrateall =0;
                miners.forEach(                 //Sort which devices are mining and wit which hashrate
                    function(element){
                        hashrateall += element[1];
                        if(element[0].includes("ESP")){
                            esp[0]+=1;                  //Add number to mining devices of this category
                            esp[1]+=element[1];         //Add hashrate 
                        }
                        else if(element[0].includes("AVR")){
                            avr[0]+=1;
                            avr[1]+=element[1];
                        }
                        else{
                            pc[0]+=1;
                            pc[1]+=element[1];
                        }
                    }
                );
                if(esp[0]==0){
                    document.getElementById("notification_on_1").style.display = "none";
                }
                else{
                    document.getElementById("notification_on_1").style.display = "block";
                }
                if(avr[0]==0){
                    document.getElementById("notification_on_2").style.display = "none";
                }
                else{
                    document.getElementById("notification_on_2").style.display = "block";
                }
                if(pc[0]==0){
                    document.getElementById("notification_on_3").style.display = "none";
                }
                else{
                    document.getElementById("notification_on_3").style.display = "block";
                }
                addgraphashnew(time, daily, avr[1], esp[1]/1000, pc[1]/1000, ducomadesincesartdaily, chart_hash);    //Update the graph for hashrate 
                var all = esp[0] + avr[0];
                var effavr = 100;
                var geseffavr=0;
                var geseffpc=0;
                while (all >0){
                    all--;
                    geseffavr+=effavr;
                    effavr= effavr*0.96;
                    
                }
                geseffavr = geseffavr/(esp[0] + avr[0]);
                if(avr[0] + esp[0]==0){
                    geseffavr=100;
                }
                document.getElementById("efficiency_avr").innerHTML="AVR/ESP: " + Math.round(geseffavr*1000)/1000 + "%";

                all = pc[0]
                effpc = 100;
                while (all >0){
                    all--;
                        geseffpc+=effpc;
                    effpc= effpc*0.8;
                    
                }

                geseffpc = geseffpc/(pc[0]);
                if(pc[0]==0){
                    geseffpc=100;
                }
                document.getElementById("efficiency_pc").innerHTML= "PC: " + Math.round(geseffpc*10)/10 + "%";
                if(geseffpc>50){
                    document.getElementById("efficiency_pc").style.color = "green";
                }
                if(geseffpc<=50){
                    document.getElementById("efficiency_pc").style.color= "red";
                }
                if(geseffavr>50){
                    document.getElementById("efficiency_avr").style.color = "green";
                }
                if(geseffavr<=50){
                    document.getElementById("efficiency_avr").style.color= "red";
                }

                var max = (esp[0]*13000 + avr[0]*180 + pc[0]*500000) / 1000000;  //Calculate the maximum possible hashrate for the user based on Kolka V4 
                hashrateallmh = (Math.round((hashrateall /1000000)*1000))/1000;  //Calulate MH/s and round the value
                if(max==0){ //If the user is not mining set maximal hashrate to 1 (otherwise the gauge looks broken)
                    max = 1;
                }
                

                //Feed the HTML data tile (hashrate) with data to each device groupe
                document.getElementById("avr").innerHTML = "<b>Arduino: </b><br><div class='colorfult'>" + Math.round((avr[1] / 1000)*1000)/1000 + " kH/s" + " (" + avr[0] + ")</div>";
                document.getElementById("pc").innerHTML = "<b>PC/Other: </b><br><div class='colorfult'>" + Math.round((pc[1] / 1000000)*1000)/1000 + " MH/s" + " (" + pc[0] + ")</div>";
                document.getElementById("esp").innerHTML = "<b>ESP: </b><br><div class='colorfult'>" + Math.round((esp[1] / 1000)*1000)/1000+ " kH/s" + " (" + esp[0] + ")</div>";
                
                //Update the gauge for user hashrate 
                gauge07(hashrateallmh, max);
                //Update the text under the gauge for user hashrate
                document.getElementById("gauge07_val").innerHTML = hashrateallmh + " MH/s";

                //Calculate how many connections the user has total
                var allcons = avr[0] + esp[0] + pc[0];
                //Update the gauge for user connections 
                gauge08(allcons);
                //Update the text under the gauge
                document.getElementById("gauge08_val").innerHTML = allcons + "  Con";

                //Call the problems functions and pass the miners array wih all important data 
                problems(miners, geseffavr, geseffpc);

                //Update the connection chart
                addgraphash(time, avr[0]+esp[0]+pc[0], avr[0], esp[0], pc[0], chart_con);
            }
            else{
                document.getElementById("problemt").innerHTML="<p id='problems'><b>API ERROR:</b><br>The REST API is having issues - please try again later - delivered data may be delayed or wrong</p> ";
                console.log("[ERROR] API gave data with wrong username")
            }
        }
    };
    xmlhttp.open("GET", "https://server.duinocoin.com/miners?username="+ username, true);
    xmlhttp.responseType = 'json';
    xmlhttp.send();
}

//Calculate daily ducos 
let daily = 0; 
let alreadyreset = false;
function calculdaily(newb, oldb){

    //Duco made in last 15 seconds
    var ducomadein = newb - oldb;

    //Calculate per day
    var dayduco = ducomadein * 5760;   //86400 seconds daily / 15s = 5760

    //round daily duco value
    daily = Math.round(dayduco * 100) / 100;
    
    //Get duco since start of the page
    var ducomadesincestart = newb-balance;
    var secondssincestart = (Date.now() - start) / 1000; //MIlliseconds since sart of the page

    //smaller average time span 
    if((Date.now() - start)>120000 && alreadyreset == false){    //If last date compared to date now is bigger than 1 minmute^
        console.log("[DEBUG] reset avg (1/2)");
        alreadyreset = true;
        let start1 = Date.now(); 
        let balance1 = userbalance;
        setTimeout(()=>{     //Smooth dimm off and on from login to server check
            console.log("[DEBUG] reset avg (2/2)");
            start = start1;
            balance = balance1;
            alreadyreset = false;
        }, 119900);
    }
  
    ducomadesincesartdaily = Math.round(((86400/secondssincestart)*ducomadesincestart)*10)/10;
    //Update the tile "Estimated" with data
    document.getElementById("perday").innerHTML = daily + " ᕲ";
    document.getElementById("perdayc").innerHTML = ducomadesincesartdaily + " ᕲ";
    document.getElementById("perweek").innerHTML = Math.round(daily*7) + " ᕲ";
    document.getElementById("permonth").innerHTML = Math.round(daily*30) + " ᕲ";
}


//Global vars from this function:
let inv1 = 0;                  // Global var for Interval - callback checker function
let callback = 0;              // Global callback for ping check
//The function which gets exectuted after the user put in his username 
//What does this function do?
// 1. Dimm on an doff to the net windows
// 2. Call the ping function to check for server issues before redirecting to main dashboard
// 3. Add a loading screen while the code is fetching the first data
// 4. Call the checker() function in Interval - callback function to see if the ping was successfull

function btnfunc(){
    var username = validate(document.getElementById("inputt").value); //Get the username
    callback = 0;                           //reset the callback
    console.log(username);
    document.getElementById("login").style.opacity = 0;   // dimm off the login side
    document.getElementById("s1").src = "img/Spinner-2.gif";  // add a spinner to server check
    document.getElementById("s2").src = "img/Spinner-2.gif";  // add a spinner to API check
    
    //Add the loading bar anmation
    document.getElementById("loadingbar_2").style.animationName= "loading";  
    document.getElementById("loadingbar_2").style.backgroundColor= "greenyellow";  
    document.getElementById("loadingbar_2").style.animationIterationCount= "infinite";

    clearInterval(inv1); //reset the Interval for the callback function 

    setTimeout(()=>{     //Smooth dimm off and on from login to server check
        document.getElementById("ping").style.display= 'block';
        document.getElementById("ping").style.opacity = 100;
        document.getElementById("login").style.display = "none";
    }, 500);

    setTimeout(()=>{ping(username);},500);  //Call ping function after 500ms
    inv1 = setInterval(()=>{checker(username);}, 100);  //Call the callback function every 100ms
}
function checker(username){ //Callback function

    if(callback>=3){            //If every ping was successfull
        //Set the loadingbar to green 
        document.getElementById("loadingbar_2").style.animationName= "load2";
        document.getElementById("loadingbar_2").style.backgroundColor= "green";
        document.getElementById("loadingbar_2").style.animationIterationCount= 1;
        
        //Stop the callback function interval
        clearInterval(inv1);
        //Dimm on the dashboard
        document.getElementById("dashboard").style.display= "block";
        setTimeout(()=>{document.getElementById("ping").style.opacity = 0;}, 200);//Dimm off the server check page
        setTimeout(()=>{document.getElementById("ping").style.display= "none";document.getElementById("dashboard").style.opacity= 100;}, 1000);
        
        //After the dashboard is set create the canvas elements
        var chart = makegraph();
        var chart_net = makenetchart();
        var chart_hash = makehashratechart();
        var chart_con = makeconchart();
        dashboardloop(chart, username, chart_net, chart_hash, chart_con);
        setInterval(()=>{ //Call the dashboard loop function
            dashboardloop(chart, username, chart_net, chart_hash, chart_con);

        }, 3000);
        minerenergy();
        setInterval(()=>{minerenergy();}, 15000);

    }
    else{
        document.getElementById("loadingbar_3").style.display = "none";
        document.getElementById("loadingbar_2").style.display = "";
    }
}

function btnfuncskip(){
    callback =3;
}

// Global vars used by this function:
let tim01 = 0;              // for resetting the timeout when server responds
//The ping function
function ping(username){
    let socketcon=0; //Callback 
    let socket = new WebSocket("wss://server.duinocoin.com:15808", null, 5000, 5);
    socket.onmessage = function(event) {
        if(parseFloat(event.data) >= 2.4){
            document.getElementById("s1").src = "img/check.png";

            clearTimeout(tim01);
            callback++;
            socketcon++;
            socket.close();
            document.getElementById("console").innerHTML += "[Socket] Successfull ping to the Duco main server <br>";
                

            
        }
        else{

            document.getElementById("s1").src = "img/error.png";
            document.getElementById("console").innerHTML += "[Socket] The server returned an invalid version number<br>";
        }
    };
    socket.onerror = function(error) {
        document.getElementById("console").innerHTML += "[Socket] Server socket connection error";
        document.getElementById("s1").src = "img/error.png";
    };

    tim01 = setTimeout(()=>{
        if(socketcon==0){
            document.getElementById("s1").src = "img/error.png";
            document.getElementById("loadingbar_2").style.animationName= "load3";
            document.getElementById("loadingbar_2").style.backgroundColor= "red";
            document.getElementById("loadingbar_2").style.animationIterationCount= 1;
            document.getElementById("console").innerHTML += "[Socket] The server took to long to answer likely offline <br>";
                

        }
    }, 25000);

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == "4") {   //Check if the website is not loading anymore and webserver returns status code 200
            if(this.status == 200){
                document.getElementById("s2").src = "img/check.png";
                callback++;
                var balanc = undefined;
                balanc = xmlhttp.response;

                if(balanc == null){
                    document.getElementById("s2").src = "img/error.png";
                    document.getElementById("console").innerHTML += "[WebAPI] The response of the balances API is null <br>";
                    document.getElementById("console").innerHTML += "[WebAPI] There was an error downloading the API please try again.<br>";
                }
                
                if(balanc["result"]!= undefined){
                    if(balanc["result"]["username"] == username){
                        callback++;
                        document.getElementById("console").innerHTML += "[WebAPI] Username: ✅ <br>";
                        document.getElementById("usernamei").innerHTML = validate(balanc["result"]["username"]) + " balance";

                        //Start values for average daily calculation
                        start = Date.now();
                        balance = validate(balanc["result"]["balance"].toString());
                    }
                    else{
                        document.getElementById("s2").src = "img/error.png";
                        document.getElementById("console").innerHTML += "[WebAPI] The API responded a wrong username, please try again<br>";
                    }
                }
                else{
                    document.getElementById("loadingbar_2").style.animationName= "load3";
                    document.getElementById("loadingbar_2").style.backgroundColor= "red";
                    document.getElementById("loadingbar_2").style.animationIterationCount= 1;
                    document.getElementById("console").innerHTML += "[WebAPI] Username: 🚫 <br>";
                    document.getElementById("console").innerHTML += "[WebAPI] Your username was not found<br>";
                    
                   
                }
            }
            else{
              
                document.getElementById("console").innerHTML += "[WebAPI] The Server for balances.json returned an invalid status code: "+ this.status +" and loading status: " + this.readyState+"<br>";
                document.getElementById("s2").src = "img/error.png";
                document.getElementById("loadingbar_2").style.animationName= "load3";
                document.getElementById("loadingbar_2").style.backgroundColor= "red";
                document.getElementById("loadingbar_2").style.animationIterationCount= 1;
            }
        }
    };
    xmlhttp.open("GET", "https://server.duinocoin.com/balances/" + username, true);
    xmlhttp.responseType = 'json';
    xmlhttp.send();
}
function validate(input){
    var clean = input.replace(/[|&;$%@"<>()+,]/g, "");
    return clean;
}
