<script setup>
import { ref, watch, onBeforeUnmount } from 'vue'
import { usePage } from '@inertiajs/vue3'
import { onClickOutside } from '@vueuse/core'
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'

const emit = defineEmits(['update:modelValue'])
const props = defineProps(['modelValue'])

const editor = useEditor({
    content: props.modelValue,
    extensions: [
        StarterKit,
        Underline,
        Image,
        Link.configure({
            openOnClick: false,
            HTMLAttributes: {
                target: null,
            },
        }),
    ],
    editorProps: {
        attributes: {
            class: 'prose dark:prose-invert focus:outline-none max-w-full'
        }
    },
    onUpdate: () => {
        emit('update:modelValue', editor.value.getHTML())
    },
})

watch(
    () => props.modelValue,
    (value) => {
        if (editor.value.getHTML() === value) return

        editor.value.commands.setContent(value, false)
    },
)

onBeforeUnmount(() => {
    editor.value.destroy()
})

/* Set/Unset Links */
const linkmodal = ref(null)
const openingLink = ref(false)
const anchor = ref({
    href: '',
    target: false
})

onClickOutside(linkmodal, (event) => closeLinkPopup())

const openLinkPopup = () => {
    openingLink.value = true
    if (editor.value.getAttributes('link').href) {
        anchor.value = {
            href: editor.value.getAttributes('link').href,
            target: editor.value.getAttributes('link').target == '_blank' ? true : false,
        }
    }
}
const closeLinkPopup = () => {
    openingLink.value = false
    anchor.value = {href: '', target: false}
}
const setLink = () => {
    if (anchor.value.href === null) {
        closeLinkPopup()
        return
    }

    if (anchor.value.href === '') {
        editor.value.chain().focus().extendMarkRange('link').unsetLink().run()
        closeLinkPopup()

        return
    }

    anchor.value.target = anchor.value.target ? '_blank': null

    editor.value
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink(anchor.value)
        .run()
    closeLinkPopup()
}
const unsetLink = () => {
    editor.value.chain().focus().unsetLink().run()
    closeLinkPopup()
}
/* Close Set/Unset Links */

