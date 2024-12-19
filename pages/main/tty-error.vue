<template>
    <div class="h-screen overflow-auto w-screen bg-black text-green-400 font-mono flex flex-col p-4">
        <div>
            System error. The base ui of the system were corrupted so i remove it. please install another with good
            command
            <br>
            First use sudo apt install ui-ash-desktop
            <br>
            That command will add interface package to the system... I think...
            <br>
            To be sure you can man it to ckeck thing about the package
        </div>
        <div class="mt-10">
            <div v-for="(output, index) in outputs" :key="index" class="mb-2">
                <pre>{{ output }}</pre>
            </div>
        </div>
        <div class="flex space-x-2" v-if="load">
            <div>
                ashborn@overlord_$
            </div>

            <textarea autofocus v-model="command" @keyup.enter="executeCommand"
                class="w-full bg-black text-green-400 border-none focus:outline-none resize-none" rows="1"
                placeholder="|"></textarea>
        </div>
    </div>
</template>

<script setup>
const command = ref('');
const outputs = ref([]);
const locker = ref(false);
const router = useRouter();
const load = ref(true)
const listCommands = ref([
    'help',
    "clear",
    "apt install ui-ash-desktop",
    "sudo apt install ui-ash-desktop",
    'exit',
])

function installation() {
    setTimeout(() => {
        outputs.value.push("[sudo] password for user: ********");
        setTimeout(() => {
            outputs.value.push("Reading package lists... Done.");
            setTimeout(() => {
                outputs.value.push("Building dependency tree... Done.");
                setTimeout(() => {
                    outputs.value.push("Reading state information... Done.");
                    setTimeout(() => {
                        outputs.value.push("The following additional packages will be installed:");
                        outputs.value.push("  dconf-cli dconf-gsettings-backend dconf-service gnome-session-bin");
                        outputs.value.push("  gnome-session-common gnome-settings-daemon gnome-shell gnome-shell-common");
                        outputs.value.push("  gnome-shell-extension-prefs gnome-terminal libdconf1 libgnome-desktop-3-20");
                        outputs.value.push("  libmutter-12-0 mutter-common");
                        outputs.value.push("");
                        setTimeout(() => {
                            outputs.value.push("Suggested packages:");
                            outputs.value.push("  gnome-control-center");
                            setTimeout(() => {
                                outputs.value.push("The following NEW packages will be installed:");
                                outputs.value.push("  dconf-cli dconf-gsettings-backend dconf-service gnome-session");
                                outputs.value.push("  gnome-session-bin gnome-session-common gnome-settings-daemon");
                                outputs.value.push("  gnome-shell gnome-shell-common gnome-shell-extension-prefs");
                                outputs.value.push("  gnome-terminal libdconf1 libgnome-desktop-3-20 libmutter-12-0");
                                outputs.value.push("  mutter-common");
                                outputs.value.push("0 upgraded, 16 newly installed, 0 to remove and 12 not upgraded.");
                                outputs.value.push("Need to get 36.1 MB of archives.");
                                outputs.value.push("After this operation, 128 MB of additional disk space will be used.");
                                outputs.value.push("Do you want to continue? [Y/n] y");
                                setTimeout(() => {
                                    outputs.value.push("Get:1 http://deb.debian.org/debian bookworm/main amd64 dconf-service 0.40.0-2 [25.3 kB]");
                                    setTimeout(() => {
                                        outputs.value.push("Get:2 http://deb.debian.org/debian bookworm/main amd64 dconf-cli 0.40.0-2 [21.4 kB]");
                                        setTimeout(() => {
                                            outputs.value.push("Get:3 http://deb.debian.org/debian bookworm/main amd64 libdconf1 0.40.0-2 [37.6 kB]");
                                            setTimeout(() => {
                                                outputs.value.push("Fetched 36.1 MB in 4s (8,900 kB/s)");
                                                setTimeout(() => {
                                                    outputs.value.push("Selecting previously unselected package libdconf1:amd64.");
                                                    setTimeout(() => {
                                                        outputs.value.push("(Reading database ... 210000 files and directories currently installed.)");
                                                        setTimeout(() => {
                                                            outputs.value.push("Preparing to unpack .../libdconf1_0.40.0-2_amd64.deb ...");
                                                            setTimeout(() => {
                                                                outputs.value.push("Unpacking libdconf1:amd64 (0.40.0-2) ...");
                                                                setTimeout(() => {
                                                                    outputs.value.push("Setting up dconf-service (0.40.0-2) ...");
                                                                    outputs.value.push("Setting up dconf-cli (0.40.0-2) ...");
                                                                    outputs.value.push("Setting up libdconf1:amd64 (0.40.0-2) ...");
                                                                    outputs.value.push("Selecting previously unselected package dconf-gsettings-backend:amd64.");
                                                                    outputs.value.push("Preparing to unpack .../dconf-gsettings-backend_0.40.0-2_amd64.deb ...");
                                                                    outputs.value.push("Unpacking dconf-gsettings-backend:amd64 (0.40.0-2) ...");
                                                                    outputs.value.push("Setting up gnome-session-common (3.38.0-4) ...");
                                                                    outputs.value.push("Setting up gnome-session-bin (3.38.0-4) ...");
                                                                    setTimeout(() => {
                                                                        outputs.value.push("Processing triggers for gnome-menus (3.38.0-1) ...");
                                                                        outputs.value.push("Processing triggers for desktop-file-utils (0.26-1) ...");
                                                                        outputs.value.push("Processing triggers for mime-support (3.66) ...");
                                                                        outputs.value.push("Processing triggers for hicolor-icon-theme (0.17-2) ...");
                                                                        outputs.value.push("Processing triggers for libglib2.0-0:amd64 (2.70.2-1) ...");
                                                                        outputs.value.push("Processing triggers for libc-bin (2.31-13+deb11u7) ...");
                                                                        outputs.value.push("Processing triggers for man-db (2.9.4-2) ...");
                                                                        router.push('/main/gnome')
                                                                    }, 2000);
                                                                }, 5000);
                                                            }, 2000);
                                                        }, 1500);
                                                    }, 1000);
                                                }, 2000);
                                            }, 1000);
                                        }, 1500);
                                    }, 2000);
                                }, 2000);
                            }, 2000);
                        }, 2000);
                    }, 1500);
                }, 1500);
            }, 2000);
        }, 1000);
    }, 1000);
}

