const debug = require('debug')('api:routes');
const notesRoutes = require('./notesRoutes')
const paymentRoutes = require('./paymentRoutes')
const cartRoutes = require('./cart')

const initRoutes = (app) =>{
   debug('initializing Routes')
   app.use('/notes',notesRoutes);   
   // app.use('/documentary',documentaryRoutes)
   app.use('/payment',paymentRoutes)
   app.use('/cart',cartRoutes)

   debug('finished initializing Routes')
}

module.exports = initRoutes