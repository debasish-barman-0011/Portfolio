const Project = require('../models/Project');

exports.getAll = async (req, res) => {
  const projects = await Project.find({ isActive: true }).sort('sequence');
  res.json(projects);
};

exports.getAllAdmin = async (req, res) => {
  const projects = await Project.find().sort('-createdAt');
  res.json(projects);
};

exports.create = async (req, res) => {
  const project = new Project(req.body);
  await project.save();
  res.status(201).json(project);
};

exports.update = async (req, res) => {
  const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(project);
};

exports.delete = async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};