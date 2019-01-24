/* Event Listeners */

$('#save-project-form').on('submit', (e) => {
  e.preventDefault()
  const projectName = $('#project-name-input').val()
  //Create a POST request to send the project to the server database as a record 
  $('#project-name-input').val("")
  $('#project-select').append(`<option>${projectName}</option>`)
})

$('.fa').on('click', (e) => {
  if ($(e.target).hasClass('fa-unlock')) {
    $(e.target).removeClass('fa-unlock').addClass('fa-lock');
  } else if ($(e.target).hasClass('fa-lock')) {
    $(e.target).removeClass('fa-lock').addClass('fa-unlock');
  }
})

$('#generate-palette-btn').on('click', (e) => {
  e.preventDefault();

  generatePaletteColors()
})



/* Helper methods */

const getRandomHexCode = () => {
  let hexCode = '#';
  const hexValues = ['a', 'b', 'c', 'd', 'e', 'f', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

  for (var i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * hexValues.length)

    hexCode += hexValues[randomIndex]
  }

  return hexCode;
}

const generatePaletteColors = () => {
  const colorBlocks = ['.block1', '.block2', '.block3', '.block4', '.block5']

  colorBlocks.forEach(block => {
    if ($(`${block} > i`).hasClass('fa-unlock')) {
      const hexCode = getRandomHexCode()
      $(block).css('background-color', `${hexCode}`)
      $(`${block} > p`).text(`${hexCode}`)
    }
  })
}
