/* event listeners */
$('#save-project-form').on('submit', (e) => {
  e.preventDefault();
  const newProject = $('#project-name-input').val();

  postNewProject('/api/v1/projects', newProject);

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
  const hexCodes = grabColorPalette();



  const savedProjects = getAllProjects('/api/v1/projects')
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
  let palette = []
  $(".hex-code").each(function () {
    const hexCode = $(this).html()
    palette.push(hexCode)
  });

  return palette;
}


/* fetch call methods */
postNewProject = (url, data) => {
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title: data })
  }).then(response => response.json())
    .then(id => console.log(id))
    .catch(error => console.log(error.message))
}

getAllProjects = async (url) => {
  try {
    const response = await fetch(url)
    const data = await response.json()
    return data;
  } catch (error) {
    console.log(error.message)
  }
}

