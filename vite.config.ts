import Uni from '@uni-helper/plugin-uni'
import Components from '@uni-helper/vite-plugin-uni-components'
import { defineConfig } from 'vite'
import { WotResolver } from '@uni-helper/vite-plugin-uni-components/resolvers'

export default defineConfig({
  plugins: [
    Components({
      resolvers: [WotResolver()]
    }),
    Uni(),
  ],
})
