import { defineStore } from 'pinia'

export const useDCodeStore = defineStore('dcode', () => {
    const supabase = useSupabaseClient()
    const user = useSupabaseUser()

    // State
    const apps = ref<any[]>([])
    const currentApp = ref<any>(null)
    const isLoading = ref(false)
    const error = ref<string | null>(null)

    // Actions
    const fetchApps = async () => {
        if (!user.value) return
        isLoading.value = true
        error.value = null
        try {
            const { data, error: err } = await supabase
                .from('dcode_apps')
                .select('*')
                .eq('user_id', user.value.id)
                .order('created_at', { ascending: false })

            if (err) throw err
            apps.value = data || []
        } catch (e: any) {
            error.value = e.message
        } finally {
            isLoading.value = false
        }
    }

    const createApp = async (name: string) => {
        if (!user.value) return
        isLoading.value = true
        error.value = null
        try {
            const { data, error: err } = await supabase
                .from('dcode_apps')
                .insert({
                    user_id: user.value.id,
                    name,
                    code: '<template>\n  <div class="p-4 text-white">\n    Hello DCode!\n  </div>\n</template>\n\n<script setup>\n// Your logic here\n</script>',
                    is_public: false
                })
                .select()
                .single()

            if (err) throw err
            if (data) {
                apps.value.unshift(data)
                currentApp.value = data
            }
        } catch (e: any) {
            error.value = e.message
        } finally {
            isLoading.value = false
        }
    }

    const saveApp = async (appId: string, code: string) => {
        isLoading.value = true
        try {
            const { error: err } = await supabase
                .from('dcode_apps')
                .update({ code })
                .eq('id', appId)

            if (err) throw err

            // Update local state
            const index = apps.value.findIndex(a => a.id === appId)
            if (index !== -1) {
                apps.value[index].code = code
            }
        } catch (e: any) {
            error.value = e.message
        } finally {
            isLoading.value = false
        }
    }

    const deleteApp = async (appId: string) => {
        isLoading.value = true
        try {
            const { error: err } = await supabase
                .from('dcode_apps')
                .delete()
                .eq('id', appId)

            if (err) throw err
            apps.value = apps.value.filter(a => a.id !== appId)
            if (currentApp.value?.id === appId) {
                currentApp.value = null
            }
        } catch (e: any) {
            error.value = e.message
        } finally {
            isLoading.value = false
        }
    }

    return {
        user,
        apps,
        currentApp,
        isLoading,
        error,
        fetchApps,
        createApp,
        saveApp,
        deleteApp
    }
})
