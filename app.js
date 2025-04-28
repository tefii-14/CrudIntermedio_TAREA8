const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

//router = enrutador
const marcasRouter = require('./routers/marcas')
const modelosRouter = require('./routers/modelos')

//Middleware = canal de comunicacion (request > process > result)
const app = express()
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))

//motor de plantilla
app.set('view engine', 'ejs') //defines el TIPO/Nombre
app.set('views', path.join(__dirname, 'views'))

//rutas
app.use('/', modelosRouter)
//app.use('/marcas', marcasRouter)

//Iniciamos el servidor
app.listen(3000, () => {
  console.log('servidor iniciado en http://localhost:3000')
})