const inquirer = require('@inquirer/prompts')
const fs = require('fs')
const path = require('path')

inquirer.input({ message: 'Enter Editor Name' }).then((text) => {
  const name = text
    .trim()
    .split('')
    .map((d) => (d ? d.toLowerCase() : ''))
    .join('')
  if (name) {
    const editorName = `${name
      .split('')
      .map((d, i) => (i === 0 ? d.toUpperCase() : d))
      .join('')}Editor`

    const rootPath = `${path.join(__dirname, '../')}/src/dw/components/editor`
    const defaultEditorText = fs.readFileSync(`${rootPath}/TextEditor/index.tsx`, 'utf8')

    const readDir = fs.readdirSync(`${rootPath}`, { withFileTypes: true })
    const editorArr = []
    for (let i = 0; i < readDir.length; i++) {
      if (!readDir[i].name.endsWith('.ts')) {
        editorArr.push(readDir[i].name)
      }
    }

    if (editorArr.includes(editorName)) {
      console.log(`---${editorName} 已存在，请查看---`)
    } else {
      fs.mkdirSync(`${rootPath}/${editorName}`)
      fs.writeFile(
        `${rootPath}/${editorName}/index.tsx`,
        defaultEditorText.replace(/TextEditor/g, editorName),
        (err) => {
          if (err) throw err
          console.log('---File is created successfully---')
        },
      )

      let editorMapText = ``
      editorArr.forEach((d) => {
        editorMapText += `import ${d} from 'dw/components/editor/${d}'\n`
      })
      editorMapText += `import ${editorName} from 'dw/components/editor/${editorName}'\n`
      editorMapText += `\n`

      editorMapText += `export type EditorMapProp = {\n`
      editorArr.forEach((d) => {
        editorMapText += `  ${d.replace(/Editor/g, '')}: any\n`
      })
      editorMapText += `  ${editorName.replace(/Editor/g, '')}: any\n`
      editorMapText += `}\n`

      editorMapText += `const editorMap: EditorMapProp = {\n`
      editorArr.forEach((d) => {
        editorMapText += `  ${d.replace(/Editor/g, '')}: ${d},\n`
      })
      editorMapText += `  ${editorName.replace(/Editor/g, '')}: ${editorName},\n`
      editorMapText += `}\n`

      editorMapText += `export default editorMap\n`

      fs.writeFile(`${rootPath}/index.ts`, editorMapText, (err) => {
        if (err) throw err
        console.log('---editorMapText successfully---')
      })
    }
  } else {
    console.log('---editor name error---')
  }
})
