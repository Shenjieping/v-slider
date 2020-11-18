// 支持ES6语法
import babel from 'rollup-plugin-babel';
import serve from 'rollup-plugin-serve';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import {terser} from 'rollup-plugin-terser';

const type = process.env.TYPE || 'umd';
const env = process.env.ENV;

export default {
  input: './src/index.js', // 以哪个文件作为打包的入口
  output: {
    file: `dist/${env === 'production' ? `slider.${type === 'umd' ? 'min' : type}` : 'slider'}.js`, // 出口路径
    name: 'Slider', // 指定打包后全局变量的名字
    format: type, // 统一模块规范
    sourcemap: env === 'development' // es6 -> es5 开启源码调试模式，可以找到源码报错的位置
  },
  plugins: [
    babel({
      exclude: 'node_modules/**' // 忽略node_modules下的所有文件
    }),
    resolve(),
    commonjs(),
    // 判断只有开发环境才需要启动服务
    env === 'development' && serve({
      open: false,
      openPage: '/public/index.html', // 默认打开的html路径
      port: 3000,
      contentBase: ''
    }),
    env === 'production' && terser()
  ]
}