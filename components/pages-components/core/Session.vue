<script setup lang="ts">
const password = ref('')
const router = useRouter()

function poweroff() {
    router.push('/dev-null')
}


const load = reactive({
    submit: false
})

const ruler = ref([
    (v: string) => !!v || 'Password is required'
])
const error = ref('')

function go() {
    load.submit = true
    if (password.value === '') {
        load.submit = false
        return
    }
    setTimeout(() => {
        if (password.value === 'ashborn') {
            router.push('/gnome')
        }
        else {
            error.value = 'Invalid password'
        }
        load.submit = false
    }, 3000)
}
</script>

<template>
    <div class="h-screen flex flex-col justify-center items-center w-full">
        <div class="flex justify-between flex-col items-center p-6 h-2/3 w-[80%] backdrop-blur-xl rounded-lg shadow-lg">
            <div class="flex flex-col items-center">
                <div class="text-4xl font-bold text-gray-200 my-5">
                    Welcome to Ashborn Arc
                </div>
                <div class="text-xl text-gray-200 mt-4 w-5/6 text-center">
                    Please login to continue. The password is ashborn
                </div>
            </div>
            <div class="w-1/2">
                <div class="text-gray-200 text-4xl font-bold my-8 text-center">
                    Ash
                </div>
                <div>
                    <v-form @submit.prevent="go">
                        <v-text-field
v-model="password" hint="ashborn" color="purple" :error-messages="error"
                            :rules="ruler" :disabled="load.submit" :loading="load.submit" type="password"
                            class="text-white" label="Password">
                            <template #append-inner>
                                <v-btn variant="plain" class="bg-transparent" @click="go">
                                    <v-icon>mdi-chevron-right</v-icon>
                                </v-btn>
                            </template>
                        </v-text-field>
                    </v-form>
                </div>
            </div>
            <div
class="bg-primary-200 bg-opacity-20 px-20 select-none text-xl py-4 rounded-lg text-gray-200 mt-4 cursor-pointer"
                @click="poweroff()">
                Shutdown
            </div>
        </div>
    </div>
</template>