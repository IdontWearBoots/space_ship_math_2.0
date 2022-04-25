function pause(){
    clearInterval(intervalId);
    try {
      clearInterval(intervalId2);
    }catch(err){ }
    document.querySelector(".pause").style.display = "inline-block";
}
function closePause(){
    document.querySelector(".pause").style.display = "none"
    intervalId = setInterval(updateQues, time)
    try{
      intervalId2 = setInterval(checkForLose, time/2);
    }catch(err){}

    playSound = document.getElementById("wantAudio").checked
}
