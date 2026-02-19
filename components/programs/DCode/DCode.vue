<script setup lang="ts">
import { useDCodeStore } from '~/stores/dcode.store'
import DynamicRunner from './DynamicRunner.vue'
import { TStatus } from '~/shared/types'

const dcodeStore = useDCodeStore()
const processStore = useProcessStore()
const supabase = useSupabaseClient()
const user = useSupabaseUser()

// UI State
const email = ref('')
const password = ref('')
const isRegister = ref(false)
const message = ref('')

// Editor State
const newAppName = ref('')
const showNewAppDialog = ref(false)

// Actions
const handleAuth = async () => {
    message.value = ''
    try {
        if (isRegister.value) {
            const { error } = await supabase.auth.signUp({
                email: email.value,
                password: password.value
            })
            if (error) throw error
            message.value = 'Inscription réussie ! Vérifiez votre email.'
        } else {
            const { error } = await supabase.auth.signInWithPassword({
                email: email.value,
                password: password.value
            })
            if (error) throw error
        }
    } catch (e: any) {
        message.value = e.message
    }
}

const logout = async () => {
    await supabase.auth.signOut()
    dcodeStore.currentApp = null
    dcodeStore.apps = []
}

const createNewApp = async () => {
    if (!newAppName.value) return
    await dcodeStore.createApp(newAppName.value)
    newAppName.value = ''
    showNewAppDialog.value = false
}

const runApp = () => {
    if (!dcodeStore.currentApp) return
    
    const processId = `app-${dcodeStore.currentApp.id}-${Date.now()}`
    
    // Création d'un wrapper pour passer le code en prop à DynamicRunner
    const AppWrapper = defineComponent({
        render() {
            return h(DynamicRunner, { code: dcodeStore.currentApp.code })
        }
    })
    
    processStore.addProcess({
        id: processId,
        name: `[Run] ${dcodeStore.currentApp.name}`,
        icon: 'mdi-play-circle-outline',
        status: TStatus.NORM,
        key: 0,
        description: 'DCode Runtime',
        program: {
            id: processId,
            name: dcodeStore.currentApp.name,
            icon: 'mdi-application',
            components: markRaw(AppWrapper)
        }
    })
}

const editorRef = ref<HTMLTextAreaElement | null>(null)

const insertTab = (e: KeyboardEvent) => {
    if (!dcodeStore.currentApp || !editorRef.value) return
    
    // @ts-ignore
    const start = editorRef.value.selectionStart
    // @ts-ignore
    const end = editorRef.value.selectionEnd
    
    const spaces = '  '
    dcodeStore.currentApp.code = dcodeStore.currentApp.code.substring(0, start) + spaces + dcodeStore.currentApp.code.substring(end)
    
    nextTick(() => {
        if (editorRef.value) {
            // @ts-ignore
            editorRef.value.selectionStart = editorRef.value.selectionEnd = start + spaces.length
        }
    })
}

// Watcher pour charger les apps à la connexion
watch(user, async (newUser) => {
    if (newUser) {
        await dcodeStore.fetchApps()
    }
}, { immediate: true })

</script>

