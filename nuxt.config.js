
export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    { src: '~/assets/scss/default.scss', lang: 'scss' },
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/axios' },
    { src: '~/plugins/shared/bus' },
    { src: '~/plugins/shared/confirm' },
    { src: '~/plugins/shared/notification' },
  ],
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/apollo',
    '@nuxtjs/style-resources',
    '~/modules/engine',
  ],
  /*
  ** Nuxt.js modular architecture using 'engines'
  */
  engines: {
    finance: {
      mount: "/finance",
      namespaceStore: "finance",
    },
    inventory: {
      mount: "/inventory",
      namespaceStore: "inventory",
    }
  },

  apollo: {
    includeNodeModules: true,
    clientConfigs: {
      default: '~/apollo/clientConfig'
    }
  },

  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extractCSS: true,
    styleResources: {
      scss: [
        'assets/scss/*.scss'
      ]
    },
    extend(config, ctx) {
    }
  }
}
