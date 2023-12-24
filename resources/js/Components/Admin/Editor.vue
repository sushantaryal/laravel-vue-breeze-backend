<script setup>
import { onMounted, computed, ref, watch } from 'vue'
import { usePage, router } from '@inertiajs/vue3'
import Trix from 'trix'

import 'trix/dist/trix.css'

Trix.config.blockAttributes.default.tagName = 'p'

Trix.config.blockAttributes.default.breakOnReturn = true

Trix.config.textAttributes.underline = {
    style: { textDecoration: 'underline' },
    inheritable: true,
    parser: (element) => {
        const style = window.getComputedStyle(element)

        return style.textDecoration.includes('underline')
    },
}

Trix.Block.prototype.breaksOnReturn = function () {
    const lastAttribute = this.getLastAttribute()
    // const blockConfig = Trix.getBlockConfig(lastAttribute ? lastAttribute : 'default')
    console.log(lastAttribute)

    return true
}

Trix.LineBreakInsertion.prototype.shouldInsertBlockBreak = function () {
    if (
        this.block.hasAttributes() &&
        this.block.isListItem() &&
        !this.block.isEmpty()
    ) {
        return this.startLocation.offset > 0
    } else {
        return !this.shouldBreakFormattedBlock() ? this.breaksOnReturn : false
    }
}

const props = defineProps({
    modelValue: String,
    placeholder: {
        type: String,
        default: '',
    },
    inputId: {
        type: String,
        required: false,
        default: '',
    },
    inputName: {
        type: String,
        required: false,
        default: 'content',
    },
    shouldClear: {
        type: Boolean,
        required: false,
    },
})

const emit = defineEmits(['update:modelValue'])

const input = ref(null)

onMounted(() => {
    input.value.addEventListener('trix-initialize', function (e) {
        let groupElement = e.target.toolbarElement.querySelector(
            '.trix-button--icon-italic',
        )
        groupElement.insertAdjacentHTML(
            'afterend',
            '<button type="button" class="trix-button trix-button--icon trix-button--icon-underline" data-trix-attribute="underline"><sub>Underline</sub></button>',
        )
    })

    input.value.addEventListener('trix-change', (e) => {
        emit('update:modelValue', e.target.innerHTML)
    })
})

const generateUniqueId = () => {
    return Math.random().toString(16).slice(2)
}

const computedId = computed(() => {
    return props.inputId || generateUniqueId()
})

const getContentEndPosition = () => {
    return input.value.editor.getDocument().toString().length - 1
}

// watch(
//     () => props.modelValue,
//     (newContent) => {
//         if (input.value.value !== newContent) {
//             input.value.value = newContent
//             input.value.editor.setSelectedRange(getContentEndPosition())
//         }
//     },
// )

watch(
    () => props.shouldClear,
    (value) => {
        input.value.value = ''
    },
)

const uploadAttachment = (event) => {
    let attachment = event.attachment
    let file = attachment.file
    if (file) {
        let form = new FormData()
        form.append('Content-Type', file.type)
        form.append('image', file)

        let xhr = new XMLHttpRequest()
        xhr.open('POST', route('admin.trix.store'), true)
        xhr.setRequestHeader('X-CSRF-Token', usePage().props.csrftoken)

        xhr.upload.onprogress = function (e) {
            let progress = (e.loaded / e.total) * 100
            return attachment.setUploadProgress(progress)
        }

        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                let data = JSON.parse(this.responseText)
                return attachment.setAttributes({
                    url: data.url,
                    href: data.url,
                })
            }
        }

        return xhr.send(form)
    }
}

const deleteAttachment = (event) => {
    let attachment = event.attachment

    let url = attachment.attachment.attributes.values.url.split('/')
    let previewURL = `${url[2]}/${url[3]}`

    if (previewURL) {
        let form = new FormData()
        form.append('image', previewURL)

        let xhr = new XMLHttpRequest()
        xhr.open('POST', route('admin.trix.destroy'), true)
        xhr.setRequestHeader('X-CSRF-Token', usePage().props.csrftoken)

        xhr.upload.onprogress = function (e) {
            let progress = (e.loaded / e.total) * 101
            return attachment.setUploadProgress(progress)
        }

        xhr.onload = function () {
            if (this.status >= 201 && this.status < 300) {
                let data = JSON.parse(this.responseText)
                return ''
            }
        }

        return xhr.send(form)
    }
}
</script>

<template>
    <div
        class="h-auto rounded-md border border-gray-300 pt-2 focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:focus-within:border-indigo-600 dark:focus-within:ring-indigo-600"
    >
        <input
            type="hidden"
            :id="computedId"
            :name="inputName"
            :value="modelValue"
        />
        <trix-editor
            ref="input"
            class="trix-editor prose max-w-full"
            :input="computedId"
            :placeholder="placeholder"
            @trix-attachment-add="uploadAttachment"
            @trix-attachment-remove="deleteAttachment"
        ></trix-editor>
    </div>
</template>

