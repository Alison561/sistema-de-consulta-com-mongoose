const express = require('express')
const router = express.Router()

const homeController = require('../Controllers/homeController')

router.get('/', homeController.home)

router.get('/lista', homeController.getListConsulta)
router.post('/lista', homeController.listConsulta)

router.get('/getcalendar', homeController.getcalendar)

router.get('/event/:id', homeController.getFinalizarConsulta)
router.post('/event/:id', homeController.finalizarConsulta)


router.get('/consulta', homeController.getCreat)
router.post('/consulta', homeController.creat)

module.exports = router