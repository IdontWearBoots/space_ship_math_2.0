// constants eg: interval between updates, audio
const badAudioArr = [
  "../audio/aie.ogg", "../audio/wrong.ogg", "../audio/youveMadeAMistake.ogg"
]
const goodAudioArr = [
  "../audio/amazing.ogg", "../audio/bravoTruelySpectacular.ogg", "../audio/claping.ogg", "../audio/goodJob.ogg", "../audio/wellDone.ogg"
]

function playAudio(audioArr) {
  // simple random audio playing for correct
  let audio = document.getElementById("audio");
  let aud = Math.round(Math.random() * (audioArr.length - 1));
  audio.src = audioArr[aud];
  audio.play();
}
