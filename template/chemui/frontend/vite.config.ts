import { defineConfig, loadEnv, UserConfig } from "vite"
import react from "@vitejs/plugin-react-swc"

/**
 * Vite configuration for Streamlit React Component development
 *
 * @see https://vitejs.dev/config/ for complete Vite configuration options
 */
const nodeEnv = process.env.NODE_ENV === "production" ? '"production"' : '"development"';
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  const port = env.VITE_PORT ? parseInt(env.VITE_PORT) : 3001
  const define = {
    global: {},
    "process.env": process.env,
    "process.env.NODE_ENV": nodeEnv
  };
  return {
    define,
    base: "./",
    plugins: [react()],
    optimizeDeps: {
      include: ["ajv", 'raphael', 'ketcher-core'], // 告诉 Vite 用 esbuild 预编译 ajv
      force: true,
    },
    server: {
      port,
      proxy: {
        "/v2": {
          target: "https://sciminer.protonunfold.com/",
          changeOrigin: true,
        }
      }
    },
    build: {
      outDir: "build",
      minify: false,
      // 很重要，ketcher-core 有部分使用commonjs,加入这个可以解决commonjs的问题

      commonjsOptions: {
        transformMixedEsModules: true, // 处理混合模块
        include: [/ketcher-core/, /node_modules/] // 包含这些模块
      }
      // commonjsOptions: {
      //   include: [/node_modules/], // 确保打包时也能处理 CJS
      // },
      // rollupOptions: {
      //   plugins: [
      //     commonjs({
      //       include: [/node_modules\/(raphael|ketcher-core)/], // 只转换需要转的包
      //       transformMixedEsModules: true,
      //     }),
      //   ],
      // },
    },
  } satisfies UserConfig
})
