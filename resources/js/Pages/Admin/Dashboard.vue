<script setup>
import { ref } from 'vue'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue'
import { Head } from '@inertiajs/vue3'
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
                <div
                    class="overflow-hidden rounded bg-white shadow-sm border border-gray-200 dark:border-gray-800 dark:bg-gray-900 sm:rounded-lg"
                >
                    <div class="space-y-6 p-6 text-gray-900 dark:text-gray-100">
                        <!-- <div>
                            <p>Trix Editor</p>
                            <Editor v-model="description" class="mt-1" />
                        </div> -->
                        <!-- <div>
                            <p>Quill Editor</p>
                            <QuillEditor v-model="description" class="mt-1" />
                        </div> -->
                        <div>
                            <p>TipTap Editor</p>
                            <TipTapEditor v-model="description" class="mt-1" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
