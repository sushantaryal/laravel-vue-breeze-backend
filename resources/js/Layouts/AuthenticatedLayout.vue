<script setup>
import { ref } from 'vue'
import Dropdown from '@/Components/Admin/Dropdown.vue'
import DropdownLink from '@/Components/Admin/DropdownLink.vue'
import Navigation from '@/Components/Admin/Navigation.vue'
import { Link, Head } from '@inertiajs/vue3'
import { SunIcon, MoonIcon } from '@heroicons/vue/24/solid'
import { useDark, useToggle } from '@vueuse/core'

defineProps({
    title: String,
})

const isDark = useDark()
const toggleDark = useToggle(isDark)

const showingNavigation = ref(false)
</script>

<template>
    <div>
        <Head :title="title" />

        <div class="relative min-h-screen bg-white dark:bg-gray-950">
            <div
                class="absolute inset-0 z-40 cursor-pointer bg-black bg-opacity-50 lg:hidden"
                v-if="showingNavigation"
                @click="showingNavigation = !showingNavigation"
            ></div>
            <!-- Page Content -->
            <div class="lg:flex">
                <div
                    :class="[
                        'fixed inset-y-0 left-0 z-50 min-h-screen w-80 -translate-x-full transform bg-white transition duration-200 dark:bg-gray-950 lg:sticky lg:translate-x-0 lg:bg-transparent dark:lg:bg-transparent',
                        showingNavigation
                            ? 'translate-x-0'
                            : '-translate-x-full',
                    ]"
                >
                    <div
                        class="sticky top-0 z-50 border-b border-gray-100 bg-white dark:border-gray-700 dark:bg-gray-900"
                    >
                        <div
                            class="mx-auto flex h-16 items-center justify-between px-4 md:px-6 lg:px-8"
                        >
                            <!-- Logo -->
                            <div class="flex shrink-0 items-center">
                                <Link :href="route('admin.dashboard')">
                                    <span
                                        class="text-xl font-bold leading-5 tracking-tight text-gray-800 dark:text-white"
                                        >Backend</span
                                    >
                                </Link>
                            </div>
                            <!-- Hamburger -->
                            <div class="flex items-center lg:hidden">
                                <button
                                    @click="
                                        showingNavigation = !showingNavigation
                                    "
                                    class="inline-flex items-center justify-center rounded-md p-1 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none dark:text-gray-500 dark:hover:bg-gray-950 dark:hover:text-gray-400 dark:focus:bg-gray-950 dark:focus:text-gray-400"
                                >
                                    <svg
                                        class="h-6 w-6"
                                        stroke="currentColor"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            class="inline-flex"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    <Navigation />
                </div>

                <div class="lg:flex-1">
                    <div
                        class="sticky top-0 z-30 flex items-center justify-between border-b border-gray-100 bg-white px-2 dark:border-gray-700 dark:bg-gray-900 md:px-6 lg:px-8"
                    >
                        <div class="flex items-center">
                            <!-- Hamburger -->
                            <div class="flex items-center lg:hidden">
                                <button
                                    @click="
                                        showingNavigation = !showingNavigation
                                    "
                                    class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none dark:text-gray-500 dark:hover:bg-gray-950 dark:hover:text-gray-400 dark:focus:bg-gray-950 dark:focus:text-gray-400"
                                >
                                    <svg
                                        class="h-6 w-6"
                                        stroke="currentColor"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            class="inline-flex"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div class="ms-6 flex h-16 items-center">
                            <!-- Settings Dropdown -->
                            <div class="relative ms-3">
                                <Dropdown align="right" width="52">
                                    <template #trigger>
                                        <span class="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                class="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none dark:bg-gray-900 dark:text-gray-400 dark:hover:text-gray-300"
                                            >
                                                {{ $page.props.auth.user.name }}

                                                <svg
                                                    class="-me-0.5 ms-2 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fill-rule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clip-rule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </template>

                                    <template #content>
                                        <div
                                            class="border-b px-1 pb-1 dark:border-gray-600"
                                        >
                                            <DropdownLink
                                                :href="
                                                    route('admin.profile.edit')
                                                "
                                            >
                                                Profile
                                            </DropdownLink>
                                        </div>
                                        <div
                                            class="flex items-center justify-between space-x-2 border-b px-4 py-1 dark:border-gray-600"
                                        >
                                            <button
                                                type="button"
                                                class="flex w-1/2 items-center justify-center rounded py-2 text-gray-400 hover:bg-gray-100 disabled:cursor-pointer dark:hover:bg-gray-900"
                                                :class="{
                                                    'bg-gray-100 text-blue-400 dark:bg-gray-900':
                                                        !isDark,
                                                }"
                                                @click="toggleDark()"
                                                :disabled="!isDark"
                                            >
                                                <SunIcon class="h-5 w-5" />
                                            </button>
                                            <button
                                                type="button"
                                                class="flex w-1/2 items-center justify-center rounded py-2 text-gray-400 hover:bg-gray-100 disabled:cursor-pointer dark:hover:bg-gray-900"
                                                :class="{
                                                    'bg-gray-100 text-blue-400 dark:bg-gray-900':
                                                        isDark,
                                                }"
                                                @click="toggleDark()"
                                                :disabled="isDark"
                                            >
                                                <MoonIcon class="h-5 w-5" />
                                            </button>
                                        </div>
                                        <div class="px-1 pt-1">
                                            <DropdownLink
                                                :href="route('admin.logout')"
                                                method="post"
                                                as="button"
                                            >
                                                Log Out
                                            </DropdownLink>
                                        </div>
                                    </template>
                                </Dropdown>
                            </div>
                        </div>
                    </div>
                    <main>
                        <!-- Page Heading -->
                        <header v-if="$slots.header">
                            <div
                                class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8"
                            >
                                <slot name="header" />
                            </div>
                        </header>
                        <slot />
                    </main>
                </div>
            </div>
        </div>
    </div>
</template>
