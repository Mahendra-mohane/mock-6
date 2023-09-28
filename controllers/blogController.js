const Blog = require("../models/Blog");

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ user: req.user.userId }).populate("user", "username email");
    res.json({ success: true, blogs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createBlog = async (req, res) => {
  const { title, content, category } = req.body;

  try {
    const blog = await Blog.create({ title, content, category, user: req.user.userId });
    res.status(201).json({ success: true, blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const editBlog = async (req, res) => {
  const { id } = req.params;
  const { title, content, category } = req.body;

  try {
    const blog = await Blog.findByIdAndUpdate(id, { title, content, category }, { new: true });
    res.json({ success: true, blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteBlog = async (req, res) => {
  const { id } = req.params;

  try {
    await Blog.findByIdAndDelete(id);
    res.json({ success: true, message: "Blog deleted successfully." });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const likeBlog = async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await Blog.findByIdAndUpdate(id, { $inc: { likes: 1 } }, { new: true });
    res.json({ success: true, blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const commentBlog = async (req, res) => {
  const { id } = req.params;
  const { username, content } = req.body;

  try {
    const blog = await Blog.findByIdAndUpdate(id, { $push: { comments: { username, content } } }, { new: true });
    res.json({ success: true, blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getAllBlogs, createBlog, editBlog, deleteBlog, likeBlog, commentBlog };
