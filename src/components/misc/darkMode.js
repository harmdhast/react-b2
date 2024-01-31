import { useEffect, useState } from 'react';
import { SunIcon, MoonIcon } from '@radix-ui/react-icons'
import { Switch } from "@/components/ui/switch";

function DarkModeSwitch() {
    const [isDarkMode, toggleDarkMode] = useState(null);

    useEffect(() => {
        document.body.classList.toggle('dark', isDarkMode);
        localStorage.setItem('darkmode', isDarkMode);
    }, [isDarkMode]);

    useEffect(() => {
        // Utilisation du mode préféré si à la première connexion
        const darkModePreference = window.matchMedia("(prefers-color-scheme: dark)");
        darkModePreference.addEventListener("change", e => toggleDarkMode(e.matches));

        // Récupération localStorage
        const darkMode = localStorage.getItem('darkmode');
        if (darkMode) {
            toggleDarkMode(darkMode);
        }
    }, []);

    return (
        <div className="flex items-center gap-2">
            <SunIcon className="w-5 h-5"></SunIcon>
            <Switch checked={isDarkMode} onClick={() => toggleDarkMode(!isDarkMode)}></Switch>
            <MoonIcon className="w-5 h-5"></MoonIcon>
        </div>
    );
};

export { DarkModeSwitch };