require('./bootstrap');

import Vue from 'vue';
import Router from './router';
import apolloProvider from './apollo';

const app = new Vue({
    el: '#app',
    router: Router,
    apolloProvider
});
