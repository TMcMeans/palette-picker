/* event listeners */
$('#save-project-form').on('submit', (e) => {
  e.preventDefault();
  const newProject = $('#project-name-input').val();

  //Create a POST request to send the project to the server database as a record 
  postNewProject();

  $('#project-name-input').val("");
  $('#project-select').append(`<option>${newProject}</option>`);
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

  generatePaletteColors();
})

$('#new-palette-form').on('submit', (e) => {
  e.preventDefault();

  const projectName = $('#project-select option:selected').text()
  const paletteName = $('#new-palette-input').val();
  const colorCodes = grabColorPalette();

  //CALL HELPER METHOD TO GRAB ALL 5 HEX CODE VALUES FROM PALETTE TO BE SENT TO DATABASE

  //Make a POST request to send the palette name and foreign key (connecting to project name) to database

  //Make a GET request to pull all of the palettes and projects and post them to DOM
})


/* helper methods */
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

const grabColorPalette = () => {
  // GRAB ALL 5 HEX CODE VALUES FROM PALETTE TO BE SENT TO DATABASE
  //Figure out how to do a querySelectorAll to grab the innerText of each p tag in the color divs
  const palette = [];
}


/* fetch call methods */

postNewProject = (url, data) => {

  fetch(url, {
    method: 'POST',
    body: data,
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(response => response.json())
    .then(id => console.log(id))
    .catch(error => console.log(error.message))

}


