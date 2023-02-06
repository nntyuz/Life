<template>
  <section class="folders">
    <div class="folders__container">
      <VInput
        v-model="folderName"
        type="text"
        icon="folderPlus"
        placeholder="Добавить задачу"
        maxlength="32"
        @keydown.enter="addFolder"
      />

      <router-link
        v-for="(item, index) in folders"
        :key="index"
        :to="`/folder/${item.id}`"
        :class="[
          'folder',
          { folder__archive: item.name === 'Архив', folder__active: item.id === folderId }
        ]"
      >
        <VIcon v-if="item.id === 'archive'" name="archive" />
        {{ item.name }}
        <button @click.capture="deleteFolder(item.id)">
          <VIcon v-if="!['archive', 'main'].includes(item.id)" name="close" />
        </button>
      </router-link>
    </div>
  </section>
</template>

<script>
import { nanoid } from 'nanoid'
import { useMainStore } from '../../stores/main.js'
import { mapState } from 'pinia'

export default {
  name: 'FoldersComponent',
  data() {
    return {
      folderName: ''
    }
  },
  computed: {
    ...mapState(useMainStore, {
      folders: (store) => store.folders,
      currentTask: (store) => store.currentTask
    }),
    folderId() {
      return this.$route.params.id
    }
  },
  methods: {
    addFolder() {
      const store = useMainStore()
      const currentFolder = {
        id: nanoid(),
        name: this.folderName
      }
      store.addFolder(currentFolder)
      this.folderName = ''
    },
    deleteFolder(removeFolderId) {
      const warningText = 'Вы точно уверены, что хотите удалить папку?'
      if (confirm(warningText) === true) {
        if (removeFolderId === this.folderId) this.$router.push('folder/')
        const store = useMainStore()
        store.removeFolder(removeFolderId)
      }
    }
  }
}
</script>
