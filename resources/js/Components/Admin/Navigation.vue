<script setup>
import NavItem from './NavItem.vue'
import {
    HomeIcon,
    PhotoIcon,
    GlobeAltIcon,
    MapIcon,
    Square3Stack3DIcon,
    ChatBubbleBottomCenterTextIcon,
    ListBulletIcon,
} from '@heroicons/vue/24/outline'

const navItems = [
    {
        href: route('admin.dashboard'),
        active: route().current('admin.dashboard'),
        label: 'Dashboard',
        show: true,
        children: [],
        icon: HomeIcon,
    },
    {
        href: '#',
        active: true,
        label: 'Content',
        show: true,
        icon: null,
        children: [
            {
                href: '#',
                active: false,
                label: 'Sliders',
                show: true,
                children: [],
                icon: PhotoIcon,
            },
            {
                href: '#',
                active: true,
                label: 'Countries',
                show: true,
                children: [],
                icon: GlobeAltIcon,
            },
            {
                href: '#',
                active: false,
                label: 'Destinations',
                show: true,
                children: [],
                icon: MapIcon,
            },
            {
                href: '#',
                active: false,
                label: 'Packages',
                show: true,
                children: [],
                icon: Square3Stack3DIcon,
            },
            {
                href: '#',
                active: false,
                label: 'Testimonials',
                show: true,
                children: [],
                icon: ChatBubbleBottomCenterTextIcon,
            },
            {
                href: '#',
                active: false,
                label: 'Menus',
                show: true,
                children: [],
                icon: ListBulletIcon,
            },
        ],
    },
]
</script>

<template>
    <div
        class="sticky top-[65px] h-full max-h-[calc(100vh-65px)] w-full overflow-y-auto px-4 py-6"
    >
        <ul>
            <li v-for="item in navItems" :key="item.label">
                <NavItem :item="item" />
            </li>
        </ul>
    </div>
</template>
