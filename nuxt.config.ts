// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },
  modules: [
    "@pinia/nuxt",
    "@formkit/auto-animate",
    "@nuxtjs/i18n",
    "@nuxt/image",
    "@nuxtjs/color-mode",
    "@nuxt/content",
    "@nuxt/ui",
    "@nuxt/fonts",
    "nuxt-auth-utils",
    //"nuxt-aos",
    //"",
    //"dayjs-nuxt",
    "nuxt-bootstrap-icons",
    //"@nuxtjs/html-validator",
    "nuxt-mongoose",
    "@samk-dev/nuxt-vcalendar",
  ],
  bootstrapIcons: {
    display: "inline", // or 'component'
  },
  i18n: {
    locales: [
      {
        code: "en-US",
        iso: "en-US",
        name: "English",
        file: "en-US.json",
      },
      {
        code: "ru-RU",
        iso: "ru-RU",
        name: "Русский",
        file: "ru-RU.json",
      },
    ],
    defaultLocale: "en",
    lazy: true,
    langDir: "lang",
    strategy: "no_prefix",
    compilation: {
      strictMessage: false,
    },
  },
  //@ts-expect-error
  fileStorage: {
    mount: process.env.mount,
  },
  mongoose: {
    uri: process.env.MONGODB_URI,
    options: {},
    modelsDir: "models",
    devtools: true,
  },
  colorMode: {
    classSuffix: "",
  },
});
