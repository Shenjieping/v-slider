# 原生 Slider

## 使用方法

```html
<link rel="stylesheet" href="./css/slider.css">
<script src="/dist/slider.min.js"></script>
<!-- 或 import Slider from '/dist/slider.es.js' -->
<!-- 或 const Slider = require(/dist/slider.cjs.js) -->
```

```html
<p>第一个slider</p>
<div class="v-slider slider-0"></div>
<p>第二个slider</p>
<div class="v-slider slider-1"></div>
```

```js
new Slider({
  el: document.querySelector('.slider-0')
})

new Slider({
  value: 10, // 初始值 默认0
  max: 50, // 最大值 默认100
  min: -50, // 最小值 默认0
  step: 0.1, // 步长 默认1
  el: '.slider-1', // 初始化el 必填
  activeColor: '#f66', // 进度条激活态颜色
  inactiveColor: '#aaa', // 进度条非激活态颜色
  buttonSize: '12px', // 滑块按钮大小
  barHeight: '4px', // 进度条高度
  input: function(val) { // 值改变时触发
    console.log('input val::', val);
  },
  change: function(val) { // 值改变之后触发
    console.log('change val::', val);
  },
  dragStart: function() { // 开始拖动
    console.log('...dragStart...');
  },
  dragEnd: function() { // 拖动结束
    console.log('...dragEnd...');
  }
});
```

## 兼容性

默认只兼容移动端，如果要在PC端使用请引用 `public/js/touch.js`

## API

| 参数 | 说明 | 类型 |  默认值  |
|:-----|:---|:----| :----- |
| value | 初始值 | Number | 0 |
| max | 最大值 | Number | 100 |
| min | 最小值 | Number | 0 |
| step | 步长 | Number | 1 |
| el | slider容器 | DOMHTML  | 此值必填 |
| activeColor | 进度条激活态颜色 | string  | #1989fa |
| inactiveColor | 进度非激活态颜色 | string  | #e5e5e5 |
| buttonSize | 滑块按钮大小 | string  | 24px |
| barHeight | 进度条高度 | string  | 2px |
| input | 进度变化时实时触发 | function(val) | -- |
| change | 进度变化且结束拖动后触发 | function(val) | -- |
| dragStart | 开始拖动时触发 | function() | -- |
| dragEnd | 结束拖动时触发 | function() | -- |

## DEMO 演示

- [slider Demo](http://shenjp.top/v-slider/public/index.html)
- [audio-player](http://shenjp.top/v-audio-player/public/index.html)

## 开发

```bash
git clone https://github.com/Shenjieping/v-slider.git

npm install

npm run serve

npm run build       # 默认打包成umd规范
npm run build:es    # 打包成es6规范
npm run build:cjs   # 打包成commonjs规范
```