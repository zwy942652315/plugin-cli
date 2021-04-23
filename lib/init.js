// 请求 fs-extra 库，用于文件操作
const fse = require('fs-extra')
// 请求 inquirer 库，用于控制台交互
const inquirer = require('inquirer')

const path = require('path')

// 请求 download.js 文件
const dlTemplate = require('./download')


async function initProject(projectName) {
  // 当前创建项目目录路径
  const projectPath = path.resolve(__dirname, '../' + projectName)
  const exists = await fse.pathExists(projectPath)
  if (exists) {
    inquirer
      .prompt([
        {
          type: 'confirm',
          message: 'Project name exists, Continue?',
          name: 'ok',
        }
      ])
      .then(async (answers) => {
        if (answers.ok) {
          await fse.remove(projectPath, err => {
            if (err) return console.error(err)
          })
          await dlTemplate(projectName)
        }
      })
      .catch(error => {
        console.error(error)
        process.exit()
      });
  } else {
    await dlTemplate(projectName)
  }
}

// 将上面的 initProject 方法导出
module.exports = initProject