<template>
    <div class="flex flex-col justify-center items-center h-screen w-full">
        <div class="text-4xl font-bold text-gray-200 my-5">
            Disclaimer
        </div>
        <div class="text-xl text-gray-200 mt-4 w-2/3 text-center">
            You are running an unstable beta version of Codename Arc. Make
            sure you are running Codename Arc in a safe testing environment
            such as a virtual machine. You may experience unexpected crashes
            and slow performance, and you may lose your work frequently.
        </div>
        <div class="mt-16 text-xl text-white">
            <v-checkbox-btn>
                <template #label="slotProps">
                    I understand these risks and wish to continue.
                </template>
            </v-checkbox-btn>
        </div>
        <div class="bg-primary-200 px-20 select-none text-xl py-4 rounded-lg text-gray-200 mt-4 cursor-pointer">
            Continue
        </div>
    </div>
</template>