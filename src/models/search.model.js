const mongoose = require("mongoose");

const searchSchema = new mongoose.Schema(
  {
    //  Basic Identifiers
    product_id: {
      type: Number,
      required: true,
      index: true,
    },

    dairy_id: {
      type: Number,
      required: true,
      index: true,
    },

    //  Product Info
    name: {
      type: String,
      required: true,
      trim: true,
    },

    vendor_name: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      index: true,
    },

    description: {
      type: String,
      required: true,
    },

    milk_source: {
      type: String,
      required: true,
      trim: true,
    },

    //  Media
    primary_image: {
      type: String,
      required: true,
    },

    //  Search Optimization
    keywords: {
      type: [String],
      default: [],
      index: true,
    },

    //  Pricing
    price: {
      type: Number, // selling price
      required: true,
    },

    retail_price: {
      type: Number, // MRP / reference price
      required: true,
    },

    unit: {
      type: String,
      default: "kg",
    },

    //  Order & Supply
    min_order_quantity: {
      value: {
        type: Number,
        required: true,
      },
      unit: {
        type: String,
        enum: ["L", "kg"],
        default: "L",
      },
    },

    supply_capacity_per_day: {
      value: {
        type: Number,
        required: true,
      },
      unit: {
        type: String,
        enum: ["L", "kg"],
        default: "L",
      },
    },

    available_quantity: {
      type: Number,
      default: 0,
    },

    packaging: {
      type: [String],
      default: [],
    },

    //  Shelf Life
    shelf_life: {
      duration: {
        type: Number,
        required: true,
      },
      unit: {
        type: String,
        enum: ["days"],
        default: "days",
      },
      storage: {
        type: String,
        default: "Refrigerated",
      },
    },

    //  Ratings
    avg_rating: {
      type: Number,
      default: 0,
    },

    rating_count: {
      type: Number,
      default: 0,
    },

    //  Availability & Trust
    is_verified: {
      type: Boolean,
      default: false,
    },

    is_available: {
      type: Boolean,
      default: true,
    },

    //  Location (Geo Search)
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true,
      },
    },

    //  Extra Flexible Data
    attributes: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
    collection: "resultsData",
  }
);

//  Geo Index
searchSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Search", searchSchema);