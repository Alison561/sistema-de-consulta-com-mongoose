const { render } = require('ejs')
const consultasModel = require('../Model/consultasModel')
const mailer = require("nodemailer");
class homeController {

    async home(req, res){
        res.render('home')
    }

    async getCreat(req, res){
        res.render('marcarConsulta')
    }

    async creat(req, res){
        res.render('marcarConsulta')
        var { nome, email, cpf, descricao, data, hora } = req.body
        consultasModel.create(nome, email, cpf, descricao, data, hora)
    }

    async getcalendar(req, res){
        var consultas = await consultasModel.selectAll(false)
        res.json(consultas)
    }

    async getFinalizarConsulta(req, res){
        var appo = await consultasModel.findOne(req.params.id)
        res.render('finalizarConsulta', {appo})
    }

    async finalizarConsulta(req, res){
        var appo = await consultasModel.findOne(req.params.id)
        consultasModel.Finish(req.params.id)
        res.render('finalizarConsulta', {appo})
    }

    async getListConsulta(req, res){
        var appo = await consultasModel.selectAll(true)
        res.render('listConsulta', {appo})
    }

    async listConsulta(req, res){
        var appo = await consultasModel.procura(req.body.search)
        res.render('listConsulta', {appo})
    }

    async sendEmail(){
        var appos = await consultasModel.selectAll(false)
        var transporter = mailer.createTransport({
            service: 'gmail', 
            auth: { 
                user: 'souzalison561@gmail.com', 
                pass: '741852Ali' 
            } 
         })

         appos.forEach(async app => {
            
            var date = app.start.getTime(); 
            var hour = 1000 * 60 * 60;
            var gap = date-Date.now();

            if(gap <= hour){
            console.log('oi')
                if(!app.notified){
                    console.log(gap )
                    consultasModel.notificado(app.id)
                    transporter.sendMail({
                        from: "Alison Souza <souzalison561@gmail.com>",
                        to: app.email,
                        subject: "Sua consulta vai acontecer em breve!",
                        text: "Conteúdo qualquer!!!!! Sua consulta vai acontecer em 1h"
                    }).then( () => {

                    }).catch(err => {

                    })

                }
            }

        })
    }
}

module.exports = new homeController