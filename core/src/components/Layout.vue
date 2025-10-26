<script setup lang="ts">

import { File } from 'lucide-vue-next';
import { Sidebar, SidebarContent, SidebarProvider, SidebarTrigger, SidebarHeader, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/shadcn/components/ui/sidebar';

const items = [
  {
    title: 'Diary.md',
    url: '#',
  },

  {
    title: 'Today\'s Meet at 10:00',
    url: '#',
  },

  {
    title: 'README.md',
    url: '#',
  },

  {
    title: 'Research #2',
    url: '#',
  },

  {
    title: 'Very Important Secret.flext',
    url: '#',
  },

  {
    title: 'Untitled',
    url: '#',
  },
];

</script>

<template>
  <SidebarProvider width="16rem">
    <Sidebar class="jetdocs_layout border-none">
      <SidebarContent class="gap-5">
        <SidebarHeader class="h-16 px-6 flex-row items-center">
          JetDocs
        </SidebarHeader>

        <SidebarGroup class="h-full px-4 py-0">
          <SidebarGroupContent>
            <SidebarMenu class="gap-2">
              <SidebarMenuItem v-for="item in items" :key="item.title">
                <SidebarMenuButton asChild>
                  <a :href="item.url">
                    <File />
                    <span>{{item.title}}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>

    <main class="jetdocs_layout_inner w-full flex flex-col">
      <div class="jetdocs_layout_header w-full h-16 px-4 flex items-center gap-4">
        <SidebarTrigger />
        12345
      </div>

      <!--<div v-else class="jetdocs_layout_header w-full h-14 px-4 pt-2 flex items-center gap-4">-->
      <!--  <SidebarTrigger />-->
      <!--  12345-->
      <!--</div>-->

      <div class="jetdocs_layout_content w-full h-full flex flex-col overflow-y-scroll shrink">
        <slot />
      </div>

      <!--<div v-else class="jetdocs_layout_content w-full h-full px-6 py-2 flex flex-col overflow-y-scroll shrink">-->
      <!--  <slot />-->
      <!--</div>-->
    </main>
  </SidebarProvider>
</template>