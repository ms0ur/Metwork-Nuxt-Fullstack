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
  <div class="container pt-56 mx-auto p-4">
    <div class="bg-white rounded-lg shadow-lg p-6 space-y-6 md:flex md:space-y-0 md:space-x-6">
      <!-- Media Slider -->
      <div class="w-full md:w-2/3">
        <MediaSliderComponent :images="data.media" />
      </div>

      <!-- Content -->
      <div class="w-full md:w-1/3 space-y-4">
        <!-- Заголовок поста -->
        <h1 class="text-2xl font-bold text-gray-800">{{ data.title || "Заголовок поста" }}</h1>

        <!-- Контент поста -->
        <p class="text-gray-600">{{ data.content || "Контент поста..." }}</p>

        <!-- Дата и имя пользователя -->
        <p class="text-sm text-gray-500">
          Posted by <span class="font-semibold">{{ username }}</span> on {{ new Date(data.createdAt).toDateString('ru-RU') }}
        </p>
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
/* Дополнительные стили можно добавить по необходимости */
</style>