<template>
    <div class="h-full w-full bg-[#1a1b26] text-white flex flex-col overflow-hidden relative">
        <!-- Auth Screen -->
        <div v-if="!user" class="absolute inset-0 z-50 bg-[#1a1b26] flex flex-col items-center justify-center p-8">
            <h1 class="text-3xl font-bold mb-8 text-primary-100">DCode Login</h1>
            <div class="w-full max-w-sm space-y-4">
                <input v-model="email" type="email" placeholder="Email" class="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 focus:outline-none focus:border-primary-100">
                <input v-model="password" type="password" placeholder="Mot de passe" class="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 focus:outline-none focus:border-primary-100" @keyup.enter="handleAuth">
                
                <div v-if="message" class="text-red-400 text-sm text-center">{{ message }}</div>
                
                <button @click="handleAuth" class="w-full bg-primary-100 hover:bg-primary-200 text-white font-bold py-2 px-4 rounded transition-colors">
                    {{ isRegister ? 'S\'inscrire' : 'Se connecter' }}
                </button>
                
                <div class="text-center text-sm text-gray-400 cursor-pointer hover:text-white" @click="isRegister = !isRegister">
                    {{ isRegister ? 'Déjà un compte ? Se connecter' : 'Pas de compte ? S\'inscrire' }}
                </div>
            </div>
            <div class="mt-8 text-xs text-center text-gray-500 max-w-xs">
                Note: DCode nécessite un compte pour sécuriser votre environnement de développement personnel.
            </div>
        </div>

        <!-- Main Interface -->
        <div v-else class="flex h-full">
            <!-- Sidebar -->
            <div class="w-64 bg-gray-900 border-r border-gray-800 flex flex-col">
                <div class="p-4 border-b border-gray-800 font-bold flex justify-between items-center">
                    <span>EXPLORER</span>
                    <button @click="showNewAppDialog = !showNewAppDialog" class="text-xs bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded">+</button>
                </div>
                
                <!-- New App Input -->
                <div v-if="showNewAppDialog" class="p-2 bg-gray-800">
                    <input v-model="newAppName" placeholder="Nom de l'app" class="w-full text-xs bg-black text-white p-1 mb-1 border border-gray-600" @keyup.enter="createNewApp">
                </div>

                <!-- App List -->
                <div class="flex-1 overflow-y-auto">
                    <div v-if="dcodeStore.isLoading" class="p-4 text-xs text-gray-500">Chargement...</div>
                    <div v-for="app in dcodeStore.apps" :key="app.id" 
                         class="px-4 py-2 text-sm cursor-pointer hover:bg-gray-800 flex justify-between group"
                         :class="{'bg-gray-800 text-primary-100': dcodeStore.currentApp?.id === app.id}"
                         @click="dcodeStore.currentApp = app">
                        <span>{{ app.name }}</span>
                        <button @click.stop="dcodeStore.deleteApp(app.id)" class="hidden group-hover:block text-red-400 hover:text-red-300">x</button>
                    </div>
                </div>

                <!-- User Info -->
                <div class="p-4 border-t border-gray-800 text-xs text-gray-400 flex justify-between items-center">
                    <div class="truncate w-32">{{ user.email }}</div>
                    <button @click="logout" class="hover:text-white">Exit</button>
                </div>
            </div>

            <!-- Editor Area -->
            <div class="flex-1 flex flex-col bg-[#1e1e1e]">
                <div v-if="dcodeStore.currentApp" class="flex-1 flex flex-col h-full">
                    <!-- Tabs / Toolbar -->
                    <div class="h-10 bg-[#252526] flex items-center px-4 border-b border-gray-800 space-x-4">
                        <span class="text-sm text-white">{{ dcodeStore.currentApp.name }}.vue</span>
                        <div class="flex-1"></div>
                        <button class="text-green-400 hover:text-green-300 text-xs flex items-center gap-1" @click="dcodeStore.saveApp(dcodeStore.currentApp.id, dcodeStore.currentApp.code)">
                            <span>[SAVE]</span>
                        </button>
                        <button class="text-blue-400 hover:text-blue-300 text-xs flex items-center gap-1" @click="runApp">
                            <span>[RUN]</span>
                        </button>
                    </div>
                    
                    <!-- Editor (Simple Textarea for now) -->
                    <textarea 
                        v-model="dcodeStore.currentApp.code"
                        class="flex-1 w-full bg-[#1e1e1e] text-gray-300 p-4 font-mono text-sm resize-none focus:outline-none"
                        spellcheck="false"
                        @keydown.tab.prevent="insertTab"
                        ref="editorRef"
                    ></textarea>
                </div>
                <div v-else class="flex-1 flex items-center justify-center text-gray-600">
                    Sélectionnez ou créez une application pour commencer.
                </div>
            </div>
        </div>
    </div>
</template>