const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const Product = require("../models/product");
const { errorHandler } = require("../helpers/dbErrorHandler");
const catchAsync = require("../utils/catchAsync");

exports.productById = catchAsync(async (req, res, next) => {
  console.log(req.params.productId);
  const product = await Product.findById(req.params.productId).populate([
    "tag",
    "category",
    "department",
  ]);
  req.product = product;
  next();
});

exports.readProduct = (req, res) => {
  req.product.photo = undefined;
  return res.json(req.product);
};

exports.createProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        status: "Failed",
        error: "Image could not be uploaded",
      });
    }

    const {
      name,
      description,
      price,
      category,
      department,
      shipping,
      shippingTime,
    } = fields;
    if (!name) {
      return res.status(400).json({
        status: "Failed",
        error: "Product Title is required.",
      });
    } else if (!description) {
      return res.status(400).json({
        status: "Failed",
        error: "Please input a product description.",
      });
    } else if (!department) {
      return res.status(400).json({
        status: "Failed",
        error: "Please select a product department.",
      });
    } else if (!price) {
      return res.status(400).json({
        status: "Failed",
        error: "Oops, you forgot to include a price for your product.",
      });
    } else if (!category) {
      return res.status(400).json({
        status: "Failed",
        error: "Please select a category for your product.",
      });
    } else if (!shipping) {
      return res.status(400).json({
        status: "Failed",
        error: "Kindly indicate your product shipping method.",
      });
    } else if (!shippingTime) {
      return res.status(400).json({
        status: "Failed",
        error:
          "Please provide the delivery duration for your product (in days).",
      });
    }

    let product = new Product(fields);

    if (files.photo) {
      // console.log("FIle Photo ", files.photo);
      if (files.photo.size > 1000000) {
        // if the uploaded photo is greater than 1mb
        return res.status(400).json({
          status: "Failed",
          error: "Image size should not exceed 1mb",
        });
      }
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    } else {
      return res.status(400).json({
        status: "Failed",
        error: "Please upload an image for your product",
      });
    }

    product.save((err, result) => {
      if (err) {
        console.log(err);
        return res.status(400).json({
          status: "Failed",
          error: errorHandler(err),
        });
      }
      res.json(result);
    });
  });
};

exports.removeProduct = catchAsync(async (req, res, next) => {
  let product = req.product;
  let deletedProduct = await product.remove();
  res.json({
    status: "sucess",
    message: "Product deleted successfully",
  });
});

exports.updateProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        status: "Failed",
        error: "Image could not be uploaded",
      });
    }

    const {
      name,
      description,
      price,
      category,
      department,
      shipping,
      shippingTime,
    } = fields;
    if (!name) {
      return res.status(400).json({
        status: "Failed",
        error: "Product Title is required.",
      });
    } else if (!description) {
      return res.status(400).json({
        status: "Failed",
        error: "Please input a product description.",
      });
    } else if (!price) {
      return res.status(400).json({
        status: "Failed",
        error: "Oops, you forgot to include a price for your product.",
      });
    } else if (!category) {
      return res.status(400).json({
        status: "Failed",
        error: "Please select a category for your product.",
      });
    } else if (!department) {
      return res.status(400).json({
        status: "Failed",
        error: "Please input a product department.",
      });
    } else if (!shipping) {
      return res.status(400).json({
        status: "Failed",
        error: "Kindly indicate your product shipping status.",
      });
    } else if (!shippingTime) {
      return res.status(400).json({
        status: "Failed",
        error:
          "Please provide the delivery duration for your product (in days).",
      });
    }

    //Get the product and edit the fields with lodash extends method
    let product = req.product;
    product = _.extend(product, fields);

    if (files.photo) {
      // console.log("FIle Photo ", files.photo);
      if (files.photo.size > 1000000) {
        // if the uploaded photo is greater than 1mb
        return res.status(400).json({
          status: "Failed",
          error: "Image size should not exceed 1mb",
        });
      }
      product.photo.data = await fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    } else {
      return res.status(400).json({
        status: "Failed",
        error: "Please upload an image for your product",
      });
    }

    await product.save((err, result) => {
      if (err) {
        return res.status(400).json({
          status: "Failed",
          error: errorHandler(err),
        });
      }
      res.json(result);
    });
  });
};

