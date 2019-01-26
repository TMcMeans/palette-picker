
exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.table('palettes', (table) => {
      table.string('title');
    })
  ])
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.table('palettes', (table) => {
      table.dropColumn('title');
    })
  ])
};
