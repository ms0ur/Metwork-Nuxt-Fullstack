<script lang="ts" setup>
const text = ref("");
const title = ref("");
const onSubmit = () => {
  console.log("Submit");

  console.log(text.value, title.value);
};
</script>

<template>
  <div class="pt-32 flex justify-center items-center">
    <form class="container flex flex-col gap-6">
      <h3>Новый пост</h3>
      <div>
        <p>Название поста</p>
        <UInput
          placeholder="Название поста"
          color="violet"
          variant="outline"
          v-model="title"
        ></UInput>
      </div>
      <div class="media hidden"></div>
      <div class="text flex flex-col gap-2">
        <p>Текст поста</p>
        <UTextarea
          placeholder="Текст поста"
          color="violet"
          variant="outline"
          autoresize
          resize
          v-model="text"
        ></UTextarea>
      </div>
      <UButton @click="onSubmit" color="violet" variant="solid" class="w-fit"
        >Опубликовать</UButton
      >
    </form>
  </div>
</template>

<style scoped>
.container {
  max-width: 720px;
}
</style>
