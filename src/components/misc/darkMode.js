import { useContext, useEffect, useState } from 'react';
import { SunIcon, MoonIcon } from '@radix-ui/react-icons'
import { Switch } from "@/components/ui/switch";
import { UserContext } from '@/App';

function DarkModeSwitch() {
    const { isDarkMode, toggleDarkMode } = useContext(UserContext);

    useEffect(() => {
        if (isDarkMode === null) {
            return;
        }
        document.body.classList.toggle('dark', isDarkMode);
        localStorage.setItem('darkmode', isDarkMode);
    }, [isDarkMode]);

    useEffect(() => {
        // Récupération localStorage
        const value = localStorage.getItem('darkmode');
        if (value !== null) {
            return toggleDarkMode(value === "true"); // localStorage = string
        }

        // Utilisation du mode préféré si à la première connexion
        const darkModePreference = window.matchMedia("(prefers-color-scheme: dark)");
        darkModePreference.addEventListener("change", e => toggleDarkMode(e.matches));
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