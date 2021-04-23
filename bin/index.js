#!/usr/bin/env node

// 请求 chalk 库
const chalk = require('chalk')
// 请求 commander 库
const program = require('commander')

// 请求 lib/init.js
const initProject = require('../lib/init')

// 请求 lib/list.js
const list = require('../lib/list')

// 从 package.json 文件中请求 version 字段的值，-v和--version是参数
program.version(require('../package.json').version, '-v, --version')

// help
program.on('--help', () => {
  console.log()
  console.log('  Examples:')
  console.log()
  console.log(chalk.gray('    # create a new project from a template'))
  console.log('    $ plugin-cli init my-project')
  console.log()
})

// 列举模板
program
  .command('list')
  .description('list available templates:')
  .action(() => {
    list();
  })

// init 初始化项目
program
  .command('init <project_name>')
  .description('create a new project from a template')
  .action(project => {
    initProject(project)
  })

// 解析命令行参数
program.parse(process.argv)