const express = require('express')
const expressHandlebars = require('express-handlebars')
const bodyParser = require('body-parser')

const handlers = require('./lib/handlers')

const app = express()

// configure Handlebars view engine
app.engine('handlebars', expressHandlebars({
  defaultLayout: 'main',
}))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const port = process.env.PORT || 3000

app.use(express.static(__dirname + '/public'))

app.get('/', handlers.home)

app.get('/about', handlers.about)

app.get('/newsletter', handlers.newsletter)
app.post('/newsletter', handlers.api.newsletterSignup)
app.get('/newsletter-signup', handlers.newsletterSignup)
app.get('/newsletter-signup/process', handlers.newsletterSignupProcess)
app.get('/newsletter-signup-thank-you', handlers.newsletterSignupThankYou)

// custom 404 page
app.use (handlers.notFound)

// custom 500 page
app.use(handlers.serverError)

if(require.main === module) {
  app.listen(port, () => {
    console.log( `Express started on http://localhost:${port}` + '; press ctrl-C to terminate.' )
  })
} else {
  module.exports = app
}

// app.listen(port, () => console.log(`Express started on http://localhost:${port}; ` + `press CTRl-C to terminate.`))