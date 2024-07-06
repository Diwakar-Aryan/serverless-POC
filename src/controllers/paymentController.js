const stripe = require("stripe")(
  "sk_test_51PM6BADJUuO5kkChVsYljZ1eDXNm5BuioweEgSPugO34AEMSldDOXQmMZ8eaY2fvUHhIjuENpprg8XgeeMYi4vqe002OqVGwin"
);
const { paymentHistoryModel } = require("../models/paymentModel");
const { userRecordsModel } = require("../models/userModels");


module.exports.createCheckoutSession = async (req, res) => {
  const cart = req.body?.cart || {};
  const line_items = [];
  for (let item of cart) {
    line_items.push({ price: item.priceId, quantity: 1 });
  }

  const session = await stripe.checkout.sessions.create({
    ui_mode: "embedded",
    customer_creation: 'always',
    line_items,
    mode: "payment",
    return_url: `http://localhost:4200/payment/redirect/{CHECKOUT_SESSION_ID}`,
  });

  const newPayment = await new paymentHistoryModel({
    userId: req?.user?.userId,
    email: req?.user?.email,
    cartItems: cart,
    paymentStatus: session.status,
    sessionId: session.id,
  });
  newPayment.save();

  res.send({ clientSecret: session.client_secret });
};

module.exports.sessionStatus = async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(
      req.query.session_id
    );
    //update paymentHistory based on session status
    await paymentHistoryModel.findOneAndUpdate(
      { sessionId: session?.id },
      { paymentStatus: session.status }
    );

    res.status(200).json({
      status: session.status,
      customer_email: session.customer_details.email,
    });
  } catch (error) {
    res.status(400).send({
      error: true,
    });
  }
  try {
    
    //get info for products and update user Records
    const lineItems = await stripe.checkout.sessions.listLineItems(
      req.query.session_id
    );
    
    const newProductIds = lineItems.data.map((prod) => {
      return prod.price.product;
    });
  
    await userRecordsModel.findOneAndUpdate(
      { userId: req?.user?.userId, email: req?.user?.email },
      { $addToSet: { stripeProductIds: newProductIds } },
      { new: true, upsert: true }
    );
  } catch (error) {

    console.error('Error in updating userRecordsModel ', error)
    
  }
  
};

module.exports.createProduct = async (name, amount) => {
  const product = await stripe.products.create({
    name: name,
    default_price_data: {
      unit_amount: amount,
      currency: "inr",
    },
    expand: ["default_price"],
  });
  return product;
};

module.exports.deleteProduct = async (productId) => {
  const product = await stripe.products.del(productId);
  return product;
};

module.exports.getHistory = async (req, res) => {

  try {
    const userId = req?.user?.userId;
    const cursor = await paymentHistoryModel.find({userId,paymentStatus: "complete"}).lean()

    res.status(200).json({data: cursor})

  } catch (error) {
    res.status(400).send({error: true })
  }

}
