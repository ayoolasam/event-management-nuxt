// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
runtimeConfig:{
  public: {
    // apiBaseUrl:'http://localhost:5000'
     apiBaseUrl:'https://event-management-express.onrender.com'
},

},

  build: {
    transpile: ['maz-ui'],
  },
  vite: {
    resolve: {
      alias: {
        './types': './node_modules/maz-ui/components/types.d.ts', // Explicitly resolve the path
      },
    },
  },



  modules:['maz-ui/nuxt',
    [
    "@pinia/nuxt",
    {
      autoImports: ["defineStore", "acceptHMRUpdate"],
    },
  ],
    'pinia-plugin-persistedstate/nuxt',
  ],


 

  mazUi: {
    injectComponents: true,
    injectCss: true,
    injectAos: {
      injectCss: true,
    },
    injectUseToast: true,
    injectUseThemeHandler: true,
    devtools: true,
  },

 


  devtools: { enabled: true },
 

  css: ['~/assets/main.css',
     "remixicon/fonts/remixicon.css",
  ],




  imports: {
    dirs: ["stores"],
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  compatibilityDate: '2024-11-17',
})