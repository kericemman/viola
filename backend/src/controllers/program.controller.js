const Program = require("../models/Program");

exports.createProgram = async (req, res) => {
  const program = await Program.create(req.body);
  res.status(201).json(program);
};

exports.updateProgramImage = async (req, res) => {
  const { programId, imageUrl } = req.body;

  const program = await Program.findByIdAndUpdate(
    programId,
    { imageUrl },
    { new: true }
  );

  res.json(program);
};
