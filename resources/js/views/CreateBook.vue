<template>
  <div class="well">
    <form @submit.prevent="addNewBook">
      <div class="form-group">
        <label class="font-bold mb-2" for="title">Title</label>
        <input type="text" name="title" id="title" v-model="values.title">
      </div>
      <div class="form-group">
        <label class="font-bold mb-2" for="author">Author</label>
        <input type="text" name="author" id="author" v-model="values.author">
      </div>
      <div class="form-group">
        <label class="font-bold mb-2" for="image">Image</label>
        <input type="text" name="image" id="image" v-model="values.image">
      </div>
      <div class="form-group">
        <label class="font-bold mb-2" for="description">Description</label>
        <textarea
          name="description"
          id="description"
          cols="30"
          rows="10"
          v-model="values.description"
        ></textarea>
      </div>
      <div class="form-group">
        <label class="font-bold mb-2" for="link">Link</label>
        <input type="text" name="link" id="link" v-model="values.link">
      </div>
      <div class="form-group">
        <label class="font-bold mb-2">
          <input type="checkbox" name="featured" v-model="values.featured" class="mr-2">Featured
        </label>
      </div>
      <div class="form-group">
        <ApolloQuery :query="require('../graphql/queries/categories.gql')">
          <template slot-scope="{ result: { data, loading }, isLoading }">
            <div v-if="isLoading">Loading...</div>
            <select v-else v-model="values.category_id">
              <option
                v-for="category of data.categories"
                :key="category.id"
                :value="category.id"
              >{{ category.name }}</option>
            </select>
          </template>
        </ApolloQuery>
      </div>

      <div class="form-group">
        <button type="submit" class="btn btn-primary">Add book</button>
      </div>
    </form>
  </div>
</template>

<script>
import createBook from "../graphql/mutations/CreateBook.gql";
export default {
  name: "create-book",
  data() {
    return {
      values: {
        title: "",
        author: "",
        image: "",
        description: "",
        link: "",
        featured: false,
        category_id: 1
      }
    };
  },
  methods: {
    addNewBook() {
      let values = this.values;
      this.$apollo
        .mutate({
          mutation: createBook,
          variables: values
        })
        .then(data => {
          console.log(data);
        })
        .catch(error => {
          alert("error");
        });
    }
  }
};
</script>

<style>
</style>
