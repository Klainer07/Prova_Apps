const mongoose = require('mongoose');

const listaSchema = new mongoose.Schema({
    nome: { type: String, required: true, trim: true },
    descricao: { type: String, trim: true },
    usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Lista', listaSchema);
