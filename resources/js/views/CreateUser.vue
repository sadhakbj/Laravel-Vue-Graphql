<template>
  <div class="create-user">
    <h1>Add New User</h1>
    <form @submit.prevent="handleSubmit">
      <div class="alert alert-danger" role="alert" v-if="validationErrors.length !== 0">
        <ul>
          <li v-for="(error, key) in validationErrors" :key="key">{{ error[0] }}</li>
        </ul>
      </div>
      <div class="form-group">
        <label class="control-label">Name</label>
        <input type="text" class="form-control" placeholder="Name" v-model="user.name">
      </div>

      <div class="form-group">
        <label class="control-label">Email</label>
        <input type="email" class="form-control" placeholder="Email" v-model="user.email">
      </div>

      <div class="form-group">
        <label class="control-label">Password</label>
        <input type="password" class="form-control" placeholder="Password" v-model="user.password">
      </div>

      <button class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script type="text/ecmascript-6">
import gql from "graphql-tag";
export default {
  name: "create-user",
  data() {
    return {
      user: {},
      validationErrors: []
    };
  },
  methods: {
    handleSubmit() {
      const values = this.user;
      this.$apollo
        .mutate({
          mutation: gql`
            mutation($name: String, $email: String, $password: String) {
              createUser(name: $name, email: $email, password: $password) {
                id
                name
                email
              }
            }
          `,
          variables: values
        })
        .then(response => {
          this.$router.push("/users");
        })
        .catch(error => {
          let { graphQLErrors } = error;
          if (graphQLErrors[0].extensions.category === "validation") {
            this.validationErrors = graphQLErrors[0].extensions.validation;
          }
        });
    }
  }
};
</script>

<style>
</style>
