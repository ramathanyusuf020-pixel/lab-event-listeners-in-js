const { TextEncoder, TextDecoder } = require('util')

global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder

const { resetDOM } = require('./helpers')
const {
  changeBackgroundColor,
  resetBackgroundColor,
  displayKeyPress,
  displayUserInput,
  setupEventListeners,
} = require('../index.js')

describe('Event Handling Tests', () => {
  beforeEach(() => {
    resetDOM() // Reset the DOM structure
    setupEventListeners() // Attach event listeners
  })

  test('changeBackgroundColor generates a valid color', () => {
    changeBackgroundColor()
    const currentColor = document.body.style.backgroundColor
    expect(currentColor).toMatch(/^rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)$/) // Validate rgb() format
  })

  test('resetBackgroundColor sets the body background color to white', () => {
    document.body.style.backgroundColor = 'rgb(18, 52, 86)'
    resetBackgroundColor()
    expect(document.body.style.backgroundColor).toBe('white')
  })

  test('changeBackgroundColor changes the body background color via button click', () => {
    const changeColorButton = document.getElementById('changeColorButton')
    expect(changeColorButton).not.toBeNull()

    changeColorButton.click()
    const currentColor = document.body.style.backgroundColor
    expect(currentColor).toMatch(/^rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)$/) // Validate rgb() format
  })

  test('resetBackgroundColor resets the body background color via double-click', () => {
    const resetColorButton = document.getElementById('resetColorButton')
    expect(resetColorButton).not.toBeNull()

    document.body.style.backgroundColor = 'rgb(18, 52, 86)'
    resetColorButton.dispatchEvent(new Event('dblclick'))
    expect(document.body.style.backgroundColor).toBe('white')
  })

  test('displayKeyPress updates the key press display directly', () => {
    const mockEvent = new KeyboardEvent('keydown', { key: 'B' })
    displayKeyPress(mockEvent)
    const keyPressDisplay = document.getElementById('keyPressDisplay')
    expect(keyPressDisplay).not.toBeNull()
    expect(keyPressDisplay.textContent).toBe('Key pressed: B')
  })

  test('displayUserInput updates the input display directly', () => {
    const textInput = document.getElementById('textInput')
    const textInputDisplay = document.getElementById('textInputDisplay')

    textInput.value = 'Test Input'
    displayUserInput()
    expect(textInputDisplay).not.toBeNull()
    expect(textInputDisplay.textContent).toBe('You typed: Test Input')
  })

  test('displayKeyPress updates the key press display via keydown event', () => {
    const mockEvent = new KeyboardEvent('keydown', { key: 'A' })
    document.dispatchEvent(mockEvent)
    const keyPressDisplay = document.getElementById('keyPressDisplay')
    expect(keyPressDisplay).not.toBeNull() // Ensure the div exists
    expect(keyPressDisplay.textContent).toBe('Key pressed: A')
  })

  test('displayUserInput updates the input display in real-time via input event', () => {
    const textInput = document.getElementById('textInput')
    const textInputDisplay = document.getElementById('textInputDisplay')

    textInput.value = 'Hello'
    textInput.dispatchEvent(new Event('input'))
    expect(textInputDisplay).not.toBeNull() // Ensure the div exists
    expect(textInputDisplay.textContent).toBe('You typed: Hello')
  })

  test('change color button highlights on hover and restores on mouseout', () => {
    const changeColorButton = document.getElementById('changeColorButton')
    changeColorButton.dispatchEvent(new Event('mouseover'))
    expect(changeColorButton.style.backgroundColor).toBe('yellow')

    changeColorButton.dispatchEvent(new Event('mouseout'))
    expect(changeColorButton.style.backgroundColor).toBe('')
  })

  test('form submission displays the input without reloading the page', () => {
    const textInput = document.getElementById('textInput')
    const inputForm = document.getElementById('inputForm')
    const submitEvent = new Event('submit', { cancelable: true })
    textInput.value = 'Submitted input'

    inputForm.dispatchEvent(submitEvent)

    expect(submitEvent.defaultPrevented).toBe(true)
    expect(document.getElementById('formSubmitDisplay').textContent).toBe('Submitted: Submitted input')
  })
})
