const mongoose = require('mongoose')

const consultas = new mongoose.Schema({
    nome: String,
    email: String,
    cpf: String,
    descricao: String,
    data: Date,
    hora: String,
    finalizado: Boolean,
    notificar: Boolean
})

module.exports = consultas