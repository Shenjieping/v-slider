# 原生 Slider

## 使用方法

```html
<link rel="stylesheet" href="./css/slider.css">
<script src="/dist/slider.js"></script>
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
  input: function(val) { // 值改变时触发
    // console.log('....val::', val);
  },
  change: function(val) { // 值改变之后触发
    console.log(',,,', val);
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
| input | 进度变化时实时触发 | function(val) | -- |
| change | 进度变化且结束拖动后触发 | function(val) | -- |
| dragStart | 开始拖动时触发 | function() | -- |
| dragEnd | 结束拖动时触发 | function() | -- |