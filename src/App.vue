<script>
import TextArea from './components/TextArea.vue';
import useStore from './store/store';

export default {
  components: {
    TextArea,
  },
  setup() {
    const store = useStore();
    const notes = store.notes;
    store.push("My \nNote");
    const addNotes = () => {
      store.push("");
    }

    const remover = ({ id }) => {
      if (confirm("Are you sure you want to remove this note?")) {
        store.remove({ id });
      }
    };

    const edit = ({ id, note }) => {
      store.edit({ id, note });
    };

    return {
      notes,
      addNotes,
      remover,
      edit
    }
  }
}
</script>

<template>
  <main>
    <header class="header-app screen">
      <h1 class="title">Notes</h1>
      <div class="menu-note">
        <button class="new-note" @click="addNotes"> New Note </button>
      </div>
    </header>
    <div class="content">
      <TextArea @remover="remover" @edit="edit" v-for="(note, key) in notes" v-bind:key="key" :note=note
        :id=key></TextArea>
    </div>
  </main>
</template>

<style scoped>
.header-app {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid white;
  padding: .5em 1em;
  margin: 1em;
}

.header-app>.title {
  flex-grow: 1;
  text-align: center;
  color: white;
}

.header-app>.menu-note {
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}
</style>
