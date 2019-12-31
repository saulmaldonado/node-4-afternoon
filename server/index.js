require('dotenv').config()
const express = require('express')
const session = require('express-session')

const swagController = require('./controllers/swagController')

const checkForSession = require('./middlewares/checkForSessions')

const ac = require('./controllers/authController')

const cartController = require('./controllers/cartController')

const searchController = require('./controllers/searchController')

const app = express()

const {SERVER_PORT, SESSION_SECRET} = process.env

app.use(express.json())

app.use(session({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}))

app.use(checkForSession);
app.use(express.static(`${__dirname}/../build`));

app.post('/api/login', ac.login)
app.post('/api/register', ac.register)
app.post('/api/signout', ac.signout)
app.get('/api/user', ac.getUser)

app.get('/api/swag', swagController.read)

app.post('/api/cart/checkout', cartController.checkout)
app.post('/api/cart/:id', cartController.add)
app.delete('/api/cart/:id', cartController.delete)

app.get('/api/search',  searchController.search)



app.listen(SERVER_PORT, () => console.log(`Listening on port ${SERVER_PORT}...`))