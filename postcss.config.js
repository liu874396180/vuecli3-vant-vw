const join = require('path').join
// const tailwindJS = join(__dirname, 'tailwind.js')
module.exports = ({ file }) => {
  let vwUnit // 判断条件 请自行调整 我使用的是 mand-mobile ui 没有对vant引入进行测试
  if (file && file.dirname && file.dirname.indexOf('vant') > -1) {
    vwUnit = 375
  } else {
    vwUnit = 750
  }
  return {
    plugins: [
      // require('tailwindcss')(tailwindJS),
      require('postcss-px-to-viewport')({
        viewportWidth: vwUnit,
        unitPrecision: 3,
        viewportUnit: 'vw',
        selectorBlackList: ['.ignore', '.hairlines'],
        minPixelValue: 1,
        mediaQuery: false
      })
    ]
  }
}