let buttons = document.getElementsByClassName("buttons")[0].children;

Array.prototype.forEach.call(buttons, button => {
    button.addEventListener("mousedown",e =>{
        playSound(e.target.textContent.trim());
    });
});

function playSound(key,which = 1){
    document.getElementById(key+which).currentTime = 0;
    document.getElementById(key+which).play();
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