require("dotenv").config();
/* 
    server port number
*/
exports.SERVER_PORT = process.env.SERVER_PORT || 5000;

/* 
    jwt access key
*/
exports.JWT_ACCESS_KEY = process.env.JWT_ACCESS_KEY;

/* cookies name */
exports.COOKIES_NAME_1 = process.env.COOKIES_NAME_1;

/* 
    export mongodb url
*/
exports.MONGODB_URL = process.env.MONGODB_URL;

exports.CLOUDINARY_NAME = process.env.CLOUDINARY_NAME;
exports.CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
exports.CLOUDINARY_SECRET_KEY = process.env.CLOUDINARY_SECRET_KEY;
