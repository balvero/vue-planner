<template>
  <div id="vuePlanner">
    <nav class="navbar is-white topNav">
      <div class="container">
        <div class="navbar-brand">
          <!-- <h1>{{watchedAppName}}</h1> -->
          <h1>{{fullAppname}}</h1>
        </div>
      </div>
    </nav>
    <NavBar />
    <section class="container">
      <div class="columns">
        <div class="column is-3">
          <ActivityCreate @activityCreated="addActivity" :categories="categories" />
        </div>

        <div class="column is-9">
          <div class="box content" :class="{fetching: isFetching, 'has-error': error}">
            <div v-if="error">{{error}}</div>
            <div v-else>
              <div v-if="isFetching">Loading...</div>
              <ActivityItem
                v-for="activity in activities"
                :activity="activity"
                :categories="categories"
                :key="activity.id"
              ></ActivityItem>
            </div>
            <div v-if="!isFetching">
              <div class="activity-length">Currently {{activityLength }} activities</div>
              <div class="activity-motivation">{{activityMotivation}}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Vue from "vue";
import ActivityItem from "./components/ActivityItem";
import ActivityCreate from "./components/ActivityCreate";
import NavBar from "./components/NavBar";
import { fetchActivities, fetchCategories, fetchUser } from "@/api";
export default {
  name: "app",
  components: { ActivityItem, ActivityCreate, NavBar },
  data() {
    return {
      creator: "Bernard",
      appName: "Vue Planner",
      watchedAppName: "Activity Planner by Bernard",
      isFetching: false,
      error: null,
      isTextDisplayed: true,
      user: {},
      activities: {}
    };
  },
  computed: {
    fullAppname() {
      return this.appName + " by " + this.creator;
    },
    activityLength() {
      return Object.keys(this.activities).length;
    },
    activityMotivation() {
      if (this.activityLength && this.activityLength < 5) {
        return "Nice to see some goals :)";
      } else if (this.activityLength >= 5) {
        return "So many activities! Good Job!";
      } else {
        return "No activities, so sad...";
      }
    }
  },
  // watch: {
  //   creator(val) {
  //     this.watchedAppName = this.appName + " by " + val;
  //   },
  //   appName(val) {
  //     this.watchedAppName = val + " by " + this.creator;
  //   }
  // },
  methods: {
    addActivity(newActivity) {
      // console.log(newActivity);
      // this.activities[newActivity.id] = newActivity;
      Vue.set(this.activities, newActivity.id, newActivity);
    }

    // isFormValid() {
    //   return this.newActivity.title && this.newActivity.notes;
    // }
  },
  beforeCreate() {},
  created() {
    this.isFetching = true;
    fetchActivities()
      .then(activities => {
        this.activities = activities;
        this.isFetching = false;
      })
      .catch(err => {
        this.error = err;
        this.isFetching = false;
      });
    this.categories = fetchCategories();
    this.user = fetchUser();
  }
};
</script>

<style>
#vuePlanner {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

html,
body {
  font-family: "Open Sans", serif;
  background: #f2f6fa;
}
footer {
  background-color: #f2f6fa !important;
}

.fetching {
  border: 2px solid orange;
}

.has-error {
  border: 2px solid red;
}

.activity-motivation {
  float: right;
}

.activity-length {
  display: inline-block;
}
.example {
  margin-left: 30px;
}

.topNav {
  border-top: 5px solid #3498db;
}
.topNav .container {
  border-bottom: 1px solid #e6eaee;
}
.container .columns {
  margin: 3rem 0;
}
.navbar-menu .navbar-item {
  padding: 0 2rem;
}
aside.menu {
  padding-top: 3rem;
}
aside.menu .menu-list {
  line-height: 1.5;
}
aside.menu .menu-label {
  padding-left: 10px;
  font-weight: 700;
}
.button.is-primary.is-alt {
  background: #00c6ff;
  background: -webkit-linear-gradient(to bottom, #0072ff, #00c6ff);
  background: linear-gradient(to bottom, #0072ff, #00c6ff);
  font-weight: 700;
  font-size: 14px;
  height: 3rem;
  line-height: 2.8;
}
.media-left img {
  border-radius: 50%;
}
.media-content p {
  font-size: 14px;
  line-height: 2.3;
  font-weight: 700;
  color: #8f99a3;
}
article.post {
  margin: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e6eaee;
}
article.post:last-child {
  padding-bottom: 0;
  border-bottom: none;
}
.menu-list li {
  padding: 5px;
}

.navbar-brand > h1 {
  font-size: 31px;
  padding: 20px;
}
</style>
