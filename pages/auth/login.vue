<script lang="ts" setup>
import type { FormSubmitEvent } from "#ui/types";
import { object, string, type InferType } from "yup";
const { locale, setLocale, t } = useI18n();

const schema = object({
  username: string().required(t("auth.errors.required")),
  password: string().required(t("auth.errors.required")),
});

type Schema = InferType<typeof schema>;

const formState = reactive<Schema>({
  username: "",
  password: "",
});

const errorMessage = ref("");
const errorOn = ref(false);

const onSubmit = async (event: FormSubmitEvent<any>) => {
  errorOn.value = false;
  const { data, status, error } = await useFetch("/api/auth/login", {
    method: "POST",
    body: {
      username: formState.username,
      password: formState.password,
    },
  });

  if (status.value == "success") {
    await navigateTo("/home");
  } else {
    // !@ts-expect-error included bc if status.value an error, it's always containing an error
    //@ts-expect-error
    errorMessage.value =
      error.value?.message.split(" ")[
        error.value?.message.split(" ").length - 1
      ];
    errorOn.value = true;
  }
};
</script>

<template>
  <div
    class="flex items-center justify-center min-h-screen min-w-screen py-5 z-50 relative bg-white dark:bg-slate-900"
  >
    <UForm
      :state="formState"
      @submit="onSubmit"
      :schema="schema"
      class="flex flex-col gap-6"
    >
      <h1 class="exo text-4xl">{{ t("auth.login") }}</h1>
      <p class="text-red-500" v-if="errorOn">{{ t(errorMessage) }}</p>
      <div class="flex flex-col gap-3">
        <UFormGroup :label="t('auth.username')" name="username" required>
          <UInput
            v-model="formState.username"
            color="violet"
            variant="outline"
            :placeholder="t('auth.username')"
          ></UInput>
        </UFormGroup>

        <UFormGroup :label="t('auth.password')" name="password" required>
          <UInput
            v-model="formState.password"
            color="violet"
            variant="outline"
            type="password"
            :placeholder="t('auth.password')"
          ></UInput>
        </UFormGroup>
      </div>

      <UButton
        color="violet"
        variant="solid"
        size="xl"
        type="submit"
        class="w-fit self-center"
      >
        {{ t("auth.login") }}
      </UButton>
    </UForm>
  </div>
</template>

<style></style>
