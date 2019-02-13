let buttons = document.getElementsByClassName("buttons")[0].children;

Array.prototype.forEach.call(buttons, button => {
    button.addEventListener("mousedown",e =>{
        playSound(e.target.textContent.trim());
    });
});

function playSound(key,which = 0){
    if(key == undefined) return;
    document.getElementById(key+which).currentTime = 0;
    document.getElementById(key+which).play();
    for(let i = 0; i < isRecoding.length; i++){
        if(isRecoding[i]){
            recordedSounds[i].push(key);
            recordedTimes[i].push(Date.now() - currentTime[i]);
        }
    }
}

window.addEventListener("keypress",function(e){
    switch(e.key){
        case "q":
        case "w":
        case "e":
        case "a":
        case "s":
        case "d":
        pressKey(e.key);
        break;
    }
});

function pressKey(key){
    playSound(key);
    document.getElementById(key).classList.add("hover");
    setTimeout(e=>{document.getElementById(key).classList.remove("hover");},400)
}

let recordings = document.getElementsByClassName("recording");
for(let i = 0; i < recordings.length;i++){
    recordings[i].children[0].addEventListener("mousedown",function(e){
        recordStop(i);
    });
    recordings[i].children[1].addEventListener("mousedown",function(e){
        playRecording(i);
    });
    recordings[i].children[2].addEventListener("mousedown",function(e){
        select(i);
    });
}

let isRecoding = [false,false,false,false];
let isSelected = [false,false,false,false];
let currentTime = [0,0,0,0];
let recordedTimes = [[],[],[],[]];
let recordedSounds = [[],[],[],[]];

//start/stop recording
function recordStop(which){
    if(isRecoding[which]){
        document.getElementsByClassName("record")[which].innerHTML = "record";
    }else{
        currentTime[which] = Date.now();
        recordedTimes[which] = [];
        recordedSounds[which] = [];
        document.getElementsByClassName("record")[which].innerHTML = "stop";
    }
    isRecoding[which] = !isRecoding[which];
}

//play one recording
function playRecording(which){
    for(let i = 0; i < recordedTimes.length; i++){
        setTimeout(e=>{playSound(recordedSounds[which][i],which)},recordedTimes[which][i]);
    }
}

function select(which){
    document.getElementsByClassName("select")[which].classList.toggle("selected");
    isSelected[which] = !isSelected[which];
}

document.getElementById("playSelected").addEventListener("mousedown",e=>{
    for(let i = 0; i < isRecoding.length; i++){
        if(isSelected[i])
            playRecording(i);
    }
});
document.getElementById("playAll").addEventListener("mousedown",e=>{
    for(let i = 0; i < isRecoding.length; i++){
        playRecording(i);
    }
});