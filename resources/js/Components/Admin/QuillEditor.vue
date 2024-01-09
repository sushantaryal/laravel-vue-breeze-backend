<script setup>
import { ref, watch } from 'vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

const emit = defineEmits(['update:modelValue'])
const props = defineProps(['modelValue'])

let toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike', 'link'],
    [{ header: 1 }, { header: 2 }],
    ['blockquote', 'code-block'],
    [{ list: 'ordered' }, { list: 'bullet' }],
]

const content = ref('')

watch(
    () => props.modelValue,
    (newContent) => {
        if (content.value !== newContent) {
            content.value = newContent
        }
    },
)

const readyContent = () => {
    content.value = props.modelValue
}

const updateContent = (e) => {
    emit('update:modelValue', content.value)
}
</script>

<template>
    <div
        class="h-auto rounded-md border border-gray-300 focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:focus-within:border-indigo-600 dark:focus-within:ring-indigo-600"
    >
        <QuillEditor
            theme="snow"
            :toolbar="toolbarOptions"
            v-model:content="content"
            contentType="html"
            @ready="readyContent"
            @textChange="updateContent"
        />
    </div>
</template>

<style>
.ql-editor {
    min-height: 12rem;
    @apply border-t border-gray-300 p-2.5 text-base;
}
.dark .ql-editor {
    @apply border-gray-700 text-gray-100;
}
.ql-toolbar {
    @apply mx-2 mb-1 mt-2 overflow-x-auto whitespace-nowrap rounded-t-md border-none border-gray-200 p-0 pb-1 !important;
}
.dark .ql-toolbar {
    @apply border-gray-700 !important;
}
.ql-toolbar button {
    @apply h-8 w-8 rounded !important;
}
.ql-toolbar button svg {
    @apply h-6 w-6 !important;
}
.dark .ql-toolbar button:hover {
    @apply bg-gray-700 !important;
}
.dark .ql-toolbar button.ql-active {
    @apply bg-gray-100 !important;
}
.dark .ql-toolbar button.ql-active .ql-stroke {
    @apply stroke-blue-800 !important;
}
.dark .ql-toolbar button.ql-active .ql-fill {
    @apply fill-blue-800 !important;
}
.dark .ql-toolbar button .ql-stroke {
    @apply stroke-gray-100 !important;
}
.dark .ql-toolbar button .ql-fill {
    @apply fill-gray-100 !important;
}
.dark .ql-toolbar button {
    @apply text-white !important;
}
.ql-container {
    @apply rounded-b-md border-none !important;
}
</style>
