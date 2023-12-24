<script setup>
import { computed } from 'vue'

const emit = defineEmits(['update:checked'])

const props = defineProps({
    checked: {
        type: [Array, Boolean],
        required: true,
    },
    value: {
        default: null,
    },
})

const proxyChecked = computed({
    get() {
        return props.checked
    },

    set(val) {
        emit('update:checked', val)
    },
})
</script>

<template>
    <input
        type="checkbox"
        :value="value"
        v-model="proxyChecked"
        class="text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 h-5 w-5 rounded border-gray-300 shadow-sm dark:border-gray-600 dark:bg-gray-800 dark:focus:ring-offset-gray-900"
    />
</template>
