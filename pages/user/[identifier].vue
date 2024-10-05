<script setup lang="ts">
const route = useRoute();
const identifier = route.params.identifier;

const { data, status, error } = await useFetch(`/api/user/${identifier}/getUser`);

if (status.value == "success") {
  console.log(data.value);
}
</script>

<template>

</template>

<style scoped>

</style>