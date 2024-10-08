<template>
  <div class="max-h-full" v-if="images.length > 0">
    <!-- Условие для отображения одной картинки без слайдера -->
    <div v-if="images.length === 1" class="relative flex align-center justify-center h-full">
      <div class="h-full w-auto flex align-center justify-center absolute" @click="isOpen1 = true" >
        <NuxtImg
            :src="images[0]"
            alt="Slider Image"
            loading="lazy"
            format="webp"
            placeholder
            height="auto"
            class="rounded-lg"
        />
      </div>

    </div>
    <!-- Слайдер для нескольких картинок -->
    <div v-else class="relative flex align-center justify-center h-full">
      <div @click="isOpen = true" v-for="(image, index) in images" :key="index" class="w-auto flex align-center justify-center absolute h-full">
        <NuxtImg
            :src="image"
            alt="Slider Image"
            loading="lazy"
            format="webp"
            placeholder
            height="auto"
            class="rounded-lg"
            :class="{ 'hidden': index !== currentIndex }"
        />

      </div>
      <UModal  v-model="isOpen" fullscreen class="overflow-hidden relative max-h-screen p-0">
        <Icon name="material-symbols:close-rounded" class="absolute right-2 top-0 cursor-pointer self-center size-12" @click="isOpen = false" />
        <div class="flex flex-row justify-around align-center">
          <Icon name="material-symbols:chevron-left-rounded" class="self-center cursor-pointer size-12" @click="prev()" />
          <div class="p-0 relative  flex justify-center align-center">
            <NuxtImg
                :src="images[currentIndex]"
                alt="Slider Image"
                loading="lazy"
                format="webp"
                placeholder
                :height="height"
                width="auto"
                densities="x1 x2"
                fit="inside"

                class="rounded-lg"
            />

          </div>
          <Icon name="material-symbols:chevron-right-rounded" class="self-center cursor-pointer size-12" @click="next()" />
        </div>
      </UModal>
      <!-- Управление навигацией (влево, вправо) -->
      <button @click="prev"
              class="absolute left-0 top-1/2 transform -translate-y-1/2 p-5 pb-4 bg-gray-800 text-white rounded-full">
        <Icon name="material-symbols:chevron-left-rounded" />
      </button>
      <button @click="next"
              class="absolute right-0 top-1/2 transform -translate-y-1/2 p-5 pb-4 bg-gray-800 text-white rounded-full">
        <Icon name="material-symbols:chevron-right-rounded" />
      </button>
      <!-- Индикаторы -->
      <div class="flex justify-center z-10 relative space-x-2 mt-2">
        <button
            v-for="(image, index) in images"
            :key="index"
            :class="{
            'bg-blue-500': currentIndex === index,
            'bg-gray-300': currentIndex !== index
          }"
            class="w-3 h-3 rounded-full"
            @click="goToSlide(index)"
        ></button>
      </div>
    </div>
  </div>
</template>

<script setup>
// Массив с изображениями передается через пропс
const props = defineProps({
  images: {
    type: Array,
    default: () => []
  },
})

const isOpen = ref(false);
const isOpen1 = ref(false);

const height = computed(() => {
  return window.innerHeight
})
const width = computed(() => {
  return window.innerWidth - 200
})

const images = props.images

// Текущий индекс слайдера
const currentIndex = ref(0)

// Функция перехода к предыдущему изображению
const prev = () => {
  currentIndex.value =
      (currentIndex.value - 1 + images.length) % images.length
}

const toggleModal = () => {
  isOpen.value = !isOpen.value
}

// Функция перехода к следующему изображению
const next = () => {
  currentIndex.value =
      (currentIndex.value + 1) % images.length
}

// Функция перехода к конкретному слайду
const goToSlide = (index) => {
  currentIndex.value = index
}
</script>

<style scoped>
/* Добавьте стили для слайдера при необходимости */
img {
  height: 100%;
  width: 100%;
}



/* Новые стили для предотвращения выхода изображений за пределы контейнера */
.image-container {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain; /* или cover, в зависимости от ваших предпочтений */
}
</style>