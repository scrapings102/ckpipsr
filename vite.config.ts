import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode, command}) => {
  const env = loadEnv(mode, '.', '');
  // Ports and addresses come from frontend/.env, never from here, so the
  // site, the panel and the API agree on one set of values per machine.
  // Only the dev server needs them; a production build has no proxy.
  const need = (name: string) => {
    if (command === 'serve' && !env[name]) {
      throw new Error(`Missing ${name} in frontend/.env. Copy frontend/.env.example and fill it in.`);
    }
    return env[name];
  };
  return {
    plugins: [react(), tailwindcss()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    esbuild: {
      drop: command === 'build' ? ['console', 'debugger'] : [],
      legalComments: 'none',
    },
    build: {
      target: 'es2020',
      cssCodeSplit: true,
      minify: 'esbuild',
      chunkSizeWarningLimit: 800,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('lucide-react')) {
                return 'vendor-icons';
              }
              if (id.includes('recharts') || id.includes('d3-')) {
                return 'vendor-charts';
              }
              if (id.includes('@radix-ui')) {
                return 'vendor-radix';
              }
              if (id.includes('motion')) {
                return 'vendor-motion';
              }
              if (id.includes('gsap') || id.includes('lenis')) {
                return 'vendor-animation';
              }
              if (
                id.includes('/react/') ||
                id.includes('/react-dom/') ||
                id.includes('/react-router/') ||
                id.includes('/react-router-dom/')
              ) {
                return 'vendor-react';
              }
            }
          },
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      port: Number(need('SITE_PORT')),
      // A busy port is an error, not a quiet move to the next one, which
      // would leave the panel's links pointing at the wrong place.
      strictPort: true,
      proxy: {
        // Editable content (the hero, for now) is read from the admin API.
        // Proxied so the site fetches a same-origin /api path and needs no
        // CORS rules and no build-time knowledge of where the API lives.
        '/api': {
          target: need('VITE_API_PROXY_TARGET'),
          changeOrigin: true,
        },
        // Pictures and documents kept in the bucket are shown at /media and /documents; the API reads them.
        '/media': {
          target: need('VITE_API_PROXY_TARGET'),
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/media/, '/api/site-media'),
        },
        '/documents': {
          target: need('VITE_API_PROXY_TARGET'),
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/documents/, '/api/site-media/ipsr/documents'),
        },
        // The site assistant: its own small service, proxied the same way as
        // /api so the widget calls a same-origin path in dev and in production.
        '/chatbot-api': {
          target: need('VITE_CHATBOT_PROXY_TARGET'),
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/chatbot-api/, ''),
        },
      },
    },
  };
});
