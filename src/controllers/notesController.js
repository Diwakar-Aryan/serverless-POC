const Joi = require("joi");
const notesModel = require("../models/notesModel");

module.exports.create = async (req,res) => {
   const {title, cost, coverLocation,language,topics,pdfLocation,name} = req.body;
   const check = {
      coverLocation: Joi.string().required().min(4).max(256),
      language: Joi.string().required().min(4).max(256),
      topics: Joi.array(),
      pdfLocation: Joi.string().required().min(4).max(256),
      name: Joi.string().required().min(4).max(256),
      title: Joi.string().required().min(4).max(256),
      cost: Joi.number().required().greater(0)
   }
   const {error} = Joi.valid({ title, cost, coverLocation, language, topics, pdfLocation, name },check)
   if(error) {
      res.status(400).send({'error': error})
   } 
   const notesDoc = new notesModel({title, cost, coverLocation,language,topics,pdfLocation,name})
   const doc = await notesDoc.save()

   res.status(200).json({createdDoc: doc});
}

module.exports.getAll = async (req, res) => {
console.log('Per',(notesModel))
   res.status(200).json(notesModel);
}