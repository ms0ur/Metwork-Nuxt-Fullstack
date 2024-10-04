<script lang="ts" setup>
const text = ref("");
const title = ref("");

const { locale, setLocale, t } = useI18n();
const onSubmit = () => {
  console.log("Submit");

  console.log(text.value, title.value);
};
</script>

<template>
  <div class="pt-32 flex justify-center items-center">
    <form class="container flex flex-col gap-6">
      <h3>{{t('post.new')}}</h3>
      <div>
        <p>{{t('post.name')}}</p>
        <UInput
          :placeholder="t('post.name')"
          color="violet"
          variant="outline"
          v-model="title"
        ></UInput>
      </div>
      <div class="media hidden"></div>
      <div class="text flex flex-col gap-2">
        <p>{{t('post.text')}}</p>
        <UTextarea
          :placeholder="t('post.placeholder')"
          color="violet"
          variant="outline"
          autoresize
          resize
          v-model="text"
        ></UTextarea>
      </div>
      <UButton @click="onSubmit" color="violet" variant="solid" class="w-fit"
        >{{t('post.publish')}}</UButton
      >
    </form>
  </div>
</template>

<style scoped>
.container {
  max-width: 720px;
}
</style>
