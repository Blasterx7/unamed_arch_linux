<script setup lang="ts">
const procesStore = useProcessStore()
const confirm = ref(false)
const transId = ref('')

function deleteProcess() {
    procesStore.removeProcess(transId.value)
    confirm.value = false
}

function deleteP(id: string) {
    confirm.value = true
    transId.value = id
}
</script>

<template>
    <div class="p-4">
        <div class="text-4xl tracking-widest font-bold">
            Tâches en cours d'exécution
        </div>
        <div>
            <div>
                <div class="text-xl">
                    - Tâche courante
                </div>
                <div
                    class="py-4 my-2 px-6 hover:bg-primary-100 flex justify-between transition-colors duration-300 ease-in-out">
                    <div class="my-auto">
                        {{ procesStore.currentProcess?.name }}
                    </div>
                    <v-btn variant="text" @click="deleteP(procesStore.currentProcess?.id ?? '')">
                        <v-icon>
                            mdi-delete
                        </v-icon>
                    </v-btn>
                </div>
            </div>
            <div>
                <div class="text-xl">
                    - Tâche secondaires
                </div>
                <div v-if="procesStore.processes.length > 0">
                    <div class="py-4 flex justify-between my-2 hover:bg-primary-100 transition-colors duration-300 ease-in-out"
                        v-for="p in procesStore.processes" :key="p.id">
                        <div class="my-auto">
                            {{ p.name }}
                        </div>
                        <v-btn variant="text" @click="deleteP(p.id)">
                            <v-icon>
                                mdi-delete
                            </v-icon>
                        </v-btn>
                    </div>
                </div>
                <div v-else class="font-bold">
                    Aucune tâche secondaire
                </div>
            </div>
        </div>
        <v-dialog v-model="confirm">
            <v-card width="550" class="mx-auto">
                <v-card-title>
                    Delete process
                </v-card-title>
                <v-card-title>
                    Etes-vous sur de vouloir terminer ce processus ?
                </v-card-title>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="confirm = false">
                        Non
                    </v-btn>
                    <v-btn color="red" @click="deleteProcess()">
                        Oui
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>