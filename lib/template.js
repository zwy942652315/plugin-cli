// 请求 fs-extra 库，用于文件操作
const fse = require('fs-extra')
const path = require('path')

async function initTemplate(name, options) {
  // 当前创建项目目录路径
  const projectPath = path.resolve(__dirname, '../' + name)
  const packagePath = projectPath + '/package.json'
  await fse.readJson(packagePath, (err, packageObj) => {
    if (err) console.error(err)
    fse.writeFile(packagePath, JSON.stringify({ ...packageObj, ...options}, null, 4), err => {
      if (err) return console.error(err)
    })
  })
}


// 将上面的 initTemplate() 方法导出
module.exports = initTemplate