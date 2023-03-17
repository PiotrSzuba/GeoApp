import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import postcss from './postcss.config.cjs';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig( {
  plugins: [ react(), tsconfigPaths() ],
  css: {
    postcss
  },
  resolve: {
    alias: { src: '/src' }
  }
} );
