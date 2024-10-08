<script setup lang="ts">
const route = useRoute();
const postId = route.params.id;

// Запрос данных поста
const { data, status, error } = await useFetch(`/api/posts/getPost`, {
  method: "POST",
  body: { id: postId },
});
if (status.value == "success") {
  console.log(data.value);
}

// Запрос данных пользователя, который создал пост
const { data: userData } = await useAsyncData(`user-${data.value.userID}`, () =>
    $fetch(`/api/user/${data.value.userID}/getUser`)
);

const username = ref(userData?.value?.username || "Unavailable");
</script>

<template>
  <div class="flex flex-col justify-center align-center">
    <div class="grid grid-cols-2 grid-rows-1 gap-4 pt-36 pl-10 pr-10 container">
      <div class="h-full">
        <MediaSliderComponent class="h-full w-auto" :images="data.media" />

      </div>
      <div>
        <h1>title</h1>
        <p>
          {{data.content}}
        </p>
        <p>Posted by <b>{{username}}</b> at <span class="text-gray-400">{{new Date(data.createdAt).toLocaleString()}}</span></p>
      </div>
    </div>

    <!-- Комментарии -->
    <div class="bg-gray-50 rounded-lg shadow-md p-4 mt-6">
      <!-- Comments section (заглушка) -->
      <h2 class="text-lg font-semibold text-gray-700">Комментарии</h2>
      <div class="mt-4 text-gray-500">Здесь будут комментарии...</div>
    </div>
  </div>
</template>

<style scoped>
.grid{
  height: 75vh;
}

/* Дополнительные стили можно добавить по необходимости */
</style>
