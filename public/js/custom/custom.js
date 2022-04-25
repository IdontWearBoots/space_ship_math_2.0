// number of allowed strikes
const nStrikes = Number($("#strikes").text());
// ans given, num wrong ans / correct ans
let ans = $("#ans")[0], wrongAns = 0, correctAns = 0;
// max num up until times tables will generate and the mode (0 => infinite, 1 => strikes)
const max = Number($("#max").text()), mode = Number($("#mode").text());
// other inits
let num1 = 1, num2 = 1;
let playSound = false;

let intervalId = setInterval(updateQues, $("#seconds").text() * 1000);
if(mode)
  var intervalId2 = setInterval(checkForLose, $("#seconds").text() * 500);

function updateQues() {
  // evaluate the ans
  evaluate();

  // generate new nums
  num1 = Math.round(Math.random() * max);
  num2 = Math.round(Math.random() * max);
  $("#ques").text(`${num1} x ${num2}`);

  // reset input
  ans.value = " ";
}

function evaluate() {
  if (ans.value == num1 * num2) {
    // reset the answer input value
    ans.value = " ";

    // if the client wants audio to be played
    if (playSound)
      playAudio(goodAudioArr);

    // update the score
    correctAns++;
    $("#correct").text(`Correct answers : ${correctAns}`);
    $("#emojis").text($("#emojis").text() + "✔️");

  } else {
    // update wrong ans
    wrongAns++;
    $("#wrong").text(`Wrong answers : ${wrongAns}`);
    $("#emojis").text($("#emojis").text() + "❌");

    ans.value = " ";

    if (playSound)
      playAudio(badAudioArr);
  }
}

function checkForLose() {
  if(wrongAns >= nStrikes) {
    clearInterval(intervalId);
    // we are sure it exists so no need to try/cactch exception
    clearInterval(intervalId2);
    
    $("#score").text(`
      Unfortunatly you lost, 
      ${
        correctAns ?
        `but you did score ${correctAns} points!` :
        `and you didn't even get to score a point!`
      }
    `); 
  }
}

function restart() {

  clearInterval(intervalId)
  try {
    clearInterval(intervalId2)
  } catch (err) {
    console.error(err);
  }

  num1 = 1;
  num2 = 1;
  playSound = $("#wantAudio")[0].value;
  wrongAns = 0;
  correctAns = 0;

  // reset ques and score
  $("#ques").text(`${num1} x ${num2}`);
  $("#correct").text(`Current score: ${correctAns}`);
  $("#wrong").text(`Wrong answers : ${wrongAns}`);
  $("#emojis").text("")
  $("#loseMess").text("")

  $(".start").css("display", "inline-block");
  closePause()
}

$(document).keydown(event => {
  if(event.key === "Enter"){
    clearInterval(intervalId);
    updateQues();
    intervalId = setInterval(updateQues, $("#seconds").text() * 1000);
    if(mode)
      checkForLose();
  }
});