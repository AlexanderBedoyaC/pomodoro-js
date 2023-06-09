const d = document
const circularProgress = d.querySelector(".circular-progress")
const progressValue = d.querySelector(".progress-value");
const btnDetener = d.getElementById('btn-detener')
const btnIniciar = d.getElementById('btn-iniciar')
const audioBtn = d.getElementById('audio-button')
const audioAlarm = d.getElementById('audio-alarm')
const textMode = d.getElementById('mode')
let pomoTime = d.getElementById('pomo-time').value
let shortTime = d.getElementById('short-time').value
let longTime = d.getElementById('long-time').value
const btnSetSettings = d.getElementById('set-settings')
let paused = true
let mode = 'pomodoro'
let conteo = 0
let interval = null

function formatTime(time) {
  return ('0' + Math.floor(time / (1000 * 60))).slice(-2) + ':' + ('0' + Math.floor((time % (1000 * 60)) / (1000))).slice(-2)
}

d.addEventListener('DOMContentLoaded', ()=>{
  updateTimer(pomoTime)
  btnDetener.classList.add('disable')
})

function startTimer(timeInitial) {

  let time = timeInitial
  const interval = setInterval(() => {
    time = time - 1000;
    progressValue.textContent = formatTime(time)
    progressValue.data = time
    circularProgress.style.background = `conic-gradient(#FF8A80 ${((360*(timeInitial-time))/timeInitial)}deg, #bcbcbc 0deg)`

    if (time === 0) {
      audioAlarm.play()
      conteo++
      if(mode==='pomodoro'){
        if(conteo===5){
          mode='long'
          time = parseInt(longTime * 60 * 1000)
          timeInitial = time
          textMode.textContent = 'DESCANSO LARGO'
        } else {
          mode = 'short'
          time = parseInt(shortTime * 60 * 1000)
          timeInitial = time
          textMode.textContent = 'DESCANSO CORTO'
        }
      } else if(mode==='short'){
        mode='pomodoro'
        time = parseInt(pomoTime * 60 * 1000)
        timeInitial = time
        textMode.textContent = 'POMODORO'
      } else if(mode==='long'){
        mode='pomodoro'
        time = parseInt(pomoTime * 60 * 1000)
        timeInitial = time
        textMode.textContent = 'POMODORO'
        clearInterval(interval)
      } else {
        clearInterval(progress);
      }
    }
  }, 1000);
  return interval
}

function updateTimer(time) {
  progressValue.textContent = formatTime(time * 60 * 1000)
}

function stopTimer(interval) {
  clearInterval(interval)
  btnIniciar.classList.remove('disable')
  btnDetener.classList.add('disable')
  audioBtn.play()
}

btnDetener.addEventListener('click', () => {
  stopTimer(interval)
})

btnIniciar.addEventListener('click', () => {
  interval = startTimer(parseInt(pomoTime*60*1000))
  btnIniciar.classList.add('disable')
  btnDetener.classList.remove('disable')
  audioBtn.play()
})

btnSetSettings.addEventListener('click', () => {
  pomoTime = d.getElementById('pomo-time').value
  shortTime = d.getElementById('short-time').value
  longTime = d.getElementById('long-time').value
  modal.classList.remove('modal--show')
  updateTimer(pomoTime)
})

