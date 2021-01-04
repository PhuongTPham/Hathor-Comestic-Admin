<template>
  <b-modal :id="idModal" no-close-on-backdrop size="sm" :title="titleModal">
    <div>{{ contentModal }}</div>
    <template #modal-footer="">
      <b-button size="sm" variant="danger" @click="cancel"> Không </b-button>
      <b-button size="sm" variant="success" @click="submit"> Có </b-button>
    </template>
  </b-modal>
</template>

<script>
export default {
  props: {
    idModal: {
      type: String,
    },
    titleModal: {
      type: String,
    },
    contentModal: {
      type: String,
    },
    selectedListId: {
      type: Array,
    },
  },
  methods: {
    async submit() {
      const payload = {
        list_id: this.selectedListId,
      };
      await this.$store.dispatch('deleteAccount', payload);
      this.$bvModal.hide(`${this.idModal}`);
      await this.$store.dispatch('getAccount');
    },
    cancel() {
      this.$bvModal.hide(`${this.idModal}`);
    },
  },
};
</script>

<style lang='scss' scoped>
</style>
