import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from './axios'
import Button from 'vant'
import 'vant/es/button/style/index'
import Dialog from 'vant'
import 'vant/es/dialog/style/index'
import Cell from 'vant'
import 'vant/es/cell/style/index'
import CellGroup from 'vant'
import 'vant/es/cell-group/style/index'
import Field from 'vant'
import 'vant/es/field/style/index'
import Form from 'vant'
import 'vant/es/form/style/index'
import NavBar from 'vant'
import 'vant/es/nav-bar/style/index'
import Popup from 'vant'
import 'vant/es/popup/style/index'
import Picker from 'vant'
import 'vant/es/picker/style/index'
import Tag from 'vant'
import 'vant/es/tag/style/index'
import Toast from 'vant'
import 'vant/es/toast/style/index'
import Overlay from 'vant'
import 'vant/es/overlay/style/index'
import Radio from 'vant'
import 'vant/es/radio/style/index'
import RadioGroup from 'vant'
import 'vant/es/radio-group/style/index'
import NoticeBar from 'vant'
import 'vant/es/notice-bar/style/index'
import SwipeItem from 'vant'
import 'vant/es/swipe-item/style/index'
import Swipe from 'vant'
import 'vant/es/swipe/style/index'
import Divider from 'vant'
import 'vant/es/divider/style/index'
import GridItem from 'vant'
import 'vant/es/grid-item/style/index'
import Grid from 'vant'
import 'vant/es/grid/style/index'
import ShareSheet from 'vant'
import 'vant/es/share-sheet/style/index'
import Pagination from 'vant'
import 'vant/es/pagination/style/index'

createApp(App)
.use(router)
.use(axios)
.use(Button)
.use(Dialog)
.use(Cell)
.use(CellGroup)
.use(Field)
.use(Form)
.use(NavBar)
.use(Popup)
.use(Picker)
.use(Tag)
.use(Toast)
.use(Overlay)
.use(Radio)
.use(RadioGroup)
.use(NoticeBar)
.use(SwipeItem)
.use(Swipe)
.use(Divider)
.use(GridItem)
.use(Grid)
.use(ShareSheet)
.use(Pagination)
.mount('#app')
