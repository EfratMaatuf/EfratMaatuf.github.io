var minutes;
var seconds;
var interval="undefined";
var flagPause=false;
var spanMin=document.querySelector("#spanMin");
var spanSec=document.querySelector("#spanSec");

var buttonStart=document.querySelector("#buttonStart");
buttonStart.addEventListener("click",funcStart);

var buttonPause=document.querySelector("#buttonPause");
buttonPause.addEventListener("click",funcPause);

var buttonStop=document.querySelector("#buttonStop");
buttonStop.addEventListener("click",funcStop);

function funcStart() {
    console.log("start");
    if(!flagPause){
        if(checkInput()){
            minutes=+document.querySelector("#inputMinutes").value;
            seconds=+document.querySelector("#inputSeconds").value;
            document.querySelector("#inputMinutes").disabled=true;
            document.querySelector("#inputSeconds").disabled=true;
            display(spanMin,minutes);
            display(spanSec,seconds);
            interval=setInterval(countDown,1000);
        }
        else{
            funcStop();
        }
    }
    else{
        interval=setInterval(countDown,1000);
        flagPause=false;
    }
}
function funcPause() {
    if(interval !== "undefined")
    {
        clearInterval(interval);
        flagPause=true;
    }
}
function funcStop() {
    clearInterval(interval);
    interval="undefined";
    display(spanMin,0);
    display(spanSec,0);
    document.querySelector("#inputMinutes").disabled=false;
    document.querySelector("#inputSeconds").disabled=false;
    document.querySelector("progress").value=100;
    flagPause=false;
}
function countDown() {
    seconds--;
    if(seconds != -1){
        display(spanSec,seconds);
    }else{
        if(minutes != 0){
            minutes--;
            display(spanMin,minutes);
            seconds=59;
            display(spanSec,seconds);
        }else{
            clearInterval(interval);
            end();
        }
    }    
}
function display(span,num) {
    if(num>9){
        span.innerText=num;
    }else{
        span.innerText="0"+num;
    }
    var min=+document.querySelector("#inputMinutes").value;
    var sec=+document.querySelector("#inputSeconds").value;
    document.querySelector("progress").value=((minutes*60+seconds)/(min*60+sec))*100;
}
function checkInput() {
    var min=+document.querySelector("#inputMinutes").value;
    var sec=+document.querySelector("#inputSeconds").value;
    if(sec<0 || sec>59){
        document.querySelector("#error").innerText="The number in seconds is not correct";
        document.querySelector("#error").style.display="block";
        return false;
    }
    if(min<0) {  //  || min> ??
        document.querySelector("#error").innerText="The number in minutes is not correct";
        document.querySelector("#error").style.display="block";
        return false;
    }
    if(!sec && !min)
    {
        document.querySelector("#error").innerText="Please enter data";
        document.querySelector("#error").style.display="block";
        return false;
    }
    document.querySelector("#error").style.display="none";
    return true;
}

async function end() {
    var allElements=document.querySelectorAll("body>*");
    for (var i = 0; i < allElements.length ; i++) {
        allElements[i].style.display="none"; 
    }  
    document.querySelector(".loading").style.display="inline-block";
    var res = await fetch("https://www.boredapi.com/api/activity/");
    var json = await res.json(); 
    document.querySelector("#end").style.display="flex";    
    document.querySelector("#activity").innerText=json.activity;
    document.querySelector("#participants").innerText=json.participants;
    document.querySelector("#type").innerText=json.type;
    document.querySelector(".lds-ripple").style.display="none";
}