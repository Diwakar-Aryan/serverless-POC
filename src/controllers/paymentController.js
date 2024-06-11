const stripe = require('stripe')('sk_test_51PM6BADJUuO5kkChVsYljZ1eDXNm5BuioweEgSPugO34AEMSldDOXQmMZ8eaY2fvUHhIjuENpprg8XgeeMYi4vqe002OqVGwin')

module.exports.createCheckoutSession =async (req,res) => {
    const {priceId, quantity} = req.body;
    const session = await stripe.checkout.sessions.create({
        ui_mode: 'embedded',
        line_items: [
          {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price: priceId,
            quantity: quantity,
          },
        ],
        mode: 'payment',
        return_url: `http://localhost:4200/redirect/{CHECKOUT_SESSION_ID}`,        
      });
    
      res.send({clientSecret: session.client_secret});
}

module.exports.sessionStatus = async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(req.query.session_id);

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

module.exports.deleteProduct = async (productId) => {
  const product  = await stripe.products.del(productId);
  return product
}