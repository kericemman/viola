const Blog = require("../models/Blog");
const slugify = require("slugify");
const { uploadToCloudinary } = require("../utils/cloudinaryUpload");

exports.createBlog = async (req, res) => {
  try {
    let coverImageUrl = null;

    if (req.file) {
      const result = await uploadToCloudinary(
        req.file.buffer,
        "brenda/blog"
      );

      coverImageUrl = result.secure_url;
    }

    const blog = await Blog.create({
      ...req.body,
      slug: slugify(req.body.title, { lower: true }),
      coverImage: coverImageUrl
    });

    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getBlogs = async (req, res) => {
  const blogs = await Blog.find({ published: true }).sort({
    createdAt: -1
  });

  res.json(blogs);
};

exports.getSingleBlog = async (req, res) => {
  const blog = await Blog.findOne({ slug: req.params.slug });

  res.json(blog);
};

exports.updateBlog = async (req, res) => {
    try {
      let updateData = { ...req.body };
  
      if (req.file) {
        const result = await uploadToCloudinary(
          req.file.buffer,
          "brenda/blog"
        );
  
        updateData.coverImage = result.secure_url;
      }
  
      const blog = await Blog.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true }
      );
  
      res.json(blog);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

exports.deleteBlog = async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);

  res.json({ message: "Blog deleted" });
};