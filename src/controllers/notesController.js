const Joi = require("joi");
const notesModel = require("../models/notesModel");
const { putPreSignedUrl, getPreSignedUrl } = require("../services/awsServices");
const { awsEnv } = require("../config/envConfig");
const { createProduct } = require("./paymentController");

module.exports.create = async (req, res) => {
  const { title, cost, coverLocation, language, topics, pdfLocation, name } =
    req.body;
  const check = {
    language: Joi.string().required().min(4).max(256),
    topics: Joi.array(),
    name: Joi.string().required().min(4).max(256),
    coverLocation: Joi.string().required().min(4).max(256),
    pdfLocation: Joi.string().required().min(4).max(256),
    title: Joi.string().required().min(4).max(256),
    cost: Joi.number().required().greater(0),
  };
  const { error } = Joi.valid(
    { title, cost, coverLocation, language, topics, pdfLocation, name },
    check
  );
  if (error) {
    res.status(400).send(error);
  }
  // if successful, update stripe services
  try {
    createProduct(name, cost);
  } catch (error) {
    res.status(400).send({ error: error });
  }
  // Update mongoose db
  try {
    const notesDoc = new notesModel({
      title,
      cost,
      coverLocation,
      language,
      topics,
      pdfLocation,
      name,
    });
    const doc = await notesDoc.save();

    res.status(200).json({ createdDoc: doc });
  } catch (error) {
    // delete the stripe products
  }
};

module.exports.getAll = async (req, res) => {
  console.log("Per", notesModel);
  res.status(200).json(notesModel);
};

module.exports.getSignedUrl = async (req, res) => {
  try {
    const { type, name, action } = req.body;
    if (action === "get") {
      const url = getPreSignedUrl(awsEnv.notesBucketName, `${type}/${name}`);
    } else if (action === "put") {
      const url = putPreSignedUrl(awsEnv.notesBucketName, `${type}/${name}`);
    }

    req.status(200).json({ url });
  } catch (error) {
    req.status(400).send(error);
  }
};
