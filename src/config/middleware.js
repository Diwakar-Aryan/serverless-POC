const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet')
const cors = require('cors')
const logger = require('morgan')
const debug = require('debug')('middleware')

const initMiddleware = (app) => {
   debug('Initializing Middlewares ...');

   app.use(bodyParser.json())
   app.use(bodyParser.urlencoded({ extended: false }))
   app.use(cookieParser())
   app.use(helmet())
   app.use(cors())
   app.use(logger('dev'))
   app.disable('x-powered-by');

   debug('Finished initializing middlewares...');

}
module.exports = initMiddleware;