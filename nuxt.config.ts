import {defineNuxtConfig} from 'nuxt/config';

export default defineNuxtConfig({
    modules: [
        '@pinia/nuxt',
    ],
    alias: {
        pinia: '/node_modules/@pinia/nuxt/node_modules/pinia/dist/pinia.mjs'
    },
    plugins: [
        {src: '~/plugins/bootstrap.js', mode: 'client'}
    ],
    app: {
        head: {
            htmlAttrs: {
                lang: 'fr'
            },
            link: [
                {rel: 'stylesheet', href: 'https://cdn.digityser.com/fa6_2/css/all.min.css'},
            ],
        },
    },
} as any);
