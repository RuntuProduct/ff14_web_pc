const path = require('path');

export default {
  // 开发环境使用单entry
  "entry": "./src/index.js",
  "theme": "./theme.config.js",
  "cssModulesExclude": [
    './src/styles/lib/animate.css',
    './src/components/toolsCon/MultiCol/index.less'
  ],
  "outputPath": '../ff14_web_server/dist',
  "autoprefixer": {
    "browsers": [
      "last 2 versions", "iOS >= 8", "Android >= 4"
    ]
  },
  "xdllPlugin": {
    "exclude": [
      "babel-runtime"
    ],
    "include": [
      "dva/router",
      "dva/saga",
      "dva/fetch"
    ]
  },
  "extraBabelPlugins": [
    "transform-runtime",
    ["import", { "libraryName": "antd", "style": "css" }],
    ["module-resolver", {
      "root": ["./src"],
      "alias": {
        "@components": "components",
        "@utils": "utils",
        "@svg": "svg",
        "@routes": "routes",
        "@module": "models",
        "@services": "services",
        "@maps": 'maps',
      },
      "extensions": ['.js', '.jsx', '.es', '.es6', '.mjs'],
      // "cwd": "packagejson",
    }]
  ],
  "env": {
    "development": {
      "extraBabelPlugins": [
        "dva-hmr",
      ]
    }
  }
}
