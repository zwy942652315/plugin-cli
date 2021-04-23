// 请求 download 库，用于下载模板
const download = require('download-git-repo')
// 请求 ora 库，用于实现等待动画
const ora = require('ora')
// 请求 chalk 库，用于实现控制台字符样式
const chalk = require('chalk')
const path = require('path')
// 请求 inquirer 库，用于控制台交互
const inquirer = require('inquirer')
// 请求 template.js 文件
const initTemplate = require('./template')

const frameTypePath = {
  vue: 'zwy942652315/vue2-init',
  react: 'zwy942652315/react-init'
}

const projectPrompt = [
	{
		type: 'list',
		message: '请选择框架类型：',
		name: 'frameType',
    choices: ['vue', 'react'],
	},
  {
    type: 'input',
    message: 'Project name',
    name: 'name',
    default: ''
  },
  {
    type: 'input',
    message: 'version',
    name: 'version',
    default: '1.0.0'

  },
  {
    type: 'input',
    message: 'Project description',
    name: 'description',
    default: 'Project description'
  },
  {
    type: 'input',
    message: 'Author',
    name: 'author',
  },
]

async function dlTemplate(projectName) {
  const { frameType, ...options } = await inquirer.prompt(projectPrompt)
  if (!options.name) options.name = projectName
  
  // Spinner 初始设置
  const dlSpinner = ora(chalk.cyan('Downloading template...'))

  // 开始执行等待动画
  dlSpinner.start()
  try {
    // 下载模板后解压
    await download(frameTypePath[frameType], path.resolve(__dirname, `../${projectName}/`), function (err) {
      if (!err) {
        initTemplate(projectName, options)
      }
    })
  } catch (err) {
    // 下载失败时提示
    dlSpinner.text = chalk.red(`Download template failed. ${err}`)
    // 终止等待动画并显示 X 标志
    dlSpinner.fail()
    process.exit()
  }
  // 下载成功时提示
  dlSpinner.text = 'Download template successful.'
  // 终止等待动画并显示 ✔ 标志
  dlSpinner.succeed()
}


// 将上面的 dlTemplate() 方法导出
module.exports = dlTemplate