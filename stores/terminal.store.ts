import { defineStore } from 'pinia'
import { createStdout } from "vue-command";

// Mock File System
const fileSystem: any = {
    "home": {
        "alexis": {
            "Desktop": {},
            "Documents": {
                "welcome.txt": "Welcome to Ashborn Arc! This is a simulated OS running in your browser.",
                "project_ideas.md": "- World domination\n- Buy milk\n- Fix bugs"
            },
            "Downloads": {},
            "Pictures": {},
            "Music": {},
            "Videos": {}
        }
    }
}

export const useTerminalStore = defineStore('terminal', () => {
    // State
    const currentPath = ref(['home', 'alexis'])

    // Getters
    const prompt = computed(() => {
        const path = currentPath.value.slice(2).join('/')
        const displayPath = path ? path : '~'
        return `alexis@ashborn:${displayPath}$ `
    })

    // Helpers
    const getCurrentDir = () => {
        let dir = fileSystem;
        for (const p of currentPath.value) {
            dir = dir[p];
        }
        return dir;
    }

    // Commands
    const commands = ref({
        "ls": () => {
            const dir = getCurrentDir();
            const items = Object.keys(dir).map(k => typeof dir[k] === 'string' ? k : k + '/');
            return createStdout(items.join('  '));
        },
        "cd": (path: string) => {
            if (!path || path === '~') {
                currentPath.value = ['home', 'alexis'];
                return createStdout('');
            }
            if (path === '..') {
                if (currentPath.value.length > 2) {
                    currentPath.value.pop();
                }
                return createStdout('');
            }

            const dir = getCurrentDir();
            // Simple navigation (no nested paths currenty supported in one go for simplicity)
            if (dir[path] && typeof dir[path] !== 'string') {
                currentPath.value.push(path);
                return createStdout('');
            }
            return createStdout(`cd: no such file or directory: ${path}`);
        },
        "cat": (file: string) => {
            const dir = getCurrentDir();
            if (dir[file] && typeof dir[file] === 'string') {
                return createStdout(dir[file]);
            }
            return createStdout(`cat: ${file}: No such file or directory`);
        },
        "clear": () => {
            // Returning nothing or undefined often signals a clear in some implementations, 
            // but if not supported, we can simulate a big spacer or just print a message.
            // Since we can't easily access the component state from here to empty the history,
            // we'll try returning a special marker if vue-command supports it, or just a clear message.
            // NOTE: vue-command doesn't natively support clearing from the return value in standard mode without customization.
            // As a fallback, we return a "Clear" message that looks distinct.
            return createStdout('\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n[Screen Cleared]');
        },
        "reset": () => {
            window.location.reload();
            return createStdout("System Resetting...");
        },
        "whoami": () => createStdout("alexis"),
        "date": () => createStdout(new Date().toString()),
        "help": () => createStdout(`
Available commands:
  ls          List directory contents
  cd [dir]    Change directory
  cat [file]  Print file content
  clear       Simulate screen clear
  reset       Reset/Reload the system
  whoami      Print current user
  date        Print system date
  neofetch    Display system info
  reboot      Restart the system
`),
        "neofetch": () => createStdout(`
       /\\        OS: Ashborn Arc Arch
      /  \\       Host: Web Browser
     / /\\ \\      Kernel: 0.3.1
    / /  \\ \\     Uptime: Forever
   / /    \\ \\    Packages: npm
  / /      \\ \\   Shell: zsh (simulated)
 / /        \\ \\  Resolution: Responsive
/_/          \\_\\ DE: Glassmorphism V2
`),
        "reboot": () => {
            window.location.reload();
            return createStdout("Rebooting...");
        },
        "echo": (text: string) => createStdout(text || '')
    })

    return {
        prompt,
        commands,
    }
})