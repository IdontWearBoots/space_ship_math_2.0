let ans = document.getElementById("ans"), wrongAns = 0, correctAns = 0;
let num1 = 1, num2 = 1;
let playSound = false;

function updateQues() {
  // evaluate the ans
  evaluate();

  // generate new nums
  num1 = Math.round(Math.random() * max);
  num2 = Math.round(Math.random() * max);
  document.getElementById("ques").textContent = `${num1} x ${num2}`;

  // reset input
  ans.value = " ";
}

function evaluate() {
  if (ans.value === String(num1 * num2)) {
    // reset the answer input value
    ans.value = " ";

    // if the client wants audio to be played
    if(playSound)
      playAudio(goodAudioArr);

    // update the score
    correctAns += 1;
    document.getElementById("correct").textContent = "Correct answers : " + correctAns;
    document.querySelector(".emojis").textContent += "✔️"

  } else {
    // update wrong ans
    wrongAns += 1;
    document.getElementById("wrong").textContent = "Wrong answers : " + wrongAns;
    document.querySelector(".emojis").textContent += "❌"

    ans.value = " ";

    if(playSound)
      playAudio(badAudioArr);
  }
}
function restart(){

  clearInterval(intervalId)
  try {
    clearInterval(intervalId2)
  }catch(err){ 
    console.error(err);
  }

  num1 = 1;
  num2 = 1;
  max = 0;
  audio = false;
  strikes = 1;
  wrongAns = 0;
  correctAns = 0;

  // reset ques and score
  document.getElementById("ques").textContent = `${num1} x ${num2}`;
  document.getElementById("correct").textContent = `Current score: ${correctAns}`;
  document.getElementById("wrong").textContent = `Wrong answers : ${wrongAns}`;
  document.querySelector(".emojis").textContent = ""
  document.getElementById("loseMess").textContent = ""

  document.querySelector(".start").style.display = "inline-block"
  closePause()
}
