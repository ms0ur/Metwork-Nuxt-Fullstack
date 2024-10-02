<template>
  <div class="mx-48 pt-32 flex flex-col gap-8">
    <div class="w-full">
      <NewPostShortComponent />
    </div>
    <div class="flex gap-1">
      <UButton color="violet" @click="refresh" variant="solid" class="w-fit"><Icon name="ic:baseline-refresh" /></UButton>
      <UButton color="violet" variant="solid" class="w-fit"><Icon name="ic:baseline-search" /></UButton>
      <UButton color="violet" variant="solid" class="w-fit"><Icon name="ic:baseline-add" /></UButton>
    </div>
    <div v-for="post in posts" v-auto-animate>
      <PostComponent :postID="post._id" :post="post" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const {session} = useUserSession();
const posts = ref([])

async function refresh() {
  const {data, status, error, refresh} = await useFetch("/api/posts/getPosts", {
    method: "POST",
    body: {
      method: "all",
    }
  })
  posts.value = data.value;
}
await refresh();
console.log(posts.value);
</script>

<style></style>
