// noinspection DuplicatedCode

const inquirer = require('@inquirer/prompts')
const fs = require('fs')
const path = require('path')

const createComponent = (name, constants) => {
  const itemName = `${name
    .split('')
    .map((d, i) => (i === 0 ? d.toUpperCase() : d))
    .join('')}Item`
  const rootPath = `${path.join(__dirname, '../')}/src/dw/components/item`
  const defaultItemText = fs.readFileSync(`${rootPath}/AnalysisTextItem/index.tsx`, 'utf8')

  const readDir = fs.readdirSync(`${rootPath}`, { withFileTypes: true })
  const itemArr = []
  for (let i = 0; i < readDir.length; i++) {
    if (!readDir[i].name.endsWith('.ts')) {
      itemArr.push(readDir[i].name)
    }
  }

  if (itemArr.includes(itemName)) {
    console.log(`---${itemName} 已存在，请查看---`)
  } else {
    fs.mkdirSync(`${rootPath}/${itemName}`)
    fs.writeFile(`${rootPath}/${itemName}/index.tsx`, defaultItemText.replace(/AnalysisTextItem/g, itemName), (err) => {
      if (err) throw err
      console.log('---File is created successfully.---')
    })

    const indexData = fs.readFileSync(`${rootPath}/index.ts`, 'utf8')

    const arr1 = indexData.split(`} from 'dw/api/Constants'`)
    const arr2 = arr1[1].split(`const itemMap = {`)

    const top = `${arr1[0]}, ${constants} } from 'dw/api/Constants'\n\nimport ${itemName} from 'dw/components/item/${itemName}'`
    const bottom = `const itemMap = {\n  [${constants}.type]: ${itemName},${arr2[1]}`
    const indexText = `${top}${arr2[0]}${bottom}`
    console.log(indexText)

    fs.writeFile(`${rootPath}/index.ts`, indexText, (err) => {
      if (err) throw err
      console.log('---item/index.ts update successfully.---')
    })
  }
}

const createControl = (name, constants) => {
  const itemName = name
  const rootPath = `${path.join(__dirname, '../')}/src/dw/control`
  const defaultItemText = fs.readFileSync(`${rootPath}/config/AnalysisText.tsx`, 'utf8')

  const readDir = fs.readdirSync(`${rootPath}/config`, { withFileTypes: true })
  const itemArr = []
  for (let i = 0; i < readDir.length; i++) {
    itemArr.push(readDir[i].name)
  }

  if (itemArr.includes(itemName)) {
    console.log(`---Control ${itemName} 已存在，请查看---`)
  } else {
    fs.writeFile(
      `${rootPath}/config/${itemName}.tsx`,
      defaultItemText.replace(/analysisText/g, itemName).replace(/TYPE_TEXT/g, constants),
      (err) => {
        if (err) throw err
        console.log('---Component index.ts successfully---')
      },
    )

    const indexData = fs.readFileSync(`${rootPath}/index.ts`, 'utf8')

    const arr1 = indexData.split(`} from 'dw/api/Constants'`)
    const arr2 = arr1[1].split(`export const controlMap: any = {`)
    const top = `${arr1[0]}, ${constants} } from 'dw/api/Constants'\n\nimport ${itemName} from 'dw/control/config/${itemName}'`
    const bottom = `export const controlMap: any = {\n  [${constants}.type]: ${itemName},${arr2[1]}`
    const indexText = `${top}${arr2[0]}${bottom}`

    fs.writeFile(`${rootPath}/index.ts`, indexText, (err) => {
      if (err) throw err
      console.log('---control/index.ts update successfully---')
    })
  }
}

inquirer.input({ message: 'Enter Item Constants Name（eg：TYPE_TIME）', default: 'TYPE_TIME' }).then((constants) => {
  inquirer.input({ message: 'Enter Item Type（eg：analysis_time）', default: 'analysis_time' }).then((type) => {
    console.log('---Start---', constants, type)

    const name = type
      .trim()
      .split('_')
      .map((d, index) => {
        const arr = d
          .split('')
          .map((m) => (m ? m.toLowerCase() : ''))
          .filter((m) => !!m)
          .join('')
        return index === 0
          ? arr
          : arr
              .split('')
              .map((m, i) => (i === 0 ? m.toUpperCase() : m))
              .join('')
      })
      .join('')

    console.log('name: ', name)
    if (name) {
      createComponent(name, constants)
      createControl(name, constants)
    } else {
      console.log('---Component Name Error---')
    }
  })
})
