<template>
  <div class="container mx-auto px-4 py-10 pt-40 flex flex-col gap-8">
    <!-- New Post and Actions -->
    <div class="w-full">
      <NewPostShortComponent @newPost="refresh" />
    </div>

    <!-- Buttons for refresh, search, and add post -->
    <div class="flex gap-2">
      <UButton color="violet" @click="refresh" variant="solid" class="w-fit">
        <Icon name="ic:baseline-refresh" />
      </UButton>
      <UButton color="violet" variant="solid" class="w-fit">
        <Icon name="ic:baseline-search" />
      </UButton>
      <NuxtLink to="/post/new">
        <UButton color="violet" variant="solid" class="w-fit">
          <Icon name="ic:baseline-add" />
          {{ $t("navigation.createpost") }}
        </UButton>
      </NuxtLink>
    </div>

    <!-- Post feed -->
    <div v-if="posts.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="post in posts" :key="post._id" class="w-full">
        <PostComponent :postID="post._id" :post="post" />
      </div>
    </div>

    <!-- No posts message -->
    <div v-else class="text-center text-gray-500">
      <p>No posts available</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
const posts = ref([]);

// Fetch all posts from the API
async function refresh() {
  const { data } = await useFetch("/api/posts/getPosts", {
    method: "POST",
    body: {
      method: "all",
    },
  });
  posts.value = data.value || [];
}

// Fetch posts on component mount
await refresh();
</script>

<style scoped>
.container {
  max-width: 1200px;
}

@media (min-width: 768px) {
  .grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1024px) {
  .grid-cols-3 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
</style>
