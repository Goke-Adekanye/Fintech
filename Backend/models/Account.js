const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "Not authorized to access resource"],
  },
  balance: {
    type: Number,
    required: true,
    default: 0,
  },
  currency: {
    type: String,
    required: true,
    maxlength: 10,
  },
  created_at: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

// accountSchema.index({ user_id: 1 });

module.exports = mongoose.model("Account", accountSchema);
