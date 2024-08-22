<template>
  <div class="flex w-full items-center gap-2">
    <div class="flex w-full items-center">
      <UButton color="violet" variant="solid" class="absolute w-10 left-48 z-10"
        ><BootstrapIcon name="paperclip"
      /></UButton>
      <UInput
        type="text"
        placeholder="
           Что нового?"
        class="w-full relative"
        v-model="text"
      />
    </div>
    <UButton
      color="violet"
      variant="solid"
      class="absolute flex gap-1 items-center right-48 z-10"
      :disabled="!text"
      @click="onPost"
    >
      Опубликовать <BootstrapIcon name="send" />
    </UButton>
  </div>
</template>

<script lang="ts" setup>
const text = ref("");

const onPost = () => {
  console.log(text.value);
  text.value = "";
};
</script>

<style scoped></style>
