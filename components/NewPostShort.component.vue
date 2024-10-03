<template>
  <div class="flex w-full items-center gap-2 relative">
    <!-- Attachment Button -->
    <UButton
        color="violet"
        variant="solid"
        class="absolute left-2 z-10"
        @click="triggerFileInput"
    >
      <BootstrapIcon name="paperclip" />
    </UButton>
    <input
        type="file"
        accept="image/*"
        ref="fileInput"
        class="hidden"
        @change="onFileChange"
    />

    <!-- Input field for new post -->
    <input
        type="text"
        placeholder="Что нового?"
        class="w-full rounded-lg border-2 border-violet-500 pl-12 pr-20 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
        v-model="text"
    />

    <!-- Publish Button -->
    <UButton
        color="violet"
        variant="solid"
        class="absolute right-2 z-10 flex gap-1 items-center"
        :disabled="!text"
        @click="onPost"
    >
      Опубликовать <BootstrapIcon name="send" />
    </UButton>
  </div>
  <div class="relative">
    <!-- File upload indicator -->
    <div v-if="image" class="absolute top-2 right-2 z-10">
      <div class="flex items-center gap-1">
        <!-- todo -->
      </div>
    </div>

  </div>
</template>

<script lang="ts" setup>
const { session } = useUserSession();
const text = ref("");
const emit = defineEmits(['newPost']);

const image = ref<File | null>(null);

const imageSize = ref(0);
// Ссылка на input для файлов
const fileInput = ref<HTMLInputElement | null>(null);

// Функция для открытия диалога выбора файла
const triggerFileInput = () => {
  fileInput.value?.click();
};

// Обработка выбора файла
const onFileChange = (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0];
  if (file) {
    image.value = file;
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result as string;
      const sizeInBytes = (base64String.length - (base64String.indexOf(',') + 1)) * 0.75;
      imageSize.value = sizeInBytes;
    };
    reader.readAsDataURL(file);
  }
};


// Function to handle new post creation
const onPost = async () => {
  const formData = new FormData();
  formData.append("content", text.value);
  formData.append("userID", session.value.user.id);
  if (image.value) {
    formData.append("media", image.value);
  }

  const { data, status, error } = await useFetch("/api/posts/createPost", {
    method: "POST",
    body: formData,
  });

  if (status.value === 'success') {
    text.value = "";
    image.value = null; // Очистка поля
    // Можно эмитировать событие или вызвать метод обновления постов
    emit('newPost');
  } else {
    // Обработка ошибок
    console.error(error.value);
  }
};
</script>

<style scoped>
/* Custom styles for input field */
input::placeholder {
  color: #a3a3a3;
}

input:focus {
  border-color: #7c3aed;
}
</style>
