function resetDOM() {
  document.body.innerHTML = `
    <h1>Lab: Event Listeners With JavaScript</h1>
    <button id="changeColorButton">Change Background Color</button>
    <button id="resetColorButton">Reset Background Color</button>
    <p id="keyPressDisplay">Press any key...</p>
    <form id="inputForm">
      <input type="text" id="textInput" placeholder="Type something...">
      <button type="submit">Submit Input</button>
    </form>
    <p id="textInputDisplay">Your input will be displayed here.</p>
    <p id="formSubmitDisplay" aria-live="polite"></p>
  `
}

module.exports = { resetDOM }