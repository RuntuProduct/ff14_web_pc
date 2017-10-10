import 'babel-polyfill'
import dva from 'dva'
import createLoading from 'dva-loading'
import { browserHistory } from 'dva/router'
import { message } from 'antd'
import moment from 'moment'
import 'moment/locale/zh-cn'
import './index.html'
import './index.css'
import './styles/lib/animate.css'    // 引入全局样式动画库

moment.locale('zh-cn')

// 1. Initialize
const app = dva({
  ...createLoading({
    effects: true,
  }),
  history: browserHistory,
  onError(error) {
    console.error(error)
    message.error(error.message)
  },
})

// 2. Model
app.model(require('./models/app'))
app.model(require('./models/login'))
app.model(require('./models/page'))
app.model(require('./models/utils'))

// 3. Router
app.router(require('./router'))

// 4. Start
app.start('#root')
