<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { ChevronDownIcon } from '@heroicons/vue/24/solid'

defineProps({
    defaultOpen: {
        required: false,
        default: true,
    },
    collapsible: {
        required: false,
        default: false,
    },
})
</script>

<template>
    <div
        class="w-full rounded border bg-white text-gray-900 shadow-sm dark:border-gray-800 dark:bg-gray-900 dark:text-gray-100 sm:rounded-lg"
    >
        <Disclosure
            v-slot="{ open }"
            :default-open="defaultOpen"
            v-if="collapsible"
        >
            <DisclosureButton
                class="flex w-full items-center justify-between p-4 focus:outline-none sm:px-6"
            >
                <header>
                    <h2 class="text-lg font-medium">
                        <slot name="title" />
                    </h2>
                    <p
                        class="mt-1 text-sm text-gray-600 dark:text-gray-400"
                        v-if="$slots.subtitle"
                    >
                        <slot name="subtitle" />
                    </p>
                </header>
                <ChevronDownIcon
                    :class="[
                        'h-4 w-4 text-gray-600 transition-transform duration-200 ease-linear dark:text-white',
                        open ? 'rotate-180' : '',
                    ]"
                />
            </DisclosureButton>
            <transition
                enter-active-class="transition duration-300 ease-linear"
                enter-from-class="transform translate-y-px opacity-0"
                enter-to-class="transform translate-y-0 opacity-100"
                leave-active-class="transition duration-300 ease-linear"
                leave-from-class="transform translate-y-0 opacity-100"
                leave-to-class="transform translate-y-px opacity-0"
            >
                <DisclosurePanel>
                    <div
                        class="w-full border-t p-4 dark:border-gray-700 sm:p-6"
                    >
                        <slot />
                    </div>
                </DisclosurePanel>
            </transition>
        </Disclosure>
        <template v-else>
            <div class="w-full p-4 sm:px-6">
                <header>
                    <h2 class="text-lg font-medium">
                        <slot name="title" />
                    </h2>
                    <p
                        class="mt-1 text-sm text-gray-600 dark:text-gray-400"
                        v-if="$slots.subtitle"
                    >
                        <slot name="subtitle" />
                    </p>
                </header>
            </div>
            <div class="w-full border-t p-4 dark:border-gray-700 sm:p-6">
                <slot />
            </div>
        </template>
    </div>
</template>
