const sequelize = require("../Config/Connection");

const User = require("./User");
const Category = require("./Category");
const Product = require("./Product");
const ProductImage = require("./ProductImage");
const Cart = require("./Cart");
const CartItem = require("./CartItem");
const Order = require("./Order");
const OrderItem = require("./OrderItem");
const Payment = require("./Payment");
const Address = require("./Address");
const Review = require("./Review");
const Wishlist = require("./Wishlist");

// Category -> Product
Category.hasMany(Product);
Product.belongsTo(Category);

// Product -> Images
Product.hasMany(ProductImage);
ProductImage.belongsTo(Product);

// User -> Cart
User.hasOne(Cart);
Cart.belongsTo(User);

// Cart -> Cart Items
Cart.hasMany(CartItem);
CartItem.belongsTo(Cart);

// Product -> Cart Items
Product.hasMany(CartItem);
CartItem.belongsTo(Product);

// User -> Orders
User.hasMany(Order);
Order.belongsTo(User);

// Order -> Order Items
Order.hasMany(OrderItem);
OrderItem.belongsTo(Order);

// Product -> Order Items
Product.hasMany(OrderItem);
OrderItem.belongsTo(Product);

// User -> Address
User.hasMany(Address);
Address.belongsTo(User);

// Order -> Payment
Order.hasOne(Payment);
Payment.belongsTo(Order);

// User -> Review
User.hasMany(Review);
Review.belongsTo(User);

// Product -> Review
Product.hasMany(Review);
Review.belongsTo(Product);

// User -> Wishlist
User.hasMany(Wishlist);
Wishlist.belongsTo(User);

// Product -> Wishlist
Product.hasMany(Wishlist);
Wishlist.belongsTo(Product);

module.exports = {
  sequelize,
  User,
  Category,
  Product,
  ProductImage,
  Cart,
  CartItem,
  Order,
  OrderItem,
  Payment,
  Address,
  Review,
  Wishlist,
};