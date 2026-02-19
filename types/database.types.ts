export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            dcode_apps: {
                Row: {
                    id: string
                    created_at: string
                    user_id: string
                    name: string
                    code: string
                    is_public: boolean
                }
                Insert: {
                    id?: string
                    created_at?: string
                    user_id: string
                    name: string
                    code?: string
                    is_public?: boolean
                }
                Update: {
                    id?: string
                    created_at?: string
                    user_id?: string
                    name?: string
                    code?: string
                    is_public?: boolean
                }
            }
        }
    }
}
