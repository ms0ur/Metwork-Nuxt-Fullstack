<script setup lang="ts">
const route = useRoute();
const { locale, setLocale, t } = useI18n();
</script>

<template>
  <div class="container flex justify-around items-center relative h-screen">
    <div class="flex flex-col gap-10">
      <h2 class="exo text-5xl">
        <span class="delta">//</span>
        {{ t("pages.landing.title") }}
        <span class="delta">//</span>
      </h2>
      <NuxtLink to="/auth/register">
        <UButton
          @click=""
          color="purple"
          variant="outline"
          class="w-fit text-xl"
        >
          {{ t("pages.landing.try") }}
        </UButton>
      </NuxtLink>
    </div>
  </div>
</template>
