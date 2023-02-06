<template>
  <section class="sort-popup">
    <div class="sort-popup__container">
      <div class="sort-popup__container-title">Сортировка</div>
      <div class="sort-popup__container-element">
        <VRadio v-model="type" val="date">По дате</VRadio>
      </div>
      <div class="sort-popup__container-element">
        <VRadio v-model="type" val="time">По затреканному времени</VRadio>
      </div>
      <div class="sort-popup__container-element">
        <VRadio v-model="type" val="status">По статусу</VRadio>
      </div>
      <div class="sort-popup__container-element">
        <VRadio v-model="type" val="alphabet">По алфавиту</VRadio>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'PopupComponent',
  props: {
    sortType: String
  },
  emits: ['sort'],
  data() {
    return {
      type: ''
    }
  },
  watch: {
    type(val) {
      this.$emit('sort', val)
    }
  },
  created() {
    this.type = this.sortType
  }
}
</script>
