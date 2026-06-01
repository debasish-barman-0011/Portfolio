const Blog = require('../models/Blog');

exports.getAll = async (req, res) => {
  const { page = 1, limit = 10, sort = 'latest' } = req.query;
  const sortOption = sort === 'oldest' ? { createdAt: 1 } : { createdAt: -1 };
  const blogs = await Blog.find()
    .sort(sortOption)
    .limit(limit * 1)
    .skip((page - 1) * limit);
  const total = await Blog.countDocuments();
  res.json({ blogs, total, page, pages: Math.ceil(total / limit) });
};

exports.getAllFull = async (req, res) => {
  const blogs = await Blog.find().sort('-createdAt');
  res.json(blogs);
};

exports.create = async (req, res) => {
  const blog = new Blog(req.body);
  await blog.save();
  res.status(201).json(blog);
};

exports.update = async (req, res) => {
  const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(blog);
};

exports.delete = async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};