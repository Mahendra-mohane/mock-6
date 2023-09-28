const express = require("express");
const router = express.Router();
const { requireAuth } = require("../middlewares/authMiddleware");
const { getAllBlogs, createBlog, editBlog, deleteBlog, likeBlog, commentBlog } = require("../controllers/blogsController");

router.get("/blogs", requireAuth, getAllBlogs);
router.post("/blogs", requireAuth, createBlog);
router.put("/blogs/:id", requireAuth, editBlog);
router.delete("/blogs/:id", requireAuth, deleteBlog);
router.patch("/blogs/:id/like", requireAuth, likeBlog);
router.patch("/blogs/:id/comment", requireAuth, commentBlog);

module.exports = router;
