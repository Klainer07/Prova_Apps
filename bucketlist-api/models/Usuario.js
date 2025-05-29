const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    nome: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
    senha: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Usuario', usuarioSchema);