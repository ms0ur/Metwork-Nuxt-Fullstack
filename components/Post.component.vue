<template>
  <div v-if="post" class="w-full flex flex-col md:flex-row gap-6 p-4 rounded-lg bg-color-x">
    <!-- Image block -->
    <div v-if="post.media[0]" class="md:w-1/3">
      <NuxtImg class="w-full max-h-52 object-cover rounded-md" :src="post.media[0]" alt="Post image" />
    </div>

    <!-- Post content -->
    <div class="flex-1 flex flex-col gap-3 justify-between">
      <h3 class="text-xl font-semibold truncate">{{ post.title }}</h3>

      <!-- Truncated content with ellipsis -->
      <p class="text-t text-justify line-clamp-3 w-full">
        {{ post.content }}
      </p>

      <!-- Buttons -->
      <NuxtLink :to="`/post/${props.post._id}`" class="flex justify-between items-center">
        <UButton color="violet" variant="solid" class="w-fit">Read more</UButton>

      </NuxtLink>
      <div>
        <p class="text-sm text-gray-500">Posted by {{ username }}</p>
      </div>
    </div>

    <!-- Post interactions (likes, comments, reposts) -->
    <div class="flex md:flex-col justify-between items-center gap-2">
      <div @click="likePost" class="cursor-pointer flex flex-col items-center">
        <Icon :name="likeIcon" />
        <p>{{ post.likes.length }}</p>
      </div>
      <div class="cursor-pointer flex flex-col items-center">
        <BootstrapIcon name="chat-left" />
        <p>{{ post.comments.length }}</p>
      </div>
      <div class="cursor-pointer flex flex-col items-center">
        <BootstrapIcon name="share" />
        <p>{{ post.reposts.length }}</p>
      </div>
    </div>
  </div>

  <!-- Loader state -->
  <div v-else class="loader w-full h-full flex justify-between gap-6 p-4 rounded-lg bg-color-x">
    <div class="w-full md:w-1/3">
      <NuxtImg class="w-full h-full" src="https://placehold.co/600x400.png" />
    </div>
    <div class="h-full flex flex-col gap-3">
      <h3 class="text-xl">Заголовок поста</h3>
      <div class="text-t w-full h-10 bg-gray-200 animate-pulse"></div>
      <div class="flex flex-col gap-2">
        <UButton color="violet" variant="solid" class="w-fit">Read more</UButton>
        <p class="text-sm text-gray-500 animate-pulse">{{ username }}</p>
      </div>
    </div>
    <div class="flex flex-col gap-1 justify-between items-center">
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
const { session } = useUserSession();
const userID = session.value?.user.id;
const likeIcon = ref('ic:baseline-favorite-border');


const props = defineProps({
  postID: String,
  post: Object,
});

const { data: userData } = await useAsyncData(`user-${props.post.userID}`, () =>
    $fetch(`/api/user/${props.post?.userID}/getUser`)
);

const username = ref(userData?.value?.username || 'Unavailable');

if (userID in props.post?.likes) {
  likeIcon.value = 'ic:baseline-favorite';
}

const isAuthor = () => {
  return userID == props.post?.userID;
};




const likePost = async () => {
  if (props.postID && props.post) {
    const { data, status } = await useFetch("/api/posts/editPost", {
      method: "POST",
      body: {
        postID: props.post._id,
        method: "like",
        userID: userID,
      },
    });

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
};


</script>

<style scoped>
/* Tailwind custom styles */
.text-t {
  max-width: 100%;
  word-break: break-all;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.loader {
  font-family: "Flow Circular", system-ui;
  font-weight: 400;
}

.loader .animate-pulse {
  background-color: #f0f0f0;
}
</style>
