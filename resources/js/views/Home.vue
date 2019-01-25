<template>
  <div>
    <h1>Categories</h1>
    <ApolloQuery :query="categoriesQuery">
      <template slot-scope="{ result: { data, loading }, isLoading }">
        <div v-if="isLoading">Loading...</div>
        <div v-else>
          <a href="#" class="category" @click.prevent="selectCategory('all')">All</a>
          <a href="#" class="category" @click.prevent="selectCategory('featured')">Featured</a>
          <a
            href="#"
            v-for="category of data.categories"
            :key="category.id"
            class="category"
            @click.prevent="selectCategory(category.id)"
          >{{ category.name }}</a>
        </div>
        <router-link :to="{name: 'books.create'}">Add new book.</router-link>
      </template>
    </ApolloQuery>

    <h1>Books</h1>
    <ApolloQuery :query="query" v-if="selectedCategory === 'all'">
      <template slot-scope="{ result: { data, loading }, isLoading }">
        <div v-if="isLoading">Loading...</div>
        <div v-else class="flex flex-wrap">
          <div v-for="book of data.books" :key="book.id" class="category">
            <router-link
              :to="{ name: 'books.show', params: {id: book.id}}"
            >{{ `${book.title} by ${book.author}` }}</router-link>
          </div>
        </div>
      </template>
    </ApolloQuery>

    <ApolloQuery
      :query="query"
      v-else-if="selectedCategory === 'featured'"
      :variables="{ featured: true}"
    >
      <template slot-scope="{ result: { data, loading }, isLoading }">
        <div v-if="isLoading">Loading...</div>
        <div v-else class="flex flex-wrap">
          <div v-for="book of data.featuredBooks" :key="book.id" class="category">
            <router-link
              :to="{ name: 'books.show', params: {id: book.id}}"
            >{{ `${book.title} by ${book.author}` }}</router-link>
          </div>
        </div>
      </template>
    </ApolloQuery>

    <ApolloQuery :query="query" :variables="{id: selectedCategory}" v-else>
      <template slot-scope="{ result: { data, loading }, isLoading }">
        <div v-if="isLoading">Loading...</div>
        <div v-else>
          <div
            v-for="book of data.category.books"
            :to="{ name: 'books.show', params: {id: book.id}}"
            :key="book.id"
            class="category"
          >
            <router-link
              :to="{ name: 'books.show', params: {id: book.id}}"
            >{{ `${book.title} by ${book.author}` }}</router-link>
          </div>
        </div>
      </template>
    </ApolloQuery>
  </div>
</template>

<script>
import categoryQuery from "../graphql/queries/Category.gql";
import categoriesQuery from "../graphql/queries/categories.gql";
import booksQuery from "../graphql/queries/books.gql";
import featuredBooksQuery from "../graphql/queries/FeaturedBooks.gql";

export default {
  name: "home",
  data() {
    return {
      categoriesQuery,
      selectedCategory: 1,
      query: categoryQuery
    };
  },
  components: {},
  methods: {
    /**
     * @param String category
     */
    selectCategory(category) {
      if (category === "all") {
        this.query = booksQuery;
      } else if (category === "featured") {
        this.query = featuredBooksQuery;
      } else {
        this.query = categoryQuery;
      }

      this.selectedCategory = category;
    }
  }
};
</script>

<style scopped>
.category {
  list-style: none;
  padding: 12px;
  color: blue;
}
</style>
