const fs = require('fs')

const isFileExisted = (dirPath) => {
  return new Promise((resolve, reject) => {
    fs.access(dirPath, (err) => {
      if (err) {
        resolve(false) // "不存在"
      } else {
        resolve(true) // "存在"
      }
    })
  })
}

module.exports = {
  isFileExisted,
}
