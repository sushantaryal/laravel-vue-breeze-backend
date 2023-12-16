<script setup>
import { Head } from '@inertiajs/vue3'
defineProps({
    title: String,
})
</script>

<template>
    <div>
        <Head :title="title" />
        <slot />
    </div>
</template>
