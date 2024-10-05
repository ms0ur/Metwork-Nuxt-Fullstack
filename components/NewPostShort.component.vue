<template>
  <div class="flex w-full items-center gap-2 relative">
    <!-- Attachment Button -->
    <UButton color="violet" class="absolute left-2" variant="solid" @click="triggerFileInput">
      <BootstrapIcon name="paperclip" />
    </UButton>
    <input
        type="file"
        accept="image/*"
        multiple
        ref="fileInput"
        class="hidden"
        @change="onFileChange"
    />

    <!-- Input field for new post -->
    <input
        type="text"
        placeholder="Что нового?"
        class="w-full rounded-lg border-2 border-violet-500 pl-12 pr-20 py-2"
        v-model="text"
    />

    <!-- Publish Button -->
    <UButton
        color="violet"
        variant="solid"
        class="absolute right-2 flex gap-1 items-center"
        :disabled="!text"
        @click="onPost"
    >
      Опубликовать <BootstrapIcon name="send" />
    </UButton>
  </div>

  <!-- Preview for selected images -->
  <div class="flex flex-wrap gap-2 mt-4">
    <div v-for="(preview, index) in previews" :key="index" class="relative">
      <img :src="preview" alt="preview" class="w-20 h-20 object-cover rounded-md" />
      <button
          class="absolute top-0 right-0 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
          @click.prevent="removeImage(index)"
      >
        ×
      </button>
    </div>
  </div>

  <!-- Upload progress -->
  <div v-if="uploading" class="mt-4">
    Загрузка файлов...
    <div v-for="(file, index) in imageFiles" :key="index">
      {{ file.name }} - {{ uploadProgress[index] }}%
    </div>
  </div>
</template>

<script lang="ts" setup>
const text = ref("");
const emit = defineEmits(['newPost']);
const { session } = useUserSession();

const imageFiles = ref<File[]>([]);
const previews = ref<string[]>([]);
const uploadProgress = ref<number[]>([]);
const uploading = ref(false);

const fileInput = ref<HTMLInputElement | null>(null);

// Открыть выбор файлов
const triggerFileInput = () => {
  fileInput.value?.click();
};

// Обработка выбора файлов
const onFileChange = (e: Event) => {
  const files = (e.target as HTMLInputElement).files;
  if (files) {
    for (const file of Array.from(files)) {
      imageFiles.value.push(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        previews.value.push(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  }
};

// Удаление изображения
const removeImage = (index: number) => {
  imageFiles.value.splice(index, 1); // Удаляем файл из списка файлов
  previews.value.splice(index, 1); // Удаляем превью
};

// Отправка поста
const onPost = async () => {
  const formData = new FormData();
  formData.append("content", text.value);
  formData.append("userID", session.value.user.id);

  imageFiles.value.forEach((file) => formData.append("media", file));
  uploadProgress.value = Array(imageFiles.value.length).fill(0);
  uploading.value = true;

  const { data, status, error } = await useFetch("/api/posts/createPost", {
    method: "POST",
    body: formData,
    onUploadProgress(progressEvent) {
      const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      uploadProgress.value = uploadProgress.value.map((_, i) => progress);
    },
  });

  uploading.value = false;
  if (status.value === 'success') {
    text.value = "";
    imageFiles.value = [];
    previews.value = [];
    uploadProgress.value = [];
    emit('newPost');
  } else {
    console.error(error.value);
  }
};
</script>

<style scoped>
/* Custom styles for input field */
input::placeholder {
  color: #a3a3a3;
}
</style>
