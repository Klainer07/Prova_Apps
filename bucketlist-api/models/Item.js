const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    titulo: { type: String, required: true, trim: true },
    categoria: { type: String, enum: ["Jogo", "Livro", "Filme", "Viagem", "Esporte", "Outro"], default: "Outro" },
    prioridade: { type: String, enum: ["Baixa", "Média", "Alta"], default: "Média" },
    status: { type: String, enum: ["Pendente", "Concluído"], default: "Pendente" },
    prazo: { type: Date },
    listaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lista', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Item', itemSchema);