/**
 * We will query products by best seller, arrival, price, featured, random pick
 * bestsell - /products?sortBy=sold&order=desc&limit=10
 * arrival - /products?sortBy=createdAt&order=desc&limit=10
 * price - /products?sortBy=price&order=asc&limit=20
 * featured - /products?sortBy=featured&order=desc&limit=15
 * random pick - /products?order=rand&limit=20
 */

exports.listProducts = catchAsync(async (req, res, next) => {
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  let limit = req.query.limit ? parseInt(req.query.limit) : 10;
  let order = req.query.order ? req.query.order : "asc";

  let products = await Product.find()
    .select("-photo")
    .populate("category")
    .sort([[sortBy, order]])
    .limit(limit);
  res.status(200).json({
    status: "success",
    data: products,
  });
});

exports.relatedProducts = catchAsync(async (req, res, next) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 5;

  let products = await Product.find({
    id: { $ne: req.product },
    category: req.product.category,
  })
    .limit(limit)
    .populate("category, 'id_name'");
  res.status(200).json({
    status: "success",
    data: products,
  });
});

exports.productCategories = catchAsync(async (req, res, next) => {
  let categories = await Product.distinct("category", {});
  res.status(200).json({
    status: "success",
    data: categories,
  });
});

exports.productDepartments = catchAsync(async (req, res, next) => {
  let departments = await Product.distinct("department", {});
  res.status(200).json({
    status: "success",
    data: departments,
  });
});

exports.productTags = catchAsync(async (req, res, next) => {
  let tags = await Product.distinct("tag", {});
  res.status(200).json({
    status: "success",
    data: tags,
  });
});

/**
 * list products by search
 * we will implement product search in react
 * we will show categories in checkbox and price range in radio buttons
 * as the user clicks on those checkboxes and radio buttons
 * we will make api requests and show the products to users based on what they want
 */

exports.listBySearch = async (req, res) => {
  let order = req.body.order ? req.body.order : "desc";
  let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = parseInt(req.body.skip);
  let findArgs = {};

  console.log(order, sortBy, limit, skip, req.body.filters);

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === "price") {
        // gte -  greater than price [0-10]
        // lte - less than
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1],
        };
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }

  // console.log("findArgs", findArgs);

  await Product.find(findArgs)
    .select("-photo")
    .populate(["tag", "category", "department"])
    .sort([[sortBy, order]])
    .skip(skip)
    .limit(limit)
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          status: "Failed",
          error: "Products not found",
        });
      }
      res.json({
        size: data.length,
        data,
      });
    });
};

exports.productPhoto = async (req, res, next) => {
  if (req.product.photo.data) {
    await res.set("Content-Type", req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
  next();
};

exports.listSearchedProducts = catchAsync(async (req, res, next) => {
  //creating query object to hold search value and department value
  let query = {};
  //assign query.name to search value
  if (req.query.search) {
    query.name = { $regex: req.query.search, $options: "i" };
    if (req.query.department && req.query.department !== "All") {
      req.department = req.query.department;
    }
    //find the product based on query with 2 properties
    //search and department
    let product = await Product.find(query).select("-photo");
    res.status(200).json({
      status: "success",
      data: product,
    });
  }
});

exports.decreaseQuantity = catchAsync(async (req, res, next) => {
  let bulkOps = req.body.order.products.map((item) => {
    return {
      updateOne: {
        filter: { _id: item._id },
        update: { $inc: { quantity: -item.count, sold: +item.count } },
      },
    };
  });

  await Product.bulkWrite(bulkOps, {});
  res.status(200).json({
    status: "sucess",
  });
  next();
});

exports.listProductSizes = (req, res) => {
  res.json(Product.schema.path("size").enumValues);
};

exports.productStats = catchAsync(async (req, res, next) => {
  const stats = await Product.aggregate([
    {
      $match: { sold: { $gte: 0 } },
    },
    {
      $group: {
        _id: "$department",
        numProducts: { $sum: 1 },
        numRatings: { $sum: "$rating" },
        numSold: { $sum: "$sold" },
        avgRating: { $avg: "$ratingAverage" },
        avgPrice: { $avg: "$price" },
        minPrice: { $min: "$price" },
        maxPrice: { $max: "$price" },
      },
    },
    {
      $sort: { numSold: 1 },
    },
  ]);
  res.status(200).json({
    status: "success",
    data: stats,
  });
});
