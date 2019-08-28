<template>
  <div class="activity-create-form">
    <a
      v-if="!isFormDisplayed"
      class="button is-primary is-block is-alt is-large"
      href="#"
      @click="toggleFormDisplay"
    >New Activity</a>
    <div class="create-form" v-if="isFormDisplayed">
      <h2>Create Activity</h2>
      <form>
        <div class="field">
          <label class="label">Title</label>
          <div class="control">
            <input
              v-model="newActivity.title"
              class="input"
              type="text"
              placeholder="Activity Title"
            />
          </div>
        </div>
        <div class="field">
          <label for class="label">Notes</label>
          <div class="control">
            <textarea class="textarea" placeholder="Notes" v-model="newActivity.notes"></textarea>
          </div>
        </div>
        <div class="field">
          <label for class="label">Catagory</label>
          <div class="control">
            <select class="select" v-model="newActivity.category">
              <option value disabled>Please select category</option>
              <option
                v-for="category in categories"
                :value="category.id"
                :key="category.id"
              >{{ category.text }}</option>
            </select>
          </div>
        </div>
        <div class="field is-grouped">
          <div class="control">
            <button
              class="button is-link"
              @click.prevent="createActivity"
              :disabled="!isFormValid"
            >Create Activity</button>
          </div>
          <div class="control">
            <button class="button is-text" @click="toggleFormDisplay">Cancel</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { createActivityAPI } from "../api";

export default {
  name: "ActivityCreate",
  props: {
    categories: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isFormDisplayed: false,
      newActivity: { title: "", notes: "", category: "" }
    };
  },
  computed: {
    isFormValid() {
      return (
        this.newActivity.title &&
        this.newActivity.notes &&
        this.newActivity.category
      );
    }
  },
  methods: {
    toggleFormDisplay() {
      this.isFormDisplayed = !this.isFormDisplayed;
    },
    createActivity() {
      createActivityAPI({ ...this.newActivity }).then(activity => {
        this.newActivity = { title: "", notes: "", category: "" };
        this.isFormDisplayed = false;
        this.$emit("activityCreated", { ...activity });
      });
    }
  }
};
</script>