<script lang="ts" setup>
const { locale, setLocale, t } = useI18n();
import { vMaska } from "maska/vue";
import { format } from "date-fns";
const colorMode = useColorMode();
const date = ref(new Date());
const label = ref(t("auth.birthdate"));
const attrs2 = ref([
  {
    key: "today",
    highlight: {
      color: "purple",
      fillMode: "solid",
    },
    dates: new Date(),
  },
]);
</script>
<template>
  <div class="flex items-center justify-center h-screen w-screen">
    <form action="" class="flex flex-col gap-6">
      <h1 class="exo text-4xl">{{ t("auth.register") }}</h1>
      <div class="flex flex-col gap-3">
        <UInput
          color="violet"
          variant="outline"
          :placeholder="t('auth.username')"
          v-maska="{ mask: '!@**************' }"
        />
        <UInput
          color="violet"
          variant="outline"
          :placeholder="t('auth.email')"
        />
        <UInput
          color="violet"
          variant="outline"
          :placeholder="t('auth.name')"
        />
        <UInput
          color="violet"
          variant="outline"
          :placeholder="t('auth.surname')"
        />

        <UPopover>
          <UButton
            color="violet"
            variant="outline"
            icon="i-heroicons-calendar-days-20-solid"
            :label="label"
            @click="label = format(date, 'dd MMM yyyy')"
          />

          <template #panel>
            <VDatePicker
              v-model="date"
              color="purple"
              :attrs="attrs2"
              :locale="locale.split('-')[0]"
              :is-dark="colorMode.preference === 'dark'"
              mode="date"
            />
          </template>
        </UPopover>
      </div>
    </form>
  </div>
</template>
<style scoped></style>
