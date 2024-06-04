const stripe = require('stripe')('sk_test_51PM6BADJUuO5kkChVsYljZ1eDXNm5BuioweEgSPugO34AEMSldDOXQmMZ8eaY2fvUHhIjuENpprg8XgeeMYi4vqe002OqVGwin')

module.exports.createCheckoutSession =async (req,res) => {
  const product = await stripe.products.create({
    name: 'Basic Prod',
    default_price_data: {
      unit_amount: 100000,
      currency: 'inr',
    },
    expand: ['default_price'],
  });
    console.log(product)
    const session = await stripe.checkout.sessions.create({
        ui_mode: 'embedded',
        line_items: [
          {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price: product.default_price.id,
            quantity: 1,
          },
        ],
        mode: 'payment',
        return_url: `http://localhost:4200/redirect/{CHECKOUT_SESSION_ID}`,        
      });
    
      console.log(session)
      res.send({clientSecret: session.client_secret});
}

module.exports.sessionStatus = async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
  console.log(session,"dsfs")
  res.send({
    status: session.status,
    customer_email: session.customer_details.email
  });
}


module.exports.createProduct = async ( name, amount ) => {
  const product = await stripe.products.create({
    name: name,
    default_price_data: {
      unit_amount: amount,
      currency: 'inr',
    },
    expand: ['default_price'],
  });
  return product;
}