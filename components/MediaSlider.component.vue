<template>
  <div class="max-h-screen" v-if="images.length > 0">
    <!-- Условие для отображения одной картинки без слайдера -->
    <div class="max-h-full" v-if="images.length === 1">
      <NuxtImg :src="images[0]" alt="Single Image" class="rounded-lg" />
    </div>
    <!-- Слайдер для нескольких картинок -->
    <div v-else class="relative max-h-full w-full">
      <div v-for="(image, index) in images" :key="index" class="w-full max-h-full">
        <NuxtImg
            :src="image"
            alt="Slider Image"
            class="rounded-lg max-h-full"
            :class="{ 'hidden': index !== currentIndex }"
        />
      </div>
      <!-- Управление навигацией (влево, вправо) -->
      <button @click="prev" class="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 bg-gray-800 text-white rounded-full">
        &lt;
      </button>
      <button @click="next" class="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 bg-gray-800 text-white rounded-full">
        &gt;
      </button>
      <!-- Индикаторы -->
      <div class="flex justify-center space-x-2 mt-2">
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
defineProps({
  images: {
    type: Array,
    default: () => []
  }
})

// Текущий индекс слайдера
const currentIndex = ref(0)

// Функция перехода к следующему изображению
const next = () => {
  currentIndex.value = (currentIndex.value + 1) % images.length
}

// Функция перехода к предыдущему изображению
const prev = () => {
  currentIndex.value =
      (currentIndex.value - 1 + images.length) % images.length
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
</style>
