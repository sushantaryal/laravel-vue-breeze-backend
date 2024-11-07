import defaultTheme from 'tailwindcss/defaultTheme'
import colors from 'tailwindcss/colors'
import forms from '@tailwindcss/forms'
import typography from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/admin.blade.php',
        './resources/js/Layouts/AuthenticatedLayout.vue',
        './resources/js/Layouts/GuestLayout.vue',
        './resources/js/Components/Admin/**/*.vue',
        './resources/js/Pages/Admin/**/*.vue',
    ],

    darkMode: 'class',

    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                primary: colors.blue,
            },
        },
    },

    plugins: [forms, typography],
}