/* Upload Image */
const uploadImage = (e) => {
    const image = e.target.files[0]
    if (image) {
        const reader = new FileReader()
        reader.readAsDataURL(image)
        reader.onload = e => {
            editor.value.chain().focus().setImage({ src: e.target.result }).run()
        }
        let form = new FormData()
        form.append('Content-Type', image.type)
        form.append('image', image)

        let xhr = new XMLHttpRequest()
        xhr.open('POST', route('admin.trix.store'), true)
        xhr.setRequestHeader('X-CSRF-Token', usePage().props.csrftoken)

        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                let data = JSON.parse(this.responseText)
                editor.value.chain().focus().setImage({ src: data.url }).run()
            }
        }

        return xhr.send(form)
    }
}
/* Close Upload Image */
</script>
<template>
    <div
        class="relative h-auto rounded-md border border-gray-300 focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:focus-within:border-indigo-600 dark:focus-within:ring-indigo-600"
    >
        <!-- Toolbar -->
        <div class="tiptap-toolbar" v-if="editor">
            <!-- Bold -->
            <button
                type="button"
                @click="editor.chain().focus().toggleBold().run()"
                :disabled="!editor.can().chain().focus().toggleBold().run()"
                :class="{ 'is-active': editor.isActive('bold') }"
                title="Bold"
                aria-labelledby="Bold"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                        d="M8 11H12.5C13.8807 11 15 9.88071 15 8.5C15 7.11929 13.8807 6 12.5 6H8V11ZM18 15.5C18 17.9853 15.9853 20 13.5 20H6V4H12.5C14.9853 4 17 6.01472 17 8.5C17 9.70431 16.5269 10.7981 15.7564 11.6058C17.0979 12.3847 18 13.837 18 15.5ZM8 13V18H13.5C14.8807 18 16 16.8807 16 15.5C16 14.1193 14.8807 13 13.5 13H8Z"
                        fill="currentColor"
                    ></path>
                </svg>
            </button>
            <!-- Italics -->
            <button
                type="button"
                @click="editor.chain().focus().toggleItalic().run()"
                :disabled="!editor.can().chain().focus().toggleItalic().run()"
                :class="{ 'is-active': editor.isActive('italic') }"
                title="Italic"
                aria-labelledby="Italic"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                        d="M15 20H7V18H9.92661L12.0425 6H9V4H17V6H14.0734L11.9575 18H15V20Z"
                        fill="currentColor"
                    ></path>
                </svg>
            </button>
            <!-- Underline -->
            <button
                type="button"
                @click="editor.chain().focus().toggleUnderline().run()"
                :disabled="
                    !editor.can().chain().focus().toggleUnderline().run()
                "
                :class="{ 'is-active': editor.isActive('underline') }"
                title="Underline"
                aria-labelledby="Underline"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                        d="M8 3V12C8 14.2091 9.79086 16 12 16C14.2091 16 16 14.2091 16 12V3H18V12C18 15.3137 15.3137 18 12 18C8.68629 18 6 15.3137 6 12V3H8ZM4 20H20V22H4V20Z"
                        fill="currentColor"
                    ></path>
                </svg>
            </button>
            <!-- Strike -->
            <button
                type="button"
                @click="editor.chain().focus().toggleStrike().run()"
                :disabled="!editor.can().chain().focus().toggleStrike().run()"
                :class="{ 'is-active': editor.isActive('strike') }"
                title="Strikethrough"
                aria-labelledby="Strikethrough"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                        d="M17.1538 14C17.3846 14.5161 17.5 15.0893 17.5 15.7196C17.5 17.0625 16.9762 18.1116 15.9286 18.867C14.8809 19.6223 13.4335 20 11.5862 20C9.94674 20 8.32335 19.6185 6.71592 18.8555V16.6009C8.23538 17.4783 9.7908 17.917 11.3822 17.917C13.9333 17.917 15.2128 17.1846 15.2208 15.7196C15.2208 15.0939 15.0049 14.5598 14.5731 14.1173C14.5339 14.0772 14.4939 14.0381 14.4531 14H3V12H21V14H17.1538ZM13.076 11H7.62908C7.4566 10.8433 7.29616 10.6692 7.14776 10.4778C6.71592 9.92084 6.5 9.24559 6.5 8.45207C6.5 7.21602 6.96583 6.165 7.89749 5.299C8.82916 4.43299 10.2706 4 12.2219 4C13.6934 4 15.1009 4.32808 16.4444 4.98426V7.13591C15.2448 6.44921 13.9293 6.10587 12.4978 6.10587C10.0187 6.10587 8.77917 6.88793 8.77917 8.45207C8.77917 8.87172 8.99709 9.23796 9.43293 9.55079C9.86878 9.86362 10.4066 10.1135 11.0463 10.3004C11.6665 10.4816 12.3431 10.7148 13.076 11H13.076Z"
                        fill="currentColor"
                    ></path>
                </svg>
            </button>
            <!-- Link -->
            <button
                type="button"
                @click="!openingLink ? openLinkPopup() : closeLinkPopup()"
                :class="{ 'is-active': editor.isActive('link') }"
                title="Link"
                aria-labelledby="Link"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M13.0607 8.11097L14.4749 9.52518C17.2086 12.2589 17.2086 16.691 14.4749 19.4247L14.1214 19.7782C11.3877 22.5119 6.95555 22.5119 4.22188 19.7782C1.48821 17.0446 1.48821 12.6124 4.22188 9.87874L5.6361 11.293C3.68348 13.2456 3.68348 16.4114 5.6361 18.364C7.58872 20.3166 10.7545 20.3166 12.7072 18.364L13.0607 18.0105C15.0133 16.0578 15.0133 12.892 13.0607 10.9394L11.6465 9.52518L13.0607 8.11097ZM19.7782 14.1214L18.364 12.7072C20.3166 10.7545 20.3166 7.58872 18.364 5.6361C16.4114 3.68348 13.2456 3.68348 11.293 5.6361L10.9394 5.98965C8.98678 7.94227 8.98678 11.1081 10.9394 13.0607L12.3536 14.4749L10.9394 15.8891L9.52518 14.4749C6.79151 11.7413 6.79151 7.30911 9.52518 4.57544L9.87874 4.22188C12.6124 1.48821 17.0446 1.48821 19.7782 4.22188C22.5119 6.95555 22.5119 11.3877 19.7782 14.1214Z" fill="currentColor"></path></svg>
            </button>
            <!-- Heading 2 -->
            <button
                type="button"
                @click="
                    editor.chain().focus().toggleHeading({ level: 2 }).run()
                "
                :class="{
                    'is-active': editor.isActive('heading', { level: 2 }),
                }"
                title="Heading 2"
                aria-labelledby="Heading 2"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                        d="M4 4V11H11V4H13V20H11V13H4V20H2V4H4ZM18.5 8C20.5711 8 22.25 9.67893 22.25 11.75C22.25 12.6074 21.9623 13.3976 21.4781 14.0292L21.3302 14.2102L18.0343 18H22V20H15L14.9993 18.444L19.8207 12.8981C20.0881 12.5908 20.25 12.1893 20.25 11.75C20.25 10.7835 19.4665 10 18.5 10C17.5818 10 16.8288 10.7071 16.7558 11.6065L16.75 11.75H14.75C14.75 9.67893 16.4289 8 18.5 8Z"
                        fill="currentColor"
                    ></path>
                </svg>
            </button>
            <!-- Heading 3 -->
            <button
                type="button"
                @click="
                    editor.chain().focus().toggleHeading({ level: 3 }).run()
                "
                :class="{
                    'is-active': editor.isActive('heading', { level: 3 }),
                }"
                title="Heading 3"
                aria-labelledby="Heading 3"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                        d="M22 8L21.9984 10L19.4934 12.883C21.0823 13.3184 22.25 14.7728 22.25 16.5C22.25 18.5711 20.5711 20.25 18.5 20.25C16.674 20.25 15.1528 18.9449 14.8184 17.2166L16.7821 16.8352C16.9384 17.6413 17.6481 18.25 18.5 18.25C19.4665 18.25 20.25 17.4665 20.25 16.5C20.25 15.5335 19.4665 14.75 18.5 14.75C18.214 14.75 17.944 14.8186 17.7056 14.9403L16.3992 13.3932L19.3484 10H15V8H22ZM4 4V11H11V4H13V20H11V13H4V20H2V4H4Z"
                        fill="currentColor"
                    ></path>
                </svg>
            </button>
            <!-- Blockquote -->
            <button
                type="button"
                @click="editor.chain().focus().toggleBlockquote().run()"
                :class="{ 'is-active': editor.isActive('blockquote') }"
                title="Blockquote"
                aria-labelledby="Blockquote"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19.4167 6.67891C20.4469 7.77257 21.0001 9 21.0001 10.9897C21.0001 14.4891 18.5436 17.6263 14.9695 19.1768L14.0768 17.7992C17.4121 15.9946 18.0639 13.6539 18.3245 12.178C17.7875 12.4557 17.0845 12.5533 16.3954 12.4895C14.591 12.3222 13.1689 10.8409 13.1689 9C13.1689 7.067 14.7359 5.5 16.6689 5.5C17.742 5.5 18.7681 5.99045 19.4167 6.67891ZM9.41669 6.67891C10.4469 7.77257 11.0001 9 11.0001 10.9897C11.0001 14.4891 8.54359 17.6263 4.96951 19.1768L4.07682 17.7992C7.41206 15.9946 8.06392 13.6539 8.32447 12.178C7.78747 12.4557 7.08452 12.5533 6.39539 12.4895C4.59102 12.3222 3.16895 10.8409 3.16895 9C3.16895 7.067 4.73595 5.5 6.66895 5.5C7.742 5.5 8.76814 5.99045 9.41669 6.67891Z" fill="currentColor"></path></svg>
            </button>
            <!-- CodeBlock -->
            <button
                type="button"
                @click="editor.chain().focus().toggleCodeBlock().run()"
                :class="{ 'is-active': editor.isActive('codeBlock') }"
                title="Code"
                aria-labelledby="Code"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                        d="M24 12L18.3431 17.6569L16.9289 16.2426L21.1716 12L16.9289 7.75736L18.3431 6.34315L24 12ZM2.82843 12L7.07107 16.2426L5.65685 17.6569L0 12L5.65685 6.34315L7.07107 7.75736L2.82843 12ZM9.78845 21H7.66009L14.2116 3H16.3399L9.78845 21Z"
                        fill="currentColor"
                    ></path>
                </svg>
            </button>
            <!-- Unordered List -->
            <button
                type="button"
                @click="editor.chain().focus().toggleBulletList().run()"
                :class="{ 'is-active': editor.isActive('bulletList') }"
                title="Bullets"
                aria-labelledby="Bullets"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                        d="M8 4H21V6H8V4ZM4.5 6.5C3.67157 6.5 3 5.82843 3 5C3 4.17157 3.67157 3.5 4.5 3.5C5.32843 3.5 6 4.17157 6 5C6 5.82843 5.32843 6.5 4.5 6.5ZM4.5 13.5C3.67157 13.5 3 12.8284 3 12C3 11.1716 3.67157 10.5 4.5 10.5C5.32843 10.5 6 11.1716 6 12C6 12.8284 5.32843 13.5 4.5 13.5ZM4.5 20.4C3.67157 20.4 3 19.7284 3 18.9C3 18.0716 3.67157 17.4 4.5 17.4C5.32843 17.4 6 18.0716 6 18.9C6 19.7284 5.32843 20.4 4.5 20.4ZM8 11H21V13H8V11ZM8 18H21V20H8V18Z"
                        fill="currentColor"
                    ></path>
                </svg>
            </button>
            <!-- Ordered List -->
            <button
                type="button"
                @click="editor.chain().focus().toggleOrderedList().run()"
                :class="{ 'is-active': editor.isActive('orderedList') }"
                title="Numbers"
                aria-labelledby="Numbers"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                        d="M8 4H21V6H8V4ZM5 3V6H6V7H3V6H4V4H3V3H5ZM3 14V11.5H5V11H3V10H6V12.5H4V13H6V14H3ZM5 19.5H3V18.5H5V18H3V17H6V21H3V20H5V19.5ZM8 11H21V13H8V11ZM8 18H21V20H8V18Z"
                        fill="currentColor"
                    ></path>
                </svg>
            </button>
            <!-- hr -->
            <button
                type="button"
                @click="editor.chain().focus().setHorizontalRule().run()"
                title="Horizontal Rule"
                aria-labelledby="Horizontal Rule"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                        d="M2 11H4V13H2V11ZM6 11H18V13H6V11ZM20 11H22V13H20V11Z"
                        fill="currentColor"
                    ></path>
                </svg>
            </button>
            <!-- Image -->
            <label title="Image" aria-labelledby="Image">
                <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 11.1005L7 9.1005L12.5 14.6005L16 11.1005L19 14.1005V5H5V11.1005ZM4 3H20C20.5523 3 21 3.44772 21 4V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3ZM15.5 10C14.6716 10 14 9.32843 14 8.5C14 7.67157 14.6716 7 15.5 7C16.3284 7 17 7.67157 17 8.5C17 9.32843 16.3284 10 15.5 10Z" fill="currentColor"></path></svg>
                <input type="file" accept="image/*" @change="uploadImage" class="hidden" />
            </label>
            <!-- Undo -->
            <button
                type="button"
                @click="editor.chain().focus().undo().run()"
                :disabled="!editor.can().undo()"
                title="Undo"
                aria-labelledby="Undo"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                        d="M5.82843 6.99955L8.36396 9.53509L6.94975 10.9493L2 5.99955L6.94975 1.0498L8.36396 2.46402L5.82843 4.99955H13C17.4183 4.99955 21 8.58127 21 12.9996C21 17.4178 17.4183 20.9996 13 20.9996H4V18.9996H13C16.3137 18.9996 19 16.3133 19 12.9996C19 9.68584 16.3137 6.99955 13 6.99955H5.82843Z"
                        fill="currentColor"
                    ></path>
                </svg>
            </button>
            <!-- Redo -->
            <button
                type="button"
                @click="editor.chain().focus().redo().run()"
                :disabled="!editor.can().redo()"
                title="Redo"
                aria-labelledby="Redo"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                        d="M18.1716 6.99955H11C7.68629 6.99955 5 9.68584 5 12.9996C5 16.3133 7.68629 18.9996 11 18.9996H20V20.9996H11C6.58172 20.9996 3 17.4178 3 12.9996C3 8.58127 6.58172 4.99955 11 4.99955H18.1716L15.636 2.46402L17.0503 1.0498L22 5.99955L17.0503 10.9493L15.636 9.53509L18.1716 6.99955Z"
                        fill="currentColor"
                    ></path>
                </svg>
            </button>
        </div>
        <!-- Popups -->
        <div
            ref="linkmodal"
            class="absolute left-0 top-12 z-10 w-full max-w-xl transform rounded border bg-gray-50 p-2 drop-shadow-lg shadow-lg dark:border-gray-900 dark:bg-gray-800"
            v-if="openingLink">
            <div class="flex flex-col">
                <label for="anchorlink" class="text-sm">URL</label>
                <input
                    type="text"
                    id="anchorlink"
                    class="w-full rounded border-gray-300 p-2 text-sm placeholder:text-gray-400 focus:border-gray-300 focus:outline-none focus:ring-0 dark:border-gray-700 dark:bg-gray-700"
                    v-model="anchor.href"
                    placeholder="Enter a URL..."
                    @keydown.enter.prevent="setLink"
                />
                <label class="inline-block text-sm mt-2">
                    <input type="checkbox" v-model="anchor.target" class="rounded" />
                    Open link in new tab
                </label>
            </div>
            <div class="mt-4 flex items-center space-x-2">
                <button
                    type="button"
                    @click="setLink"
                    class="rounded border border-gray-300 px-2 py-0.5 text-xs font-semibold dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    title="Link"
                    aria-labelledby="Link"
                >
                    Link
                </button>
                <button
                    type="button"
                    @click="unsetLink"
                    class="rounded border border-gray-300 px-2 py-0.5 text-xs font-semibold dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    title="Unlink"
                    aria-labelledby="Unlink"
                >
                    Unlink
                </button>
            </div>
        </div>
        <!-- Main Editor -->
        <editor-content
            :editor="editor"
        />
    </div>
