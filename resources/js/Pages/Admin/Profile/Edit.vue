<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue'
import DeleteUserForm from './Partials/DeleteUserForm.vue'
import UpdatePasswordForm from './Partials/UpdatePasswordForm.vue'
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm.vue'
import { Head } from '@inertiajs/vue3'

defineProps({
    mustVerifyEmail: {
        type: Boolean,
    },
    status: {
        type: String,
    },
})
</script>

<template>
    <Head title="Profile" />

    <AuthenticatedLayout>
        <template #header>
            <h2
                class="text-xl font-semibold leading-tight text-gray-900 md:text-3xl dark:text-gray-200"
            >
                Profile
            </h2>
        </template>

        <div class="pb-4 md:pb-8">
            <div class="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                <UpdateProfileInformationForm
                    :must-verify-email="mustVerifyEmail"
                    :status="status"
                />
                <UpdatePasswordForm />

                <!-- <DeleteUserForm /> -->
            </div>
        </div>
    </AuthenticatedLayout>
</template>