<style>
.trix-button-row {
    @apply mx-2 justify-normal space-x-1 !important;
}
.trix-button-group {
    @apply mb-2.5 space-x-1 border-none !important;
}
.dark .trix-button-group {
    @apply border-gray-600 !important;
}
.trix-button-group:not(:first-child) {
    @apply ml-0 !important;
}
.trix-button-group-spacer {
    @apply flex-grow-0 !important;
}
.trix-button {
    @apply rounded-lg border-b-0 py-3 !important;
}
.dark .trix-button {
    @apply border-gray-600 text-gray-200 !important;
}
.trix-button:hover {
    @apply bg-gray-200 !important;
}
.dark .trix-button:hover {
    @apply bg-gray-700 !important;
}
.trix-button--remove {
    border-radius: 50% !important;
    @apply flex items-center justify-center border !important;
}
.dark .trix-button--remove:hover {
    @apply bg-gray-200 !important;
}
.trix-button.trix-active {
    @apply bg-gray-300 !important;
}
.dark .trix-button.trix-active {
    @apply bg-gray-200 !important;
}
.trix-button:not(:first-child) {
    @apply border-l-0 !important;
}
.trix-button--icon {
    @apply w-9 !important;
}
.dark .trix-button--icon.trix-active::before {
    @apply invert-0;
}

.trix-button--icon-underline::before {
    background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512"><path d="M16 64c0-17.7 14.3-32 32-32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H128V224c0 53 43 96 96 96s96-43 96-96V96H304c-17.7 0-32-14.3-32-32s14.3-32 32-32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H384V224c0 88.4-71.6 160-160 160s-160-71.6-160-160V96H48C30.3 96 16 81.7 16 64zM0 448c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32z"/></svg>');
    height: 18px;
    width: 18px;
    margin: auto auto;
}

.trix-button--icon-attach::before {
    background-image: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IS0tIFVwbG9hZGVkIHRvOiBTVkcgUmVwbywgd3d3LnN2Z3JlcG8uY29tLCBHZW5lcmF0b3I6IFNWRyBSZXBvIE1peGVyIFRvb2xzIC0tPg0KPHN2ZyBmaWxsPSIjMDAwMDAwIiB3aWR0aD0iODAwcHgiIGhlaWdodD0iODAwcHgiIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMjEsNEgzQTEsMSwwLDAsMCwyLDVWMTlhMSwxLDAsMCwwLDEsMUgyMWExLDEsMCwwLDAsMS0xVjVBMSwxLDAsMCwwLDIxLDRaTTcsN0EyLDIsMCwxLDEsNSw5LDIsMiwwLDAsMSw3LDdaTTIwLDE4SDRWMTYuMzMzTDgsMTNsMi44NTcsMi4xNDNMMTYsMTBsNCw1LjMzM1oiLz48L3N2Zz4=') !important;
}

.trix-dialogs {
    position: relative !important;
}

.trix-dialog {
    @apply absolute inset-x-0 bottom-auto top-4 rounded-lg border-t-0 bg-gray-50 p-2 shadow-md !important;
}
.dark .trix-dialog {
    @apply bg-gray-800 !important;
}

.trix-dialog__link-fields {
    @apply flex w-full flex-col gap-2 !important;
}

.trix-dialog__link-fields .trix-button-group {
    @apply flex gap-2 border-none !important;
}

.trix-dialog__link-fields .trix-input {
    @apply block w-full rounded-md border-none bg-white py-1.5 pe-3 ps-3 text-sm text-gray-950 outline-none ring-1 ring-gray-950/10 transition duration-75 placeholder:text-gray-400 sm:text-sm sm:leading-6 !important;
}
.dark .trix-dialog__link-fields .trix-input {
    @apply bg-gray-700 text-white ring-white/20 placeholder:text-gray-500 !important;
}

.trix-dialog__link-fields .trix-button-group .trix-button {
    @apply rounded-md bg-gray-50 px-2 py-0.5 text-xs ring-1 ring-gray-200 !important;
}
.dark .trix-dialog__link-fields .trix-button-group .trix-button {
    @apply bg-gray-700 ring-gray-600 !important;
}

.trix-editor {
    min-height: 12rem;
    @apply mt-1 w-full rounded-b-md rounded-t-none border-x-0 border-b-0 border-gray-300 bg-white text-base font-normal !important;
}
.dark .trix-editor {
    @apply border-gray-700 bg-gray-800 text-gray-200 !important;
}

.dark .trix-button--icon::before {
    @apply invert;
}

.trix-editor h1 {
    font-size: 1.25rem !important;
    line-height: 1.25rem !important;
    @apply mb-4 font-semibold leading-5;
}

.trix-editor a:not(.no-underline) {
    @apply underline;
}

.trix-editor img {
    max-width: 100%;
    height: auto;
    margin-bottom: 0;
}

.trix-editor .attachment__caption-editor {
    @apply h-6 bg-gray-200 px-2 py-0.5 text-left text-gray-900 !important;
}

.dark .trix-editor .attachment__caption-editor {
    @apply bg-gray-900 text-gray-200;
}

.trix-editor ul {
    list-style-type: disc;
    padding-left: 2rem;
}

.trix-editor ol {
    list-style-type: decimal;
    padding-left: 2rem;
}

.dark .trix-editor strong {
    @apply text-gray-200 !important;
}

.trix-editor pre {
    display: inline-block;
    width: 100%;
    vertical-align: top;
    font-family: monospace;
    font-size: 1em;
    padding: 0.5em;
    white-space: pre;
    background-color: #eee;
    overflow-x: auto;
    color: #000000;
    margin-bottom: 1rem;
}
.dark .trix-editor pre {
    @apply bg-gray-900 text-gray-200;
}

.trix-editor blockquote {
    border: 0 solid #ccc;
    border-left-width: 0px;
    border-left-width: 0.3em;
    margin-left: 0.3em;
    padding-left: 0.6em;
    margin-top: 1rem;
    margin-bottom: 1rem;
}
.dark .trix-editor blockquote {
    @apply text-gray-200;
}
</style>
