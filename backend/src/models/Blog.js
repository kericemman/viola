const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },

    slug: {
      type: String,
      unique: true
    },

    excerpt: String,

    content: String,

    coverImage: String,

    category: {
      type: String,
      enum: ["Career", "Leadership", "HR Systems", "People", "Workplace Culture", "Governance", "Personal Development", "Other"],
    },

    tags: [String],

    readingTime: String,

    highlightQuote: String,

    author: {
      type: String,
      default: "Brenda"
    },

    featured: {
      type: Boolean,
      default: false
    },

    published: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);