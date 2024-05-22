const debug = require('debug')('api:routes');
const notesRoutes = require('./notesRoutes')
const initRoutes = (app) =>{
   debug('initializing Routes')

   app.use('/notes',notesRoutes);
   // app.use('/documentary',documentaryRoutes)

   debug('finished initializing Routes')
}

module.exports = initRoutes