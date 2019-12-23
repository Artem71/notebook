const Record = require('../models/records.model')

exports.addRecord = (req, res) => {
  console.log()
  const date = req.body.date
  const text = req.body.text
  
  if (text.length > 1024) {
    res.send('limit')
    return
  }

  Record.create({date, text})
    .then(r => res.send(r.status))
    .catch(e => console.log(e))
}

exports.getRecords = (req, res) => {
  Record.findAll({raw: true})
    .then(r => res.send(r))
    .catch(e => console.log(e))
}

exports.updateRecord = (req, res) => {
  const id = req.body.id
  const newDate = req.body.date
  const newText = req.body.text

  if (newText.length > 1024) {
    res.send('limit')
    return
  }

  Record.update({
    date: newDate,
    text: newText
  }, {
    where: {id} 
  })
    .then(r => res.send(r))
    .catch(e => console.log(e))
}

exports.deleteRecord = (req, res) => {
  const id = req.params.id
  
  Record.destroy({
    where: {id}
  })
  .then(r => res.send(r.status))
  .catch(e => console.log(e))
}
