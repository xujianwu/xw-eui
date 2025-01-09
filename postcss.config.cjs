/* eslint-env node */
module.exports = {
  plugins: [
    require('postcss-nested'),
    require('postcss-each-variables'),
    // PostCSS-each 是一个 PostCSS 插件，它允许你在 CSS 中使用 for 循环
    require('postcss-each')({
      plugins: {
        beforeEach: [require('postcss-for'), require('postcss-color-mix')]
      }
    }),
    // require('cssnano')({ preset: 'default' })
  ]
}
