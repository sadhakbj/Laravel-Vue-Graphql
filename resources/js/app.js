require('./bootstrap');

import Vue from 'vue';
import Router from './router';
import apolloProvider from './apollo';

import AppHeader from './views/layouts/Header.vue';

const app = new Vue({
    el: '#app',
    router: Router,
    apolloProvider,
    components: {
        AppHeader
    }
});
