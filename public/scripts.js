/* Event Listeners */

$('#save-project-form').on('submit', (e) => {
  e.preventDefault()
  const projectName = $('#project-name-input').val()
  //Create a POST request to send the project to the server database as a record 
  $('#project-name-input').val("")
})

$('.fa').on('click', (e) => {
  if ($(e.target).hasClass('fa-unlock')) {
    $(e.target).removeClass('fa-unlock').addClass('fa-lock');
  } else if ($(e.target).hasClass('fa-lock')) {
    $(e.target).removeClass('fa-lock').addClass('fa-unlock');
  }
})

//create an event listener on the generate new palette button that on click will go through each of the big-color-block divs:
//check if big-color-block div i child has a class of 'fa-unlock' 
//if it has a i child with a class of 'fa-unlock' then call a function that will generate a random hex code and set that div's background color to the random hex code


$('#generate-palette-btn').on('click', (e) => {
  console.log(e.target)
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

const generatePaletteColors = (hexCode) => {
  const colorBlocks = ['.block1', '.block2', '.block3', '.block4', '.block5']

  colorBlocks.forEach(block => {
    if ($(`${block} > i`).hasClass('fa-unlock')) {
      const hexCode = getRandomHexCode()
      //change the background color of the block
      //change the innerText of the child p tag to the hexCode
    }
  })
}