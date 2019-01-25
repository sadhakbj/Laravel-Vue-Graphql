<template>
  <div>
    <ApolloQuery
      :query="require('../graphql/queries/book.gql')"
      :variables="{id: $route.params.id}"
    >
      <template slot-scope="{ result: { data, loading }, isLoading }">
        <div v-if="isLoading">Loading...</div>
        <div v-else>
          <strong>{{ data.book.title }}</strong> by
          <i>{{ data.book.author }}</i>
          <p>{{ data.book.description }}</p>
          <router-link :to="{ name: 'books.edit', params: {id: $route.params.id}}">Edit</router-link>
          <a href="#" @click.prevent="handleBookDelete" class="btn btn-danger">Delete</a>
        </div>
      </template>
    </ApolloQuery>
  </div>
</template>

<script type="text/ecmascript-6">
import deleteBook from "../graphql/mutations/Book/DeleteBook.gql";
export default {
  name: "book",
  methods: {
    handleBookDelete() {
      if (confirm("Are you sure to delete it ?")) {
        this.$apollo
          .mutate({
            mutation: deleteBook,
            variables: {
              id: this.$route.params.id
            }
          })
          .then(data => {
            this.$router.push("/");
          });
      }
    }
  }
};
</script>

<style>
</style>
