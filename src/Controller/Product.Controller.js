const { Product, Category , ProductImage } = require("../Models");
const { Op } = require("sequelize");

const CreateProduct = async (req, res) => {
  try {
    const { name, description, price, stock, categoryId } = req.body;

    if (!name || price === undefined) {
      return res.status(400).json({
        success: false,
        message: "Product name and price are required",
      });
    }

    if (categoryId) {
      const category = await Category.findByPk(categoryId);
      if (!category) {
        return res.status(400).json({
          success: false,
          message: "Invalid categoryId",
        });
      }
    }

    const product = await Product.create({
      name,
      description,
      price,
      stock: stock ?? 0,
      categoryId,
    });

    // save multi img 

    if(req.files && req.files.length > 0){
        const img = req.files.map(file =>({
            ProductId : product.id,
            image : file.filename,
        }))

        await ProductImage.bulkCreate(img);
    }

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const GetProducts = async (req, res) => {
  try {
    const products = await Product.findAll(
        {
            include:[
                {
                    model : ProductImage,
                    as : 'img'
                }
            ]
        }
    );
    return res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      data: products,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const GetProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id , {
        include : [
            {
                model: ProductImage,
                as : "img"
            }
        ]
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      data: product,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const UpdateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, stock, categoryId } = req.body;

    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    if (categoryId !== undefined) {
      const category = await Category.findByPk(categoryId);
      if (!category) {
        return res.status(400).json({
          success: false,
          message: "Invalid categoryId",
        });
      }
      product.categoryId = categoryId;
    }

    if (name !== undefined) product.name = name;
    if (description !== undefined) product.description = description;
    if (price !== undefined) product.price = price;
    if (stock !== undefined) product.stock = stock;

    await product.save();

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: product,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const DeleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    await product.destroy();

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const SearchProducts = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({
        success: false,
        message: "Query parameter is required",
      });
    }

    const products = await Product.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.like]: `%${query}%` } },
          { description: { [Op.like]: `%${query}%` } },
        ],
      },
    });

    return res.status(200).json({
      success: true,
      message: "Products search results",
      data: products,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = {
  CreateProduct,
  GetProducts,
  GetProductById,
  UpdateProduct,
  DeleteProduct,
  SearchProducts,
};
