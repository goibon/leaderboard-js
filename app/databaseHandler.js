const MongoClient = require('mongodb').MongoClient

module.exports = (databasePath = `mongodb://localhost:27017/leaderboard`) => {
  const databaseHandler = {}
  var mongodb

  MongoClient.connect(databasePath, (error, database) => {
    if (error) {
      throw error
    }
    mongodb = database
  })

  databaseHandler.getAllEntries = function () {
    return new Promise((resolve, reject) => {
      mongodb.collection('scores').find().toArray((error, documents) => {
        if (error) {
          console.error(error)
          reject(error)
        }
        console.log(documents)
        resolve(documents)
      })
    })
  }

  databaseHandler.saveEntry = (entry) => {
    return new Promise((resolve, reject) => {
      mongodb.collection('scores').insert(entry).then((result) => {
        console.log(`Entry created: ${JSON.stringify(entry)}`)
        resolve(result.ops[0])
      }).catch((error) => {
        console.error(error)
        reject(error)
      })
    })
  }

  return databaseHandler
}
