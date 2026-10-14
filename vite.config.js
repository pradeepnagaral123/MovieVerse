import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react(), tailwindcss()],
    // Expose the MovieVerse AI (Groq) credentials under the VITE_ namespace so
    // the client can reach the chat API. These are read from the un-prefixed
    // keys in .env (GROK_API / GROK_MODEL) and injected at build time.
    define: {
      'import.meta.env.VITE_GROK_API': JSON.stringify(env.GROK_API || ''),
      'import.meta.env.VITE_GROK_MODEL': JSON.stringify(env.GROK_MODEL || 'openai/gpt-oss-120b'),
      'import.meta.env.VITE_GROK_BASE_URL': JSON.stringify(
        env.GROK_BASE_URL || 'https://api.groq.com/openai/v1'
      ),
    },
    server: {
      host: '0.0.0.0',
      port: 5173,
    },
  }
})
