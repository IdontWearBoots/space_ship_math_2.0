let totalTime = 0, averageTime = 0, currentTime = 0, time = 0;
let quesAnswered = 0;
let num1 = 1, num2 = 1;
let correct = 0, wrong = 0, ratio = 0;

function updateQues(){

  if($("#ans").val() === String(num1*num2)){
    correct++;
  }else{
    wrong++;
  }

  $("#ans").val(" ")
  num1 = Math.round(Math.random()*12)
  num2 = Math.round(Math.random()*12)

  $("#ques").html(`${num1} x ${num2}`)
}

function stats(){
  ratio = wrong ? correct/wrong : correct;
  ratio = Math.round(ratio*1000)
  ratio /= 1000;

  quesAnswered++;

  currentTime = Date.now() - time;
  time = Date.now();
  totalTime += currentTime;
  averageTime = totalTime/quesAnswered;
  averageTime = Math.round(averageTime);
  averageTime /= 1000;

  if($("#showStats").is(":checked")){
    $("#time").html(`Average time to answer : ${averageTime}s`)
    $("#ratio").html(`Correct to wrong ratio : <span class="green">${correct}</span> / <span class="red">${wrong}</span> = ${ratio}`)
  }
}

// countdown
function countDown(){
  let num = 3;

  const interval = setInterval(()=>{

	  $(".countdown").html(num)

    --num;
    if(num < 0){

      $(".countdown").html("")
      $(".countdown").hide()

      time = Date.now()
      clearInterval(interval)

      $(document).keypress("keydown", function(event){
        if(event.key === "Enter"){
          updateQues()
          stats()
        }
      })
    }
  }, 1000)
}
countDown()

function restart(){

  totalTime = 0;
  averageTime = 0;
  currentTime = 0;
  time = 0;

  quesAnswered = 0;

  num1 = 1;
  num2 = 1;

  correct = 0;
  wrong = 0;
  ratio = 0;

  $(document).unbind("keypress");

  $("#time").html("")
  $("#ratio").html("")

  $("#ques").html(`${num1} x ${num2}`)

  $(".countdown").html("Ready ?")
  $(".countdown").show()
  countDown()
}
