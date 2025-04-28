const express = require('express')
const router = express.Router()
const db = require('../config/database')

router.get('/', async (req, res) => {
    try{
        const consulta =`
        SELECT 
          m.idmodelo,
            ma.nombre AS marca,
            m.nombre,
            m.anio
         FROM modelos m
           INNER JOIN marcas ma ON m.idmarca = ma.idmarca`
        const [modelos] = await db.query(consulta)
        res.render('index', { modelos })
    }catch(error){
        console.error(error)
    }
})

router.get('/create', async(req, res) => {
    try{
        const [marcas] = await db.query("SELECT * FROM marcas")
        res.render('create', {marcas})
    }catch(error){
        console.error(error)
    }
})

router.post('/create', async(req, res) => {
    try{
        const {idmarca, nombre, anio} = req.body
        await db.query("INSERT INTO modelos (idmarca, nombre, anio) VALUES (?,?,?)", [idmarca, nombre, anio])
        res.redirect('/')
    }catch(error){
        console.error(error)
    }
})

router.get('/delete/:id', async(req, res) => {
    try{
        const idEliminar = req.params.id
        await db.query("DELETE FROM modelos WHERE idmodelo = ?", [idEliminar])
        res.redirect('/')
    }catch(error){
        console.error(error)
    }
})

router.get('/edit/:id', async(req, res) => {
    try{
        const [marcas] = await db.query("SELECT * FROM marcas")
        const [datos] = await db.query("SELECT * FROM modelos WHERE idmodelo = ?", [req.params.id])
        
        if (datos.length == 0){
            return res.redirect('/')
        }
        
        res.render('edit', {marcas, modelo: datos[0]})
    }catch(error){
        console.error(error)
    }
})

router.post('/edit/:id', async(req, res) => {
    try{
        const {idmarca, nombre, anio} = req.body
        await db.query("UPDATE modelos SET idmarca = ?, nombre = ?, anio = ? WHERE idmodelo = ?", 
            [idmarca, nombre, anio, req.params.id])
        res.redirect('/')
    }catch(error){
        console.error(error)
    }
})

module.exports = router