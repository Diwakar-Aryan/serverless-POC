const Joi = require("joi");
const notesModel = require("../models/notesModel");
const { putPreSignedUrl, getPreSignedUrl } = require("../services/awsServices");
const { awsEnv } = require("../config/envConfig");
const { createProduct, deleteProduct } = require("./paymentController");
const { userRecordsModel } = require("../models/userModels");

module.exports.create = async (req, res) => {
  const { title, cost, language, topics, name } = req.body;
  let stripeProduct;
  // if successful, update stripe services
  try {
    stripeProduct = await createProduct(name, cost);
  } catch (error) {
    res.status(400).send({ error: error });
  }
  // Update mongoose db
  try {
    const notesDoc = new notesModel({
      title,
      cost,
      language,
      topics,
      name,
      stripeProductId: stripeProduct?.id,
      stripeDefaultPriceId: stripeProduct?.default_price?.id,
    });
    const doc = await notesDoc.save();

    res.status(200).json({ createdDoc: doc });
  } catch (error) {
    // delete the stripe products
    console.error(error);
  }
};

module.exports.getAll = async (req, res) => {
  try {
    const notes = await notesModel.find({});
  
    console.log(notes);
    res.status(200).json(notes);
    
  } catch (error) {
    res.status(400).json({error: true});
  }
};

module.exports.getLockedNotesByUser = async (req, res) => {
  try {
    const productIds = []
    const userRecord = await userRecordsModel.findOne({
      userId: req.user.userId,
      email: req.user.email,
    });
  
    for (const prods of userRecord.stripeProductIds) {
      productIds.push(String(prods));
    }
  
    const notes = await notesModel
      .find({ stripeProductId: { $in: productIds } })
      .lean();
  
    res.status(200).json(notes);
  } catch (error) {
    res.status(400).json({error: true});
  }
};

module.exports.getSignedUrl = async (req, res) => {
  try {
    const { type, name, action } = req.body;
    let url;
    if (action === "get") {
      url = await getPreSignedUrl(awsEnv.notesBucketName, `${type}/${name}`);
    } else if (action === "put") {
      url = await putPreSignedUrl(awsEnv.notesBucketName, `${type}/${name}`);
    }
    console.log(url);
    res.status(200).json({ url });
  } catch (error) {
    res.status(400).send(error);
  }
};
