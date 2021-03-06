import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const Books = { template: '<div>Books go here</div>' };

import HomePage from '../views/Home.vue';
import Book from '../views/Book.vue';
import CreateBook from '../views/CreateBook.vue';

import UserList from '../views/UsersList.vue';
import CreateUser from '../views/CreateUser.vue';

const routes = [
    {
        path: '/',
        component: HomePage,
        name: 'home'
    },
    {
        path: '/users',
        component: UserList,
        name: 'users.index'
    },
    {
        path: '/users/create',
        component: CreateUser,
        name: 'users.create'
    },
    {
        path: '/books',
        component: Books,
        name: 'books'
    },
    {
        path: '/books/create',
        name: 'books.create',
        component: CreateBook
    },
    {
        path: '/books/:id',
        name: 'books.show',
        component: Book
    },
    {
        path: '/books/:id/edit',
        name: 'books.edit',
        component: CreateBook
    }
];

const router = new VueRouter({
    routes,
    linkActiveClass: 'active',
    mode: 'history'
});

export default router;
