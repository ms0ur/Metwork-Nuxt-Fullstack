<template>
  <div
    class="w-full h-full flex justify-between gap-6 rounded-lg overflow-hidden bg-color-x"
  >
    <div class="">
      <NuxtImg
        class="w-full h-full"
        src="https://placehold.co/600x400.png"
      ></NuxtImg>
    </div>
    <div class="h-full flex flex-col gap-3 my-5">
      <h3 class="exo text-xl">Заголовок поста</h3>
      <p class="text-t">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam cumque
        quibusdam cum culpa eos voluptas, ipsum, sapiente quaerat rerum totam
        odio, provident officia explicabo vel fugit. Minus expedita at
        laboriosam itaque ea, rem voluptate natus quos optio aspernatur! Sint
        quae non totam quia, voluptatibus cumque unde veniam soluta modi enim!
        ...
      </p>
      <UButton color="violet" variant="solid" class="w-fit">Read more</UButton>
    </div>
    <div class="flex flex-col gap-1 justify-between items-center mr-5 my-5">
      <div class="flex cursor-pointer flex-col items-center">
        <BootstrapIcon name="heart" />
        <p>10000</p>
      </div>
      <div class="flex cursor-pointer flex-col items-center">
        <BootstrapIcon name="chat-left" />
        <p>3124</p>
      </div>
      <div class="flex cursor-pointer flex-col items-center">
        <BootstrapIcon name="share" />
        <p>0</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  postID: String,
});

defineNuxtComponent({
  name: "Post",
});
</script>

<style scoped>
.text-t {
  max-width: calc(100% - 100px);
}
</style>
