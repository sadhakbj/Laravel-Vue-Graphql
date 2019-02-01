# GraphQL with Laravel and VueJS

## Introduction

Simple Example Single Page application for GraphQL.

## Technologies used:

-   Laravel 5.7.\*
-   VueJS 2.5.\*
-   Lighthouse PHP
-   Vue Apollo
-   MySQL

## Installation Guide:

-   Clone from bitbucket`git clone git@bitbucket.org:smartmobe/laravel-vue-graphql-example.git`
-   cd `laravel-vue-graphql-example`
-   Install composer: `composer install`
-   Copy `.env.example` file: `cp .env.example .env`
-   Generate key: `php artisan key:generate`
-   Set the database credentials in `.env` file
-   Run migration: `php artisan migrate`
-   Run seeder: `php artisan db:seed`
-   Install npm dependencies: `npm install` or `yarn`
-   Compile JS and CSS: `npm run dev` or `yarn dev`
-   Serve application: `php artisan serve`
-   Access: `http://localhost:8000` or use Valet or Apache virtualhost