const executeCommand = () => {
    load.value = false
    outputs.value.push(`$ ${command.value}`);
    // check if command.value is in listCOmmands
    if (listCommands.value.includes(command.value.trim())) {
        if (command.value.trim() === listCommands.value[0]) {
            outputs.value.push("List of commands usable:");
            outputs.value.push("help");
            outputs.value.push("apt");
            outputs.value.push("exit");
        } else if (command.value.trim() === listCommands.value[1]) {
            // free outputs content
            outputs.value = []
        } else if (command.value.trim() === listCommands.value[2]) {
            outputs.value.push("Error: apt can't be ran without super admin right.");
            outputs.value.push("That's right i gave you super admin right but");
            outputs.value.push("apt can't be used if you don't spécify to the system that you're an admin.")
            outputs.value.push("Don't make me think that paul have not choose the right person to use this computer.")
        } else if (command.value.trim() === listCommands.value[3]) {
            installation()
        } else if (command.value.trim() === listCommands.value[4]) {
            outputs.value.push("You're weak......")
            if (!locker.value) {
                outputs.value.push("Type exit again to confirm that you want to go")
                outputs.value.push("And prove that you're weak......")
                locker.value = true
                load.value = true
                command.value = ''
                return;
            }
            outputs.value.push("I mean, You're really weak...... Goodbye")
            router.push("/")
        }
        else {
            outputs.value.push("This command doesn't exist in my terminal actually. I won't allow you to cheat.");
        }
        command.value = '';
    } else if (command.value.startsWith("apt install")) {
        outputs.value.push("Error: apt can't be ran without super admin right.");
        outputs.value.push("That's right i gave you super admin right but");
        outputs.value.push("apt can't be used if you don't spécify to the system that you're an admin.")
        outputs.value.push("Don't make me think that paul have not choose the right person to use this computer.")
        command.value = '';
    } else if (command.value.startsWith("sudo apt install")) {
        setTimeout(() => {
            outputs.value.push("Reading package lists... Done.");
            setTimeout(() => {
                outputs.value.push("Building dependency tree... Done.");
                setTimeout(() => {
                    outputs.value.push("Reading state information... Done.");

                    outputs.value.push("");

                    outputs.value.push("Sorry this package can't be installed.")
                    outputs.value.push("I'm not sure that i can give you this right.")
                    command.value = '';
                }, 2000);
            }, 2000);
        }, 2000);
    }
    else {
        outputs.value.push("This command doesn't exist in my terminal actually. I won't allow you to cheat.");
        command.value = '';
    }
    load.value = true
    // scroll to bottom 0
    
};
</script>