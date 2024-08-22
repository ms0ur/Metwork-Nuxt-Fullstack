<template>
  <div
    v-if="post"
    class="w-full h-full flex justify-between gap-6 rounded-lg overflow-hidden bg-color-x"
  >
    <div class="flex gap-10">
      <div class="h-auto">
        <NuxtImg
          class="max-h-52"
          src="https://placehold.co/600x400.png"
        ></NuxtImg>
      </div>
      <div class="h-full flex flex-col gap-3 my-5">
        <h3 class="exo text-xl">Заголовок поста</h3>
        <p class="text-t">
          {{ post.content }}
        </p>
        <UButton color="violet" variant="solid" class="w-fit"
          >Read more</UButton
        >
      </div>
    </div>
    <div class="flex flex-col gap-1 justify-between items-center mr-5 my-5">
      <div class="flex cursor-pointer flex-col items-center">
        <BootstrapIcon name="heart" />
        <p>{{ post.likes.length }}</p>
      </div>
      <div class="flex cursor-pointer flex-col items-center">
        <BootstrapIcon name="chat-left" />
        <p>{{ post.comments.length }}</p>
      </div>
      <div class="flex cursor-pointer flex-col items-center">
        <BootstrapIcon name="share" />
        <p>{{ post.reposts.length }}</p>
      </div>
    </div>
  </div>
  <div
    v-else
    class="loader w-full h-full flex justify-between gap-6 rounded-lg overflow-hidden bg-color-x"
  >
    <div class="">
      <NuxtImg
        class="w-full h-full"
        src="https://placehold.co/600x400.png"
      ></NuxtImg>
    </div>
    <div class="h-full flex flex-col gap-3 my-5">
      <h3 class="text-xl">Заголовок поста</h3>
      <p class="text-t">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero natus
        dolores deserunt quam ipsum ducimus, error ratione architecto,
        consequatur vitae necessitatibus sint laudantium. Voluptatum deserunt,
        eaque repellat quod tempora itaque aut ipsa assumenda vero nobis veniam
        incidunt doloribus neque, eius officiis officia at accusantium facere!
        Necessitatibus maxime ratione explicabo dolore corrupti quaerat dolores
        reiciendis, facilis tempore. Voluptate autem atque possimus minima
        perferendis ex nemo officiis impedit suscipit. Asperiores et, libero
        incidunt dolore quod numquam dolores? Tempore adipisci accusamus,
        ratione eveniet quos laboriosam rem nulla commodi perspiciatis minus
        fugiat, in impedit provident culpa a nemo possimus velit dignissimos
        itaque quasi suscipit debitis illo laudantium! Deleniti numquam odit
        obcaecati aliquid quae! Minus deleniti quaerat maiores, eaque laborum
        aspernatur, illum dolore sit iusto, quia voluptatem ullam maxime
        similique cupiditate! Molestias, omnis ex. Labore tempore natus ipsum
        beatae harum consequatur quos id? Quis laboriosam nihil quasi dicta
        nulla, illo molestias alias consequuntur aut debitis eveniet eius ullam
        dolores necessitatibus non dolor corporis pariatur nesciunt. Accusamus
        animi quam, ipsum vel commodi saepe. Ad totam quam minima, assumenda
        labore nemo incidunt iure excepturi porro ut veritatis nisi aliquam ex
        accusamus aperiam fuga quibusdam id distinctio, aut architecto voluptas
        doloribus error dolores? Magnam unde repellat molestias atque.
      </p>
      <UButton color="violet" variant="solid" class="w-fit">Read more</UButton>
    </div>
    <div class="flex flex-col gap-1 justify-between items-center mr-5 my-5">
      <div class="flex cursor-pointer flex-col items-center">
        <BootstrapIcon name="heart" />
        <p>1000</p>
      </div>
      <div class="flex cursor-pointer flex-col items-center">
        <BootstrapIcon name="chat-left" />
        <p>1000</p>
      </div>
      <div class="flex cursor-pointer flex-col items-center">
        <BootstrapIcon name="share" />
        <p>100</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  postID: String,
});

const post = ref();

const getPost = async () => {
  console.log(props.postID);
  const { data, status, error, refresh } = await useFetch(
    "/api/posts/getPost",
    {
      method: "POST",
      body: {
        id: props.postID,
      },
    }
  );
  post.value = data.value;
};

defineNuxtComponent({
  name: "Post",
});

await getPost();
</script>

<style scoped>
.text-t {
  max-width: calc(100% - 100px);
}

.loader {
  font-family: "Flow Circular", system-ui;
  font-weight: 400;
  font-style: normal;
}
</style>
