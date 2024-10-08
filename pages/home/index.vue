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
      <div class="flex flex-row">
        <UButton color="violet" variant="solid"  class="w-fit flex align-center justify-center flex-row">
          <span @click="searchOpen = !searchOpen"><Icon name="ic:baseline-search" />
          {{ $t("navigation.search") }}</span>
          <div>
            <input v-if="searchOpen" type="text" @input="searchSend" :placeholder="$t('navigation.search')" v-model="searchbox" class="relative block w-full disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border-0 form-input rounded-md placeholder-gray-400 dark:placeholder-gray-500 text-sm px-2.5 py-0 shadow-sm bg-violet-300 text-gray-900 dark:text-white ring-1 ring-inset ring-violet-600 dark:ring-violet-500 focus:ring-2 focus:ring-violet-700 dark:focus:ring-violet-600"/>
          </div>
        </UButton>

      </div>
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
const searchOpen = ref(false);


const posts = ref([]);

const searchbox=ref('');

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

async function searchSend() {
  if (searchbox.value) {
    const { data } = await useFetch("/api/posts/searchPosts", {
      method: "POST",
      body: {
        query: searchbox.value
      },
    })
    posts.value = data.value || [];
  } else {
    await refresh();
  }
}

// Fetch posts on component mount
await refresh();
</script>

<style scoped>
.container {
  max-width: 1200px;
}

.inputt{
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
