<template>
  <div class="pt-32 flex justify-center items-center">
    <form class="container flex flex-col gap-6">
      <h3>{{t("post.new")}}</h3>
      <div class="media">
        {{t("post.attach")}}
        <input
            type="file"
            accept="image/*"
            multiple
            class="hidden"
            ref="fileInput"
            @change="onFileChange"
            name="media"
            id="media"
        />
        <UButton color="violet" variant="solid" @click="triggerFileInput">
          <BootstrapIcon name="paperclip" />
        </UButton>
        <div class="flex flex-wrap gap-4 mt-4">
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
      </div>

      <div class="text flex flex-col gap-2">
        <p>{{t("post.text")}}</p>
        <UTextarea
            :placeholder="t('post.text')"
            color="violet"
            variant="outline"
            autoresize
            resize
            v-model="text"
        ></UTextarea>
      </div>
       <UButton 
        @click="onPost" 
        color="violet" 
        variant="solid" 
        class="w-fit" 
        :disabled="!text"
         > 
        {{ t("post.publish") }} 
      </UButton>
      <div v-if="uploading" class="mt-4">
        {{t("post.uploading") }}
        <div v-for="(file, index) in imageFiles" :key="index">
          {{ file.name }} - {{ uploadProgress[index] }}%
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
const { locale, setLocale, t } = useI18n();
const text = ref("");
const { session } = useUserSession();
const imageFiles = ref<File[]>([]);
const previews = ref<string[]>([]);
const uploadProgress = ref<number[]>([]); // Для хранения прогресса загрузки
const uploading = ref(false);
const route = useRouter()

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
    navigateTo('/home');
  } else {
    console.error(error.value);
  }
};

</script>

<style scoped>
.container {
  max-width: 720px;
}
</style>
