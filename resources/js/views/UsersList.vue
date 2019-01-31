<template>
  <div class="users-list">
    <h1>Users List</h1>
    <router-link :to="{ name: 'users.create'}" class="btn btn-primary">Create new user</router-link>
    <hr>
    <ul>
      <li v-for="user in users" :key="user.id">{{ user.name }}</li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
import gql from "graphql-tag";
export default {
  name: "user-list",
  data() {
    return {
      users: []
    };
  },
  mounted() {
    this.$apollo
      .query({
        query: gql`
          query {
            users {
              id
              name
            }
          }
        `
      })
      .then(({ data }) => {
        this.users = data.users;
      });
  }
};
</script>

<style>
</style>
