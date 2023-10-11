import { ref, readonly, watch } from 'vue';

export default function useStore() {
    const storage = storageNotas();
    const notes = ref(storage.get());

    watch(notes, (newNotes, oldNotes) => {
        storage.set(newNotes);
    });

    const push = (note) => {
        notes.value.push(note);
    }

    const remove = ({ id }) => {
        notes.value = notes.value.filter((note, index) => {
            if (index === id) {
                return;
            }
            return note;
        });
    }

    const edit = ({ id, note }) => {
        notes.value = notes.value.map((noteOld, index) => {
            if (index === id) {
                return note;
            }
            return noteOld;
        });
    }

    return {
        notes: readonly(notes),
        push,
        remove,
        edit,
    }
};

function storageNotas() {
    const localStorageName = "Notas";
    let dataInfo = [];
    return {
        get() {
            let storage = localStorage.getItem(localStorageName);

            if (storage == undefined) {
                this.set();
                storage = localStorage.getItem(localStorageName);
            } else if (JSON.parse(storage).data == undefined) {
                localStorage.clear();
                this.get();
            }

            return JSON.parse(storage).data;
        },
        set(data = dataInfo) {
            localStorage.setItem(localStorageName, JSON.stringify({ data }));
        },
    }
}

