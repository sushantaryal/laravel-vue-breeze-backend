<script setup>
import { ref } from 'vue'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue'
import { Head } from '@inertiajs/vue3'
import InputLabel from '@/Components/Admin/InputLabel.vue'
import Editor from '@/Components/Admin/Editor.vue'

const description = ref('')
</script>

<template>
    <Head title="Dashboard" />

    <AuthenticatedLayout>
        <template #header>
            <h2
                class="text-xl font-semibold leading-tight text-gray-900 dark:text-gray-200 md:text-3xl"
            >
                Dashboard
            </h2>
        </template>

        <div class="pb-4 md:pb-8">
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div
                    class="overflow-hidden rounded bg-white shadow-sm dark:bg-gray-900 sm:rounded-lg"
                >
                    <div class="p-6 text-gray-900 dark:text-gray-100">
                        <div>
                            <InputLabel for="description" value="Description" />
                            <Editor v-model="description" class="mt-1" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
