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
        </div>
      </template>
    </ApolloQuery>
  </div>
</template>

<script>
export default {
  name: "book"
};
</script>

<style>
</style>
