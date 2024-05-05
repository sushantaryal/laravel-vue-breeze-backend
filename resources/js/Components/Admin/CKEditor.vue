<script setup>
import { ref, watch } from 'vue'
import { component as CKEditor } from '@ckeditor/ckeditor5-vue'
import { ClassicEditor } from '@ckeditor/ckeditor5-editor-classic'
import { Essentials } from '@ckeditor/ckeditor5-essentials'
import { Autoformat } from '@ckeditor/ckeditor5-autoformat'
import { Bold, Code, Italic, Underline } from '@ckeditor/ckeditor5-basic-styles'
import { BlockQuote } from '@ckeditor/ckeditor5-block-quote'
import { Heading } from '@ckeditor/ckeditor5-heading'
import { Link } from '@ckeditor/ckeditor5-link'
import { Paragraph } from '@ckeditor/ckeditor5-paragraph'
import { PasteFromOffice } from '@ckeditor/ckeditor5-paste-from-office'
import { Image, ImageCaption, ImageStyle, ImageToolbar, ImageUpload, PictureEditing } from '@ckeditor/ckeditor5-image'
import { Table, TableToolbar } from '@ckeditor/ckeditor5-table'
import { MediaEmbed } from '@ckeditor/ckeditor5-media-embed';
import { List } from '@ckeditor/ckeditor5-list'
import { SourceEditing } from '@ckeditor/ckeditor5-source-editing'
import { Base64UploadAdapter } from '@ckeditor/ckeditor5-upload'

const emit = defineEmits(['update:modelValue'])
const props = defineProps(['modelValue'])

const editorData = ref(props.modelValue)

watch(editorData, (value) => {
	emit('update:modelValue', value)
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
		ImageCaption,
		ImageStyle,
		ImageToolbar,
		ImageUpload,
		Table,
		TableToolbar,
		MediaEmbed,
		List,
		SourceEditing,
		Base64UploadAdapter,
	],
	toolbar: {
		items: [
			'undo', 'redo',
			'|', 'heading',
			'|', 'bold', 'italic', 'underline',
			'|', 'link', 'blockQuote', 'code', 'uploadImage', 'insertTable', 'mediaEmbed',
			'|', 'bulletedList', 'numberedList',
			'|', 'sourceEditing',
		],
	},
	image: {
		toolbar: [
			'imageStyle:inline',
			'imageStyle:block',
			'imageStyle:side',
			'|',
			'toggleImageCaption',
			'imageTextAlternative'
		]
	},
	table: {
        contentToolbar: [
            'tableColumn', 'tableRow', 'mergeTableCells',
        ]
    },
}
</script>
<template>
	<CKEditor :editor="ClassicEditor" v-model="editorData" :config="editorConfig"></CKEditor>
</template>

<style>
.ck.ck-toolbar {
	.ck.ck-button {
		@apply cursor-pointer rounded-md;
		&.ck-on {
			@apply bg-gray-200 text-blue-600;
		}
	}
}
.dark .ck.ck-toolbar {
	@apply border-gray-700 bg-gray-800 text-gray-200 rounded-t-md !important;
	.ck.ck-toolbar__separator {
		@apply bg-gray-700 !important;
	}
}
.dark .ck.ck-reset_all, .ck-reset_all *:not(.ck-reset_all-excluded *) {
	color: inherit !important;
}
.dark .ck.ck-button {
	&.ck-on {
		@apply bg-gray-700 text-blue-600 !important;
	}
}
.dark .ck.ck-dropdown__panel {
	@apply bg-gray-800 !important;
	.ck.ck-button {
		@apply bg-gray-500 !important;
	}
}
.dark :is(.ck.ck-button,a.ck.ck-button):not(.ck-disabled):hover {
	@apply bg-gray-700;
}
.ck-editor__editable {
	min-height: 14rem;
	@apply rounded-b-md !important;
}
.dark .ck-editor__editable {
	@apply border-gray-700 bg-gray-800 text-gray-200 !important;
}
</style>
