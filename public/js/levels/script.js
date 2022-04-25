// constants eg: interval between updates, audio
let ans = document.getElementById("ans"), wrongAns = 0, correctAns = 0;
let num1 = 1, num2 = 1;
let play = false;


function restart(){
  // reset vars
  num1 = 1;
  num2 = 1;
  wrongAns = 0;
  correctAns = 0;

  // reset ques and score
  document.getElementById("ques").textContent = `${num1} x ${num2}`;
  document.getElementById("h1").textContent = "Current score: " + correctAns;
  document.querySelector(".emojis").textContent = ""

  // clear and restart intervals
  clearInterval(intervalId)
  clearInterval(intervalId2)
  intervalId = setInterval(updateQues, time);
  intervalId2 = setInterval(checkForLose, time/2);

  document.querySelector(".popup").style.display = "none";
}

function updateQues() {
  // evaluate the ans
  evaluate();

  // generate new nums
  num1 = Math.round(Math.random() * 12);
  num2 = Math.round(Math.random() * 12);
  document.getElementById("ques").textContent = `${num1} x ${num2}`;

  // reset input
  ans.value = " ";

  if (correctAns > 653) {
    let d = document.createElement("h1");
    d.textContent = "WOW.... You've.. You've won.... You are probably the best times tables conoissoir to ever live.";
    document.body.appendChild(d);
    clearInterval(intervalId);
  }

}

function checkForLose() {
  if (wrongAns >= 3) {
    clearInterval(intervalId);
    clearInterval(intervalId2);
    document.getElementById("h1").textContent = "Well unfortunatly you lost. But you did score "+correctAns+" points";
    //document.querySelector(".emojis")
  }
}


function evaluate() {
  if (ans.value === String(num1 * num2)) {
    // add the appropriate emoji for result 
    document.querySelector(".emojis").textContent += "✔️"

    // update the amount of correctAns
    correctAns += 1;
    // reset the answer input value
    ans.value = " ";

    // if the client wants audio to be played
    if(play)
      playSound(goodAudioArr);

    // at the end update the score
    document.getElementById("h1").textContent = "Current score: " + correctAns;

  } else {
    
    document.querySelector(".emojis").textContent += "❌"

    wrongAns += 1;

    ans.value = " ";

    if(play)
      playSound(badAudioArr);
  }
}

// oml this is such an easy solution
// now you can press enter to update 
/* basicallly : DOM.keydown === "enter" ? remove intervals 
      (to prevent double update if enter pressed same time as the update)
      updateQues 
      reset intervals
      checkForLose (so that you dont update before it realises you lost)
*/
document.addEventListener("keydown", function(event){
  if(event.key === "Enter"){
    clearInterval(intervalId)
    updateQues()
    intervalId = setInterval(updateQues, time)
    checkForLose()
  }
});

// time is already set in every file
var intervalId = setInterval(updateQues, time);
var intervalId2 = setInterval(checkForLose, time/2);


