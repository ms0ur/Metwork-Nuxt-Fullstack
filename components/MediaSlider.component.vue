<template>
  <div v-if="images.length > 0" class="relative flex justify-center items-center max-h-full">
    <!-- Отображение одной картинки -->
    <div v-if="images.length === 1" @click="openModal(0)" class="flex justify-center items-center h-full">
      <NuxtImg
          :src="images[0]"
          alt="Single Image"
          loading="lazy"
          format="webp"
          placeholder
          class="rounded-lg cursor-pointer"
      />
    </div>

    <!-- Слайдер для нескольких картинок -->
    <div v-else class="relative flex justify-center items-center h-full">
      <NuxtImg
          v-for="(image, index) in images"
          :key="index"
          :src="image"
          :class="{ 'hidden': index !== currentIndex }"
          alt="Slider Image"
          loading="lazy"
          format="webp"
          placeholder
          @click="openModal(index)"
          class="rounded-lg cursor-pointer"
      />
      <!-- Навигация -->
      <button @click="prev" class="absolute left-0 top-1/2 transform -translate-y-1/2 p-5 bg-gray-800 text-white rounded-full">
        <Icon name="material-symbols:chevron-left-rounded" />
      </button>
      <button @click="next" class="absolute right-0 top-1/2 transform -translate-y-1/2 p-5 bg-gray-800 text-white rounded-full">
        <Icon name="material-symbols:chevron-right-rounded" />
      </button>
      <!-- Индикаторы -->
      <div class="flex justify-center absolute top-0 space-x-2 mt-2">
        <button
            v-for="(image, index) in images"
            :key="index"
            @click="goToSlide(index)"
            class="w-3 h-3 rounded-full"
            :class="{ 'bg-blue-500': currentIndex === index, 'bg-gray-300': currentIndex !== index }"
        ></button>
      </div>
    </div>

    <!-- Модальное окно -->
    <UModal v-model="isOpen" fullscreen class="overflow-hidden max-h-screen max-w-screen">
      <Icon name="material-symbols:close-rounded" class="absolute right-2 top-0 cursor-pointer size-12" @click="isOpen = false" />
      <Icon v-if="images.length > 1" name="material-symbols:chevron-left-rounded" class="absolute left-2 top-1/2 transform -translate-y-1/2 cursor-pointer size-12" @click="prev" />
      <div class="flex justify-center items-center h-screen">
        <NuxtImg
            :src="images[currentIndex]"
            alt="Modal Image"
            loading="lazy"
            format="webp"
            placeholder
            class="rounded-lg"
        />
      </div>
      <Icon v-if="images.length > 1" name="material-symbols:chevron-right-rounded" class="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer size-12" @click="next" />
    </UModal>

  </div>
</template>

<script setup>
const props = defineProps({
  images: {
    type: Array,
    default: () => []
  }
})

const isOpen = ref(false)
const currentIndex = ref(0)

// Открытие модального окна с выбранной картинкой
const openModal = (index) => {
  currentIndex.value = index
  isOpen.value = true
}

// Переход к предыдущему изображению
const prev = () => {
  currentIndex.value = (currentIndex.value - 1 + props.images.length) % props.images.length
}

// Переход к следующему изображению
const next = () => {
  currentIndex.value = (currentIndex.value + 1) % props.images.length
}

// Переход к конкретному слайду
const goToSlide = (index) => {
  currentIndex.value = index
}
</script>

<style scoped>
/* Стили для предотвращения выхода изображений за пределы контейнера */
img {
  max-height: 100%;
  max-width: 100%;
  object-fit: contain;
}
</style>
