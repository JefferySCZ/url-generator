const express = require('express')
const app = express()
require('./config/mongoose')

const port = process.env.PORT || 3000


const exphbs = require('express-handlebars')
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))



const URL = require('./models/URL')
const shortenURL = require('./functions/shortenURL')

//Home
app.get('/', (req, res) => {
  res.render('index')
})

//Show
app.post('/', (req, res) => {
  const url = req.body.url
  const shortURL = shortenURL(5)

  if (!url) return res.redirect('/')

  URL.findOne({ originalURL: url })
    .then((data) => (data ? data : URL.create({ shortURL, originalURL: url })))
    .then((data) =>
      res.render('index', {
        origin: req.headers.origin,
        shortURL: data.shortURL,
      })
    )
    .catch((err) => console.error(err))
})

app.get('/:shortURL', (req, res) => {
  const { shortURL } = req.params

  URL.findOne({ shortURL })
    .then((data) => {
      if (!data) {
        return res.render('error', {
          errorMsg: 'Wrong!',
          errorURL: req.headers.host + '/' + shortURL,
        })
      }
      res.redirect(data.originalURL)
    })
    .catch((err) => console.error(err))
})

app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})
