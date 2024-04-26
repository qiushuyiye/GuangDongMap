import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base:'./',
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
    }
  },//用于放置生成的静态资源 (js、css、img、fonts) 的；（项目打包之后，静态资源会放在这个文件夹下）
  assetsDir: "assets",
  //默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存。你可以通过将这个选项设为 false 来关闭文件名哈希。(false的时候就是让原来的文件名不改变)
  filenameHashing: false,
  // 反向代理
  proxy: {
    // '/api': {
    //   target: 'http://xxx.xxxxx.xxx/',
    //   changeOrigin: true,
    //   rewrite: path => path.replace(/^\/api/, '')
    // }
  }
})
