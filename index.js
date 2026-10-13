


function changeBackgroundColor() {
  const red = Math.floor(Math.random() * 256)
  const green = Math.floor(Math.random() * 256)
  const blue = Math.floor(Math.random() * 256)
  document.body.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`
}


function resetBackgroundColor() {
  document.body.style.backgroundColor = 'lightgray'
}


function displayKeyPress(event) {
  document.getElementById('keyPressDisplay').textContent = `Key pressed: ${event.key}`
}

function displayUserInput() {
  const userInput = document.getElementById('textInput').value
  document.getElementById('textInputDisplay').textContent = `You typed: ${userInput}`
}

function processFormSubmission(event) {
  event.preventDefault()
  const userInput = document.getElementById('textInput').value
  document.getElementById('formSubmitDisplay').textContent = `Submitted: ${userInput}`
}


function setupEventListeners() {
  const changeColorButton = document.getElementById('changeColorButton')
  const resetColorButton = document.getElementById('resetColorButton')

  changeColorButton.addEventListener('click', changeBackgroundColor)
  changeColorButton.addEventListener('mouseover', () => {
    changeColorButton.style.backgroundColor = 'orange'
  })
  changeColorButton.addEventListener('mouseout', () => {
    changeColorButton.style.backgroundColor = ''
  })
  resetColorButton.addEventListener('dblclick', resetBackgroundColor)

  document.addEventListener('keydown', displayKeyPress)
  document.getElementById('textInput').addEventListener('input', displayUserInput)
  document.getElementById('inputForm').addEventListener('submit', processFormSubmission)
}


if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', setupEventListeners)
}

module.exports = {
  changeBackgroundColor,
  resetBackgroundColor,
  displayKeyPress,
  displayUserInput,
  processFormSubmission,
  setupEventListeners,
}