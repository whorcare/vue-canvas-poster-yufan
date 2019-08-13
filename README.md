# vue-canvas-poster-yufan
vue-canvas-poster-yufan是一个基于vue+canvas通过简单的数据生成复杂canvas图片的组件
# 生成效果
![生成一个简单海报图片](https://3img.evente.cn/89/24/c5/2f8bd4af2030c57438fbdb8735.jpg?imageView2/2/w/740)
# 安装
```
npm i vue-canvas-poster-yufan
```
# 使用组件
##### 注册
```
// 全局
import canvasPoster from 'vue-canvas-poster-yufan'
Vue.use(canvasPoster)
```
##### 使用
```
// 页面
<canvas-poster :drawData="drawData" @success="success"></canvas-poster>
```
# API
### drawData（数据）
属性 | 含义 |  类型 |默认值 | 可选值 |是否必填
---|---|---|---|---|---
width| 生成图片宽度 | Number| | |是|
height| 生成图片高度 | Number| | |是|
backgroundColor| 背景颜色 |String | #ffffff | |否|
debug| 是否开启调试模式 | Boolean | false | |否|
views| 绘制核心数据(数组对象 见下表) | Array |   | |是|

### image字段（绘制图片）
属性 | 含义 |  默认值 | 可选值 |是否必填
---|---|---|---|---
url| 图片地址 自持远程图片 & 本地图片：require('./assets/x.png')  |" " | | 是|
top| 图片距离顶部距离 | 0| | 是|
left| 图片距离左边距离|0|  | 是|
width| 图片宽度 |0  |  | 是|
height| 图片高度 | 0 |   | 是|
borderRadius| 图片圆角 | 0 |   | 否|
borderWidth| 图片边框 | 0 |   | 否|
borderColor| 图片边框颜色 |rgba(255,255,255,0)  |   |否 |

### text字段（绘制文字）
属性 | 含义 |  默认值 | 可选值 |是否必填
---|---|---|---|---
top| 文字距离顶部距离 |0 | | 是|
left| 文字距离左边距离 | 0| | 是|
content| 文字内容 | '' |   | 是 |
fontSize| 文字字号（px）|16|  | 否|
color| 文字颜色 | #000 |  | 否|
baseLine| 文字基线对齐 | bottom | top  middle bottom | 否|
textAlign| 文字对齐 | left |  left center right  | 否 |
opacity|透明度 | 1  | 0-1|否 |
width|文字最大长度 |  | | 否 |
lineNum|文字最大折行数 | 1|  |否 |
lineHeight| 文字行高| 0|  |否 |
fontWeight| 文字加粗|  normal|100-900 |否 |
fontFamily|文字字体 | Microsoft YaHei |  |否 |

### line字段（绘制线段）
属性 | 含义 |  默认值 | 可选值 |是否必填
---|---|---|---|---
startX| 开始坐标X | | | 是|
startY| 开始坐标Y | | |是 |
endX| 结束坐标X | | | 是|
endY| 结束坐标Y | | | 是|
color| 线颜色 |#000 | |否 |
width| 线粗细 | 1 | |否 |
lineCap| 设置结束端点样式 | butt |butt round square | 否|

### rect字段（绘制矩形 内部可添加文字）
属性 | 含义 |  默认值 | 可选值 |是否必填
---|---|---|---|---
width| 矩形宽度 | | | 是|
height| 矩形高度 | | |是 |
x| 开始坐标X | | | 是|
y| 开始坐标Y | | | 是|
text| 文字（对象 参数见字段text） | | |否 |
paddingLeft| 左内边距 | 0| | 否|
paddingRight| 右内边距 |0 | |否 |
borderWidth| 边框宽度 | 0| | 否|
backgroundColor| 背景颜色 | | |否 |
borderColor| 边框颜色 | | | 否|
borderRadius| 圆角 | 0| |否 |
opacity| 透明度 | 1| | 否|


