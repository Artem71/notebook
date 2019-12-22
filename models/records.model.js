const Sequelize = require('sequelize')

const sequelize = new Sequelize('recordsdb', 'root', '', {
  dialect: 'mysql',
  host: 'localhost'
})

sequelize.sync()
  .then(result => console.log('Success'))
  .catch(err => console.log(err))

const Record = sequelize.define("records", {
  date: {
    type: Sequelize.STRING, 
    allowNull: false
  },
  text: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Record