const mongoose = require('mongoose');

const { Schema } = mongoose;

const ImgSchema = new Schema(
    { img: 
        { data: Buffer, contentType: String }
    }
  );
const Image = mongoose.model('Clothes',ImgSchema);

module.exports = Image;