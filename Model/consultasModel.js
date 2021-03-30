const consultasModel = require('../DataBase/consultas')
const consultasFactory = require('../Factories/consultasFactorie')
const mongoose = require('mongoose')

const consultas = mongoose.model('consultas', consultasModel)

class consultasMode{
    async create(nome, email, cpf, descricao, data, hora){
        var newConsultas = new consultas({
            nome: nome,
            email: email,
            cpf: cpf,
            descricao: descricao,
            data: data,
            hora: hora,
            finalizado: false,
            notificar: false
        })
        await newConsultas.save()
    }

    async selectAll(finalizado){
        if(finalizado){
            return await consultas.find()
        }else{
            var appos = await consultas.find({'finalizado': false})
            var appointments = []

            appos.forEach(appointment=>{
                if(appointment.data != undefined){
                    appointments.push( consultasFactory.consultas(appointment) )
                } 
            })
            return await appointments
        }
    }

    async findOne(id){
        return await consultas.findOne({'_id': id})
    }

    async Finish(id){
        await consultas.findByIdAndUpdate(id,{finalizado: true});
    } 

    async procura(query){
        return await consultas.find().or([{email: query},{cpf: query}])
    }

    async notificado(id){
        return await consultas.findByIdAndUpdate(id,{notificar: true})
    }
}

module.exports = new consultasMode
