//Here are the most functions just for simple button and then CSS changes

function showhashrate(){
    var clicked = document.getElementById("tab4").className;
    if(clicked=="is-active"){
        document.getElementById("connection_chart_div").style.display="none";
        document.getElementById("hashrate_chart_div").style.display="block";
        
        document.getElementById("tab3").classList.toggle("is-active");
        document.getElementById("tab4").classList.toggle("is-active");
    }
}
function showconnections(){
    var clicked = document.getElementById("tab3").className;
    if(clicked=="is-active"){
        document.getElementById("connection_chart_div").style.display="block";
        document.getElementById("hashrate_chart_div").style.display="none";

        document.getElementById("tab3").classList.toggle("is-active");
        document.getElementById("tab4").classList.toggle("is-active");
    }
}

function showmy(){
    var clicked = document.getElementById("tab2").className;
    if(clicked=="is-active"){
        document.getElementById("myd").style.display="block";
        document.getElementById("dashboardd").style.display="none";
        document.getElementById("tab1").classList.toggle("is-active");
        document.getElementById("tab2").classList.toggle("is-active");
    }
}
function shownetwork(){
    var clicked = document.getElementById("tab1").className;
    if(clicked=="is-active"){
        document.getElementById("dashboardd").style.display="block";
        document.getElementById("myd").style.display="none";
        document.getElementById("tab2").classList.toggle("is-active");
        document.getElementById("tab1").classList.toggle("is-active");
    }
}
function closeminerdata(){
    
    document.getElementById("minerdata").style.opacity= 0;
    setTimeout(function(){
        document.getElementById("minerdata").style.display= "none";
    },1000);
    
}


function showdebug(){
    var console = document.getElementById("consoleu");
    if (console.style.display === "none") {
      console.style.display = "block";
    } else {
      console.style.display = "none";
    }
}
function btnfuncret(){
    document.getElementById("console").innerHTML = "[System] reload <br>";
    btnfunc();
}

function btnfuncback(){
    document.getElementById("console").innerHTML = "[System] Main menu <br>";
    document.getElementById("pingjs").style.opacity = 0;
    document.getElementById("pingjs").style.display= 'none';
    document.getElementById("dashboard").style.opacity = 0;
    document.getElementById("rewards").style.display = "block";

    setTimeout(function(){
        document.getElementById("login").style.display = "";
        document.getElementById("servercheck").style.display = "";


    }, 500);
    setTimeout(function(){
        document.getElementById("servercheck").style.opacity = 100;
        document.getElementById("login").style.opacity = 100;
        document.getElementById("rewards").style.opacity = 100;


    },  500);
}

function ducon(){
    var clicked = document.getElementById("tabn1").className;
    if(clicked=="is-active"){
        document.getElementById("external").style.display="block";
        document.getElementById("duconi").style.display="block";
        document.getElementById("dashni").style.display="none";
        document.getElementById("tabn2").classList.toggle("is-active");
        document.getElementById("tabn1").classList.toggle("is-active");
    }
}
function dashn(){
    var clicked = document.getElementById("tabn2").className;
    if(clicked=="is-active"){
        document.getElementById("external").style.display="none";
        document.getElementById("dashni").style.display="block";
        document.getElementById("duconi").style.display="none";
        document.getElementById("tabn2").classList.toggle("is-active");
        document.getElementById("tabn1").classList.toggle("is-active");
    }
}

function solutionclose(){
    document.getElementById("faucetpopup").style.display = "none"; //Get the username

}

function showexternal(){
    document.getElementById("external").style.display="none";
    document.getElementById("duconi").src="https://server.duinocoin.com/news.html";
}
