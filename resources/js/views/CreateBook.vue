<template>
  <div class="offset-3">
    <div class="col-md-6">
      <form @submit.prevent="handleFormSubmit">
        <div class="form-group">
          <label class="control-label" for="title">Title</label>
          <input type="text" name="title" id="title" v-model="book.title" class="form-control">
        </div>
        <div class="form-group">
          <label class="control-label" for="author">Author</label>
          <input type="text" name="author" id="author" v-model="book.author" class="form-control">
        </div>
        <div class="form-group">
          <label class="control-label" for="image">Image</label>
          <input type="text" name="image" id="image" v-model="book.image" class="form-control">
        </div>
        <div class="form-group">
          <label class="control-label" for="description">Description</label>
          <textarea
            name="description"
            id="description"
            cols="30"
            rows="10"
            v-model="book.description"
            class="form-control"
          ></textarea>
        </div>
        <div class="form-group">
          <label class="control-label" for="link">Link</label>
          <input type="text" name="link" id="link" v-model="book.link" class="form-control">
        </div>
        <div class="form-group">
          <label class="control-label">
            <input type="checkbox" name="featured" v-model="book.featured" class="mr-2">Featured
          </label>
        </div>
        <div class="form-group">
          <ApolloQuery :query="require('../graphql/queries/categories.gql')">
            <template slot-scope="{ result: { data, loading }, isLoading }">
              <div v-if="isLoading">Loading...</div>
              <select v-else v-model="book.category_id" class="form-control">
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
  </div>
</template>

<script type="text/ecmascript-6">
import createBook from "../graphql/mutations/Book/CreateBook.gql";
import updateBook from "../graphql/mutations/Book/UpdateBook.gql";
import BookQuery from "../graphql/queries/book.gql";
export default {
  name: "create-book",
  data() {
    return {
      fetchData: false,
      formSubmitQuery: createBook,
      book: {
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
  created() {
    if (this.$route.name === "books.edit") {
      this.formSubmitQuery = updateBook;
      this.book.id = this.$route.params.id;

      this.$apollo
        .query({
          query: BookQuery,
          variables: {
            id: this.$route.params.id
          }
        })
        .then(({ data }) => {
          this.book = data.book;
        });
    } else {
      alert("i am creating a new thing");
    }
  },
  methods: {
    handleFormSubmit() {
      let values = this.book;
      this.$apollo
        .mutate({
          mutation: this.formSubmitQuery,
          variables: values
        })
        .then(data => {
          this.$router.push("/");
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
