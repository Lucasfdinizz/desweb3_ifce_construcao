const mongoose = require('mongoose');

const CercaSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  lado: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Cerca', CercaSchema);