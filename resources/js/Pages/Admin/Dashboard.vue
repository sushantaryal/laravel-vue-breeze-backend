<script setup>
import { ref } from 'vue'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue'
import { Head } from '@inertiajs/vue3'
import ActionCard from '@/Components/Admin/ActionCard.vue'
import CKEditor from '@/Components/Admin/CKEditor.vue'

const description = ref('<p>This is default content</p>')
</script>

<template>
    <Head title="Dashboard" />

    <AuthenticatedLayout>
        <template #header>
            <h2
                class="text-xl font-semibold leading-tight text-gray-900 md:text-3xl dark:text-gray-200"
            >
                Dashboard
            </h2>
        </template>

        <div class="pb-4 md:pb-8">
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <ActionCard class="mb-4">
                    <template #title>Editor Panel</template>
                    <div>
                        <p>CKEditor Editor</p>
                        <CKEditor v-model="description" class="mt-1" />
                    </div>
                </ActionCard>
                <ActionCard
                    :defaultOpen="true"
                    :collapsible="true"
                    class="mb-4"
                >
                    <template #title>Editor Panel</template>
                    <div>
                        <p>TipTap Editor</p>
                    </div>
                </ActionCard>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