</template>
<style lang="scss">
.tiptap-toolbar {
    @apply mx-2 mb-1 mt-2 flex items-center space-x-1 overflow-x-auto whitespace-nowrap rounded-t-md border-none border-gray-200 p-0 pb-1;

    button, label {
        @apply cursor-pointer rounded-md p-1 text-gray-700 focus:outline-none focus-visible:outline-none focus-visible:ring-1;

        &[disabled] {
            @apply cursor-default text-gray-300;
        }

        &:hover {
            @apply bg-gray-200;
        }

        &.is-active {
            @apply bg-gray-200 text-blue-600;
        }

        svg {
            @apply h-6 w-6 fill-current;
        }
    }
}

.dark .tiptap-toolbar {
    button, label {
        @apply text-gray-200;

        &[disabled] {
            @apply text-gray-600;
        }

        &.is-active {
            @apply bg-gray-700 text-blue-600;

            &:hover {
                @apply bg-gray-700;
            }
        }

        &:hover {
            @apply bg-gray-700;
        }
    }
}

.tiptap {
    min-height: 14rem;
    @apply border-t border-gray-300 p-2.5;

    ul,
    ol {
        padding-left: 2rem;
        p {
            margin-top: 0;
            margin-bottom: 0;
        }
    }

    img {
        max-width: 50%;
        height: auto;
        &.ProseMirror-selectednode {
          outline: 3px solid #68CEF8;
        }
    }

    a {
        @apply text-blue-600;
    }
}

.dark .tiptap {
    @apply border-gray-700;
}
</style>
