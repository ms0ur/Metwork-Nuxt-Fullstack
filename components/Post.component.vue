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
      <div @click="likePost" class="flex cursor-pointer flex-col items-center">
        <Icon ref="like_icon" :name='likeIcon' />
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
const {session} = useUserSession();
const userID = session.value?.user.id
const likeIcon = ref('ic:baseline-favorite-border');
const props = defineProps({
  postID: String,
  post: {}
});

defineNuxtComponent({
  name: "Post",
});

if (userID in props.post?.likes) {
  likeIcon.value = 'ic:baseline-favorite';
} else {
  likeIcon.value = 'ic:baseline-favorite-border';
}

const likePost = async () => {
  if (props.postID && props.post) {
    const {data, status, error, refresh} = await useFetch("/api/posts/editPost", {
      method: "POST",
      body: {
        postID: props.post._id,
        method: "like",
        userID: userID
      },
    })

    if (status.value == "success") {
      if (props.post.likes.includes(userID)) {
        props.post.likes.splice(props.post.likes.indexOf(userID), 1);
        likeIcon.value = 'ic:baseline-favorite-border';
      } else {
        props.post.likes.push(userID);
        likeIcon.value = 'ic:baseline-favorite';
      }
    }
  }
}

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
