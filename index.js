var reminders = require('alexa-reminders')
var express = require('express')
var ngrok = require('ngrok')
var bodyParser = require('body-parser')
var app = express()

const serverPort = 8091
var savedConfig = {}
app.use(express.static('public'))
var urlencodedParser = bodyParser.urlencoded({ extended: false })

reminders.login('Ben\'s Echo dot', 'bmtben@gmail.com', 'Mike!123', function(error, response, config){
  savedConfig = config
  console.log(response)
})

app.post('/alexa-reminders', urlencodedParser, function (req, res) {
  var reminder = req.body.reminder;
  var date = req.body.datetime;
  reminders.setReminder(reminder, date, savedConfig, function(error, response){
    console.log(`reminder: "${reminder}" has been set for ${date}`)
    res.send(response)
  })
})

app.listen(serverPort, function () {
  ngrok.connect(serverPort, function (err, url) {
    console.log('External endpoint: ' + url)
    console.log('Internal endpoint: http://localhost:' + serverPort)
  })
  console.log('Example app listening on port 8091')
})
