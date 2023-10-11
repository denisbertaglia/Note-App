<script>
import { ref, toRefs, watch } from 'vue'

export default {
    emits: ['edit'],
    props: {
        note: {
            type: String,
            default: ""
        },
        id: {
            type: Number,
            default: 0,
        }
    },
    setup(props, { emit }) {
        const { note, id } = toRefs(props);
        const noteReader = ref(note.value);
        const editable = ref(false);
        const efect = ref();
        const edit = () => {
            emit('edit', {
                id: id.value,
                note: efect.value.outerText,
            });
        };

        const remover = () => {
            emit('remover', { id: props.id });
        };

        watch([editable, note], ([editable, note], [editablePrev, notePrev]) => {
            if (!editable) {
                noteReader.value = note;
            }
        });

        return {
            note: noteReader,
            efect,
            editable,
            edit,
            remover,
        }
    }
}
</script>

<template>
    <div class="note-editor">
        <div class="note-menu">
            <button @click="remover">Remove</button>
        </div>
        <div class="note" @focus="editable = true" @blur="editable = false" contenteditable="true" ref="efect"
            @input="edit">{{ note }}</div>
    </div>
</template>

<style scoped>

.note-editor {
    display: grid;
    grid-template-columns: 1fr;
    border: 1px solid white;
    padding: 1em;
    margin: 1em;
}

.note-editor>.note {
    white-space: pre-wrap;
    width: 100%;
    min-height: 30vh;
    background-color: white;
    color: black;
    padding: 2px;
    border-radius: 2px;
    border: 2px solid white;
    font-size: 1rem;
    margin-top: 1em;
}

.note-editor>.note-menu {
    display: flex;
    align-items: center;
    justify-content: right;
}

.note-editor>.editor {
    width: 100%;
    min-height: 30vh;
    resize: none;
    font-size: 1rem;
}
</style>