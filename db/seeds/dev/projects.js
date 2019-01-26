exports.seed = function (knex, Promise) {
  // Delete palettes table first, then delete projects table
  return knex('palettes').del()
    .then(() => knex('projects').del())
    //Start seeding a clean slate 
    .then(() => {
      return Promise.all([
        knex('projects').insert({
          title: 'My project #1'
        }, 'id')
          .then(project => {
            return knex('palettes').insert([
              { title: 'warm colors', color_1: '#fd0fed', color_2: '#202995', color_3: '#04f5ef', color_4: '#93426c', color_5: '#1c1931', project_id: project[0] },
              { title: 'cool colors', color_1: '#36af50', color_2: '#aa0226', color_3: '#77957f', color_4: '#202995', color_5: '#bafb15', project_id: project[0] }
            ])
          })
          .then(() => console.log('Seeding complete!'))
          .catch(error => console.log(`Error seeding data: ${error}`))
      ])
    })
    .catch(error => console.log(`Error seeding data: ${error}`))
};
