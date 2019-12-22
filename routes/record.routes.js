const express = require('express')
const router = express.Router()
const recordController = require('../controllers/records.controller')

router.post('/create', recordController.addRecord)
router.get('/records', recordController.getRecords)
router.put('/update', recordController.updateRecord)
router.delete('/delete/:id', recordController.deleteRecord)

module.exports = router