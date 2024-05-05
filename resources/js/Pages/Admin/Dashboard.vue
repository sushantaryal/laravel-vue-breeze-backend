<script setup>
import { ref } from 'vue'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue'
import { Head } from '@inertiajs/vue3'
import ActionCard from '@/Components/Admin/ActionCard.vue'
// import Editor from '@/Components/Admin/Editor.vue'
// import QuillEditor from '@/Components/Admin/QuillEditor.vue'
import TipTapEditor from '@/Components/Admin/TipTapEditor.vue'

const description = ref('<p>This is default content</p>')
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
                <ActionCard class="mb-4">
                    <template #title> Editor Panel </template>
                    <template #content>
                        <div class="text-gray-900 dark:text-gray-100">
                            <p>TipTap Editor</p>
                            <TipTapEditor v-model="description" class="mt-1" />
                        </div>
                    </template>
                </ActionCard>
                <ActionCard
                    :defaultOpen="true"
                    :collapsible="true"
                    class="mb-4"
                >
                    <template #title> Editor Panel </template>
                    <template #content>
                        <div class="text-gray-900 dark:text-gray-100">
                            <p>TipTap Editor</p>
                        </div>
                    </template>
                </ActionCard>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
