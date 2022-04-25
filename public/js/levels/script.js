// constants eg: interval between updates, audio
let ans = $("#ans")[0], wrongAns = 0, correctAns = 0;
let num1 = 1, num2 = 1;
let playSound = false;

function restart(){
  // reset vars
  num1 = 1;
  num2 = 1;
  wrongAns = 0;
  correctAns = 0;

  // reset ques and score
  $("#ques").text(`${num1} x ${num2}`);
  $("#score").text(`Current score: ${correctAns}`);
  $("#emojis").text("")

  // clear and restart intervals
  clearInterval(intervalId)
  clearInterval(intervalId2)
  intervalId = setInterval(updateQues, time);
  intervalId2 = setInterval(checkForLose, time/2);

  $(".popup").css("display", "none");
}

function updateQues() {
  // evaluate the ans
  evaluate();

  // generate new nums
  num1 = Math.round(Math.random() * 12);
  num2 = Math.round(Math.random() * 12);
  $("#ques").text(`${num1} x ${num2}`);

  // reset input
  ans.value = " ";

  if (correctAns > 653) {
    $("#emojis").text(`
      WOW.... You've.. You've won.... You are probably the best times tables conoissoir to ever live.
    `);
    clearInterval(intervalId);
  }

}

function checkForLose() {
  if (wrongAns >= 3) {
    clearInterval(intervalId);
    clearInterval(intervalId2);
    $("#score").text(`Well unfortunatly you lost. But you did score ${correctAns} points`);
  }
}


function evaluate() {
  if (ans.value == num1 * num2) {
    // add the appropriate emoji for result 
    $("#emojis").text($("#emojis").text() + "✔️");

    // update the amount of correctAns
    correctAns++;
    // reset the answer input value
    ans.value = " ";

    // if the client wants audio to be played
    if(playSound)
      playSound(goodAudioArr);

    // at the end update the score
    $("#score").text(`Current score: ${correctAns}`);

  } else {
    
    $("#emojis").text($("#emojis").text() + "❌");

    wrongAns++;

    ans.value = " ";

    if(playSound)
      playSound(badAudioArr);
  }
}

// oml this is such an easy solution
// so you can press enter to update 
$(document).keydown(event => {
  if(event.key === "Enter"){
    clearInterval(intervalId)
    updateQues()
    intervalId = setInterval(updateQues, time)
    checkForLose()
  }
});

// time is already set
let intervalId = setInterval(updateQues, time);
let intervalId2 = setInterval(checkForLose, time/2);