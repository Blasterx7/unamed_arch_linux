<template>
    <div id="screen" class="h-screen w-full">
        <div class="h-screen w-full backdrop-blur-md flex flex-col justify-center items-center">
            <div class="w-[400px]">
                <v-avatar class="mx-24 my-16" color="black" size="200">
                    <div class="text-h2">
                        A
                    </div>
                </v-avatar>
                <v-form @submit.prevent="go">
                    <v-text-field :error-messages="error" :rules="ruler" v-model="password" :disabled="load.submit"
                        :loading="load.submit" type="password" class="text-white" label="Password">
                        <template #append-inner>
                            <v-btn variant="plain" @click="go" class="bg-transparent">
                                <v-icon>mdi-chevron-right</v-icon>
                            </v-btn>
                        </template>
                    </v-text-field>
                </v-form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const load = reactive({
    submit: false
})

const ruler = ref([
    (v: string) => !!v || 'Password is required'
])
const error = ref('')
const password = ref('')
const router = useRouter()

function go() {
    load.submit = true
    if (password.value === '') {
        load.submit = false
        return
    }
    setTimeout(() => {
        if (password.value === 'ashborn') {
            router.push('/main/tty-error')
        }
        else {
            error.value = 'Invalid password'
        }
        load.submit = false
    }, 3000)
}
</script>

<style scoped>
#screen {
    background: url('~/assets/background/boot.jpg') no-repeat;
    background-size: cover;
}
</style>