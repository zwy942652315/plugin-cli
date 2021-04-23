// 请求 fs-extra 库，用于文件操作
const fse = require('fs-extra')
// 请求 chalk 库
const chalk = require('chalk')
// 请求 ora 库，用于实现等待动画
const ora = require('ora')
// 请求 log-symbols 库
const symbols = require('log-symbols')

const path = require('path')


projectPrompt = [
	{
		type: 'list',
		message: '请选择框架类型：',
		name: 'frameType',
		choices: ['vue', 'react', 'umi']
	},
  {
    type: 'input',
    message: 'Project name',
    name: 'projectName',
  },
  {
    type: 'input',
    message: 'Project description',
    name: 'description',
  },
  {
    type: 'input',
    message: 'Author',
    name: 'author',
  },
]

const templates = [
  {
		name: 'vue',
		description: '用于构建用户界面的渐进式框架',
	},
  {
		name: 'react',
		description: '用于构建用户界面的 JavaScript 库',
	},
]


async function list() {

  console.log()
  
  // Spinner 初始设置
  const dlSpinner = ora(chalk.cyan('show template...'))

  try {

    // 开始执行等待动画
    dlSpinner.start();

    console.log()
    console.log()
    templates.forEach(v => {
      console.log(
        '  ' + chalk.yellow('★') +
        '  ' + chalk.blue(v.name) +
        ' - ' + v.description)
    })
    console.log()

    dlSpinner.stop()
    
  } catch (err) {
    console.error(err)
    // 下载失败时提示
    dlSpinner.text = chalk.red(`show template failed. ${err}`)
    // 终止等待动画并显示 X 标志
    dlSpinner.fail()
    process.exit()
  }
}

// 将上面的 list(projectName) 方法导出
module.exports = list