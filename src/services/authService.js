const { auth } = require('express-oauth2-jwt-bearer');
const { Mongoose } = require('mongoose');

var axios = require("axios").default;
async function getToken() {

    var options = {
      method: 'POST',
      url: 'https://dev-pluymneemvu6poxu.us.auth0.com/authorize',
      headers: {'content-type': 'application/x-www-form-urlencoded'},
      data: new URLSearchParams({
        // grant_type: 'client_credentials',
        client_id: 'yv9MGoCNXrgtQwEFyWuNECWcdOLMv2Hp',
        // client_secret: 'adv_U4wfWOiqMgZFKuZ6O7dgsAxhdmvRUyZQeROp1WtFC60orKTqFxHy9wuYzeN8',
        // audience: 'https://dev-pluymneemvu6poxu.us.auth0.com/api/v2/'
        scope: 'openid profile email app_metadata',
        response_mode: 'form_post',
        response_type: 'id_token'
      })
    };
    const url = `
    https://dev-pluymneemvu6poxu.us.auth0.com/authorize?response_type=id_token%20token&response_mode=form_post&client_id=yv9MGoCNXrgtQwEFyWuNECWcdOLMv2Hp&redirect_uri=http://localhost:4200/dashboard&scope=openid%20name%20picture&nonce=NONCE`
    try {
        const data = await axios.get(url)
        console.log(data)
    } catch (error) {
        console.error(error)
    }
}
module.exports.checkJwt = auth({
    audience: 'yv9MGoCNXrgtQwEFyWuNECWcdOLMv2Hp',
    issuerBaseURL: `dev-pluymneemvu6poxu.us.auth0.com`,
  });

module.exports.authenticate = async (req,res,next) =>{
    const authToken = req.headers.authorization
    if(!authToken) {
        console.error(`Invalid Token`, 401)
        res.status(401).send(`Invalid Token`)
    }
    try {
    await getToken()
    req.user ={userId: '551137c2f9e1fac808a5f572'}
} catch (error) {
    console.log(error)
}

    next()
}