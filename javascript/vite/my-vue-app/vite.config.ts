import { UserConfigExport  } from 'vite'
import vue from '@vitejs/plugin-vue'
import devcert from 'devcert'


// https://vitejs.dev/config/
export default async (): Promise<UserConfigExport> => {
  const { key, cert } = await devcert.certificateFor('localhost')

  return {
    plugins: [vue()],
    server: {
      open: true,
      https: {
        key,
        cert,
      },
    },
  }
}
