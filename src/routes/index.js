const debug = require('debug')('api:routes');
const notesRoutes = require('./notesRoutes')
const paymentRoutes = require('./paymentRoutes')
const initRoutes = (app) =>{
   debug('initializing Routes')

   app.use('/notes',notesRoutes);
   // app.use('/documentary',documentaryRoutes)
   app.use('/payment',paymentRoutes)

   debug('finished initializing Routes')
}

module.exports = initRoutes