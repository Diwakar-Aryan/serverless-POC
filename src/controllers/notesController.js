const Joi = require("joi");
const { notesModel } = require("../models/notesModel");

module.exports.create = async (req,res) => {
   const {title, cost} = req.body;
   const check = {title: Joi.string().required().min(4).max(256),
      cost: Joi.number().required().greater(0)
   }
   const {error} = Joi.valid({title,cost},check)
   if(error) {
      res.status(400).send({'error': error.details[0].message})
   } 
console.log(notesModel)
   // notesModel.push({title,check});
   // res.status(200).json(notesModel);
}

module.exports.getAll = async (req, res) => {

   res.status(200).json(notesModel);
}