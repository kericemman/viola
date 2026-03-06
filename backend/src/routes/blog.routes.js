const express = require("express");
const upload = require("../middleware/upload.middleware");

const {
  createBlog,
  updateBlog,
  getBlogs,
  getSingleBlog,
  deleteBlog
} = require("../controllers/blog.controller");

const { protect } = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/", getBlogs);
router.get("/:slug", getSingleBlog);

router.patch("/blogs/:id", updateBlog);

router.post("/", protect, upload.single("coverImage"), createBlog);

router.patch("/:id", protect, upload.single("coverImage"), updateBlog);

router.delete("/:id", protect, deleteBlog);

module.exports = router;