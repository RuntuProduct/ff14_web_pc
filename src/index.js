import 'babel-polyfill'
import dva from 'dva'
import createHistory from 'history/createBrowserHistory'
import createLoading from 'dva-loading'
import { message } from 'antd'
import moment from 'moment'
import 'moment/locale/zh-cn'
import './index.html'
import './index.css'
import './styles/lib/animate.css'    // 引入全局样式动画库
import { baseName } from './utils/config'

moment.locale('zh-cn')
const ERROR_MSG_DURATION = 3 // 3 秒

// 1. Initialize
const app = dva({
  history: createHistory({
    basename: baseName,
  }),
  onError(error) {
    console.error(error)
    message.error(error.message, ERROR_MSG_DURATION)
  },
})

// 2. Plugins
app.use(createLoading({ effects: true }))

// 3. Model
app.model(require('./models/app'))
app.model(require('./models/login'))
app.model(require('./models/page'))
app.model(require('./models/utils'))

// 4. Router
app.router(require('./router'))

// 5. Start
app.start('#root')
