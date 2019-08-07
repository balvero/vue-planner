<template>
  <article class="post">
    <h4>{{ activity.title }}</h4>
    <div class="media">
      <div class="media-left">
        <p class="image is-32x32">
          <img src="../assets/user.png" />
        </p>
      </div>
      <div class="media-content">
        <div class="content">
          <p>
            <a href="#">Filip Jerga</a>
            updated
            {{ activity.updatedAt }} minutes ago &nbsp;
          </p>
        </div>
      </div>
      <div class="media-right">
        <span>{{ activity.progress }}</span>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  name: "ActivityItem",
  props: ["activity"]
};
</script>

<style>
</style>

