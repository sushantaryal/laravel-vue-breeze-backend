<script setup>
import { ref, computed } from 'vue'
import { component as CKEditor } from '@ckeditor/ckeditor5-vue'
import {
    ClassicEditor,
    Essentials,
    Autoformat,
    Bold,
    Code,
    Italic,
    Underline,
    BlockQuote,
    Heading,
    Link,
    Paragraph,
    PasteFromOffice,
    Image,
    ImageInsert,
    ImageCaption,
    ImageStyle,
    ImageToolbar,
    ImageUpload,
    ImageResize,
    Table,
    TableCellProperties,
    TableProperties,
    TableToolbar,
    MediaEmbed,
    ListProperties,
    SourceEditing,
    Base64UploadAdapter,
} from 'ckeditor5'

import 'ckeditor5/ckeditor5.css'

const emit = defineEmits(['update:modelValue'])
const props = defineProps(['modelValue'])

const editor = ClassicEditor

const editorData = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value),
})

const editorConfig = {
    plugins: [
        Essentials,
        Autoformat,
        Bold,
        Code,
        Italic,
        Underline,
        BlockQuote,
        Heading,
        Link,
        Paragraph,
        PasteFromOffice,
        Image,
        ImageInsert,
        ImageCaption,
        ImageStyle,
        ImageToolbar,
        ImageUpload,
        ImageResize,
        Table,
        TableCellProperties,
        TableProperties,
        TableToolbar,
        MediaEmbed,
        ListProperties,
        SourceEditing,
        Base64UploadAdapter,
    ],
    toolbar: {
        items: [
            'bold',
            'italic',
            'underline',
            '|',
            'heading',
            '|',
            'link',
            'blockQuote',
            'code',
            'imageInsert',
            'insertTable',
            'mediaEmbed',
            '|',
            'bulletedList',
            'numberedList',
            '|',
            'undo',
            'redo',
            '|',
            'sourceEditing',
        ],
    },
    heading: {
        options: [
            {
                model: 'paragraph',
                title: 'Paragraph',
                class: 'ck-heading_paragraph',
            },
            {
                model: 'heading2',
                view: 'h2',
                title: 'Heading 2',
                class: 'ck-heading_heading2',
            },
            {
                model: 'heading3',
                view: 'h3',
                title: 'Heading 3',
                class: 'ck-heading_heading3',
            },
            {
                model: 'heading4',
                view: 'h4',
                title: 'Heading 4',
                class: 'ck-heading_heading4',
            },
            {
                model: 'heading5',
                view: 'h5',
                title: 'Heading 5',
                class: 'ck-heading_heading5',
            },
            {
                model: 'heading6',
                view: 'h6',
                title: 'Heading 6',
                class: 'ck-heading_heading6',
            },
        ],
    },
    link: {
        decorators: {
            openInNewTab: {
                mode: 'manual',
                label: 'Open in a new tab',
                attributes: {
                    target: '_blank',
                    rel: 'noopener noreferrer',
                },
            },
        },
    },
    image: {
        toolbar: [
            'imageStyle:inline',
            'imageStyle:block',
            'imageStyle:side',
            '|',
            'toggleImageCaption',
            'imageTextAlternative',
            '|',
            'resizeImage',
        ],
        resizeOptions: [
            {
                name: 'resizeImage:original',
                value: null,
                icon: 'original',
                label: 'Original',
            },
            {
                name: 'resizeImage:75',
                value: '75',
                icon: 'large',
                label: '75%',
            },
            {
                name: 'resizeImage:50',
                value: '50',
                icon: 'medium',
                label: '50%',
            },
            {
                name: 'resizeImage:25',
                value: '25',
                icon: 'small',
                label: '25%',
            },
        ],
    },
    table: {
        contentToolbar: [
            'tableColumn',
            'tableRow',
            'mergeTableCells',
            'tableProperties',
            'tableCellProperties',
        ],
    },
}
</script>
<template>
    <div class="prose dark:prose-invert max-w-full">
        <CKEditor
            :editor="editor"
            v-model="editorData"
            :config="editorConfig"
        ></CKEditor>
    </div>
</template>

