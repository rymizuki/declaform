import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  optimizeDeps: {
    include: ['@declaform/core', '@declaform/react']
  },
  build: {
    watch: {
      include: ['../packages/core/build/*.js', '../packages/react/build/*.js']
    },
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name]/bundle.js',
        chunkFileNames: 'chunk/[name]/bundle.js'
      }
    }
  }
})
