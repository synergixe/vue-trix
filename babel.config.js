'use strict'

module.exports = {
  /*presets: [
    '@vue/app'
  ]*/
  presets: ['@babel/preset-env'],
  env: {
    test: {
      presets: [['@babel/preset-env']]
    }
  }
}