<style>
.ck.ck-toolbar {
    .ck.ck-dropdown.ck-heading-dropdown {
        @apply w-28;
    }
    .ck.ck-button {
        @apply cursor-pointer rounded-md;
        &.ck-on {
            @apply bg-gray-200 text-blue-600;
        }
        &:focus,
        &:active {
            @apply shadow-none !important;
        }
    }
    @apply rounded-t-md !important;
}
.dark .ck.ck-toolbar {
    @apply rounded-t-md border-gray-700 bg-gray-800 text-gray-200 !important;
    .ck.ck-toolbar__separator {
        @apply bg-gray-700 !important;
    }
    .ck.ck-splitbutton.ck-splitbutton_open .ck.ck-button {
        @apply bg-gray-600 !important;
    }
    .ck.ck-splitbutton:hover
        > .ck-button:not(.ck-on):not(.ck-disabled):not(:hover) {
        @apply bg-gray-600 !important;
    }
}
.dark .ck.ck-reset_all,
.ck-reset_all *:not(.ck-reset_all-excluded *) {
    color: inherit !important;
}

.ck.ck-sticky-panel .ck-sticky-panel__content_sticky {
    top: 65px !important;
}

.ck.ck-sticky-panel__content {
    @apply rounded-t-md !important;
}

.dark .ck.ck-sticky-panel__content {
    @apply border-gray-700 !important;
}

.dark .ck.ck-link-form .ck.ck-list {
    @apply bg-transparent !important;
}

.dark .ck.ck-button {
    &.ck-on {
        @apply bg-gray-700 text-blue-600 !important;
    }
    &.ck-off {
        @apply text-white !important;
    }
}
.dark .ck.ck-dropdown__panel {
    @apply bg-gray-800 !important;
    .ck.ck-button {
        @apply bg-gray-500 hover:bg-gray-600 !important;
        &.ck-on {
            @apply bg-blue-800 text-white !important;
        }
    }
    .ck.ck-list {
        @apply bg-gray-500 !important;
    }
}
.dark .ck-table-properties-form,
.dark .ck-table-cell-properties-form {
    .ck.ck-disabled {
        .ck.ck-input {
            @apply bg-gray-600 !important;
        }
        .ck.ck-label {
            @apply text-gray-200 !important;
        }
    }
    .ck.ck-input {
        @apply bg-gray-700 text-white !important;
    }
    .ck.ck-button.ck-input-color__button.ck-disabled {
        @apply bg-gray-600 !important;
    }
    .ck-form__header__label,
    .ck.ck-label {
        @apply text-white !important;
    }
    .ck-table-form__border-style .ck.ck-label,
    .ck-labeled-field-view_focused .ck.ck-label {
        @apply text-gray-900 !important;
    }
    .ck-table-form__dimension-operator {
        @apply text-white !important;
    }
}
.ck-rounded-corners .ck.ck-dropdown__panel {
    @apply rounded-none !important;
}
.ck.ck-dialog .ck.ck-button {
    @apply cursor-pointer !important;
}
.dark .ck.ck-dialog {
    .ck.ck-input {
        @apply border-black bg-gray-600 !important;
        &:focus {
            @apply shadow-none !important;
        }
    }
    .ck-labeled-field-view_focused .ck.ck-label {
        @apply text-gray-900 !important;
    }
    @apply border-gray-700 bg-gray-800 text-white !important;
}
.dark :is(.ck.ck-button, a.ck.ck-button):not(.ck-disabled):hover,
.dark :is(.ck.ck-button, a.ck.ck-button):not(.ck-disabled):active {
    @apply bg-gray-700;
}
.ck-editor__editable h2 {
    margin-top: 0 !important;
}
.ck-editor__editable {
    min-height: 14rem;
    @apply rounded-b-md !important;
}
figcaption.ck-editor__editable {
    @apply min-h-8 rounded-none !important;
}
.dark .ck-editor__editable {
    @apply border-gray-700 bg-gray-800 text-gray-200 !important;
}
.ck.ck-tooltip__text {
    color: #ffffff !important;
}
.ck-source-editing-area {
    min-height: 14rem;
}
.ck-source-editing-area textarea {
    @apply rounded-b-md border-gray-400 !important;
}
.dark .ck-source-editing-area textarea {
    @apply border-gray-500 bg-gray-800 text-gray-200 !important;
}
.ck.ck-balloon-panel.ck-powered-by-balloon[class*='position_border'] {
    visibility: hidden !important;
}

.dark .ck.ck-balloon-panel.ck-balloon-panel_arrow_nmw::after {
    @apply border-b-gray-700;
}
.dark .ck.ck-balloon-panel {
    @apply bg-gray-700;
}
.ck.ck-image-insert-form {
    .ck.ck-button {
        @apply flex items-center rounded-none !important;
    }
}
</style>
