<script setup>
import { Link } from '@inertiajs/vue3'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { computed } from 'vue'
import { ChevronDownIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
    item: Object,
})

const hasActiveChild = computed(() => {
    function hasActiveItem(items) {
        return items.some((item) => item.active || hasActiveItem(item.children))
    }

    return hasActiveItem(props.item.children) || props.item.active
})
</script>

<template>
    <div>
        <template v-if="!item.children.length">
            <Link
                :class="[
                    'group mb-0.5 flex items-center rounded p-2 text-sm font-semibold hover:bg-gray-100 dark:hover:bg-gray-900',
                    item.active
                        ? 'text-primary-600 dark:text-primary-400 bg-gray-100 font-semibold dark:bg-gray-900'
                        : 'text-gray-600 dark:text-white',
                ]"
                :href="item.href"
                v-if="item.show"
            >
                <component
                    :class="[
                        'h-6 w-6 flex-shrink-0 transition duration-75',
                        !item.active ? 'text-gray-400' : '',
                    ]"
                    :is="item.icon"
                    v-if="item.icon"
                >
                </component>
                <span class="ml-3">{{ item.label }}</span>
            </Link>
        </template>
        <template v-else>
            <Disclosure
                v-slot="{ open }"
                :default-open="hasActiveChild"
                v-if="item.show"
            >
                <DisclosureButton
                    class="group mt-4 flex w-full items-center rounded p-2 transition duration-75"
                >
                    <component
                        class="h-6 w-6 flex-shrink-0 transition duration-75"
                        :is="item.icon"
                        v-if="item.icon"
                    >
                    </component>

                    <span
                        class="flex-1 whitespace-nowrap text-left font-semibold text-gray-600 dark:text-white"
                        >{{ item.label }}</span
                    >

                    <ChevronDownIcon
                        :class="[
                            'h-4 w-4 text-gray-600 dark:text-white',
                            open ? 'rotate-180' : '',
                        ]"
                    />
                </DisclosureButton>
                <DisclosurePanel>
                    <ul class="space-y-1 py-2">
                        <li v-for="child in item.children" :key="child.label">
                            <NavItem :item="child" />
                        </li>
                    </ul>
                </DisclosurePanel>
            </Disclosure>
        </template>
    </div>
</template>
