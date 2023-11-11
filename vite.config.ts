import { defineConfig } from 'vite'
import { UserConfigExport, ConfigEnv } from 'vite'
import { viteMockServe } from 'vite-plugin-mock'
import vue from '@vitejs/plugin-vue'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'
import { loadEnv } from 'vite'

// https://vitejs.dev/config/
export default defineConfig(
  ({ command, mode }: ConfigEnv): UserConfigExport => {
    let env = loadEnv(mode, process.cwd())
    return {
      plugins: [
        vue(),
        createSvgIconsPlugin({
          iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
          symbolId: 'icon-[dir]-[name]',
        }),
        viteMockServe({
          // enable: command === 'serve',
          localEnabled: command === 'serve',
        }),
      ],
      css: {
        preprocessorOptions: {
          scss: {
            javascriptEnabled: true,
            additionalData: `@import "./src/styles/variable.scss";`,
          },
        },
      },
      resolve: {
        alias: {
          '@': path.resolve('./src'), //相对路径别名配置，使用@代替src
        },
      },
      server: {
        proxy: {
          [env.VITE_APP_BASE_API]: {
            //获取数据服务器地址的设置
            target: env.VITE_SERVE,
            //需要代理跨域
            changeOrigin: true,
            //路径重写
            rewrite: (path) => path.replace(/^\/api/, ''),
          },
        },
      },
    }
  },
)
