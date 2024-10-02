<template>
  <div class="flex w-full items-center gap-2">
    <div class="flex w-full items-center">
      <UButton color="violet" variant="solid" class="absolute w-10 left-48 z-10"
        ><BootstrapIcon name="paperclip"
      /></UButton>
      <input
        type="text"
        placeholder="Что нового?"
        class="w-full rounded-lg border-2 border-violet-500 pl-10 pr-32 py-1 focus:outline-none focus:ring-2 focus:ring-violet-500"
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
const {session} = useUserSession();
const text = ref("");

const onPost = async () => {
  const { data, status, error, refresh } = await useFetch(
    "/api/posts/createPost",
    {
      method: "POST",
      body: {
        content: text.value,
        userID: session.value.user.id
      },
    }
  )
  text.value = "";

};
</script>

<style scoped></style>
