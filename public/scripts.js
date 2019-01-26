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

  findCurrentProject(null, projectName)
    .then(project_id => {
      postSavedPalette(project_id, paletteName, hexCodes)
    });

  const palettes = fetchAllPalettes();
  if (palettes) {
    displayAllPalettes(palettes)
  }
  $('#new-palette-input').val("");
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

displayAllProjects = (projects) => {
  const displayedProjects = projects.map(project => {
    return `<div class="saved-palette">
      <p>${project.title}</p>
      <div class="small-palette-container" id=${project.id}>
      </div>
    </div>`
  })

  $('.saved-projects-section').html(displayedProjects)
}

displayAllPalettes = (palettes) => {
  palettes.forEach(palette => {
    $(`#${palette.project_id}`).append(
      `<div class="small-palette-wrapper" id=${palette.id}>
          <div class="small-color-block sm-block1" style="background-color:${palette.color_1}">${palette.color_1}</div>
          <div class="small-color-block sm-block2" style="background-color:${palette.color_2}">${palette.color_2}</div>
          <div class="small-color-block sm-block3" style="background-color:${palette.color_3}">${palette.color_3}</div>
          <div class="small-color-block sm-block4" style="background-color:${palette.color_4}">${palette.color_4}</div>
          <div class="small-color-block sm-block5" style="background-color:${palette.color_5}">${palette.color_5}</div>
          <p>${palette.title} <i class="fa fa-trash" aria-hidden="true"></i></p>
      </div>`
    )
  })


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
    .then(id => console.log(`sending project #: ${id.id}`))
    .catch(error => console.log(error.message))
}

findCurrentProject = async (event, projectName) => {
  let projects;
  try {
    const response = await fetch('/api/v1/projects')
    const data = await response.json()
    projects = data;
  } catch (error) {
    console.log(error.message)
  }

  await displayAllProjects(projects)
  if (projectName) {
    const currProject = await projects.find(project => project.title === projectName)
    return currProject.id
  }
}

postSavedPalette = (project_id, paletteName, hexCodes) => {
  fetch('/api/v1/palettes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(
      { color_1: hexCodes[0], color_2: hexCodes[1], color_3: hexCodes[2], color_4: hexCodes[3], color_5: hexCodes[4], project_id: project_id, title: paletteName })
  }).then(response => response.json())
    .then(id => console.log(`sending palette #: ${id.id}`))
    .catch(error => console.log(error.message))

}

fetchAllPalettes = async () => {
  let palettes;
  try {
    const response = await fetch('/api/v1/palettes')
    const data = await response.json()
    palettes = data;
  } catch (error) {
    console.log(error.message)
  }

  await displayAllPalettes(palettes)
  return palettes;
}


$(window).on('load', findCurrentProject);
$(window).on('load', fetchAllPalettes);