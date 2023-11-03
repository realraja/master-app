const { Schema, default: mongoose } = require("mongoose");


const AllAppsSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  id: {
    type: String,
    require: true,
  },
  icon: {
    type: String,
    require: true,
  },
  userId: {
    type: String,
    require: true,
  },
  show: {
    type: Boolean,
    default: false
  },
  views: [{
    userId: String,
    date:[],
    createdAt: {
      type: Date,
      default: Date.now,
    }
  }],
  shares: [{
    userId: String,
    date:[],
    createdAt: {
      type: Date,
      default: Date.now,
    }
  }],
  comments: {
    type: Number,
    default: 0
  },
  liked: [{
    userId: String,
    date:[],
    createdAt: {
      type: Date,
      default: Date.now,
    }
  }],
  date:[],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const AllApps = mongoose.models.AllApps || mongoose.model("AllApps", AllAppsSchema);

export default AllApps;
