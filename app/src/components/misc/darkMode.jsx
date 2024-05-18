import { useContext, useEffect } from 'react';
import { SunIcon, MoonIcon } from '@radix-ui/react-icons'
import { Switch } from "@/components/ui/switch";
import { UserContext } from '@/App';

function DarkModeSwitch() {
    const { theme, setTheme } = useContext(UserContext);

    useEffect(() => {
        if (theme === null) return;
        document.body.classList.toggle('dark', theme);
    }, [theme]);

    return (
        <div className="flex items-center gap-2">
            <SunIcon className="w-5 h-5"></SunIcon>
            <Switch checked={theme} onClick={() => setTheme(!theme)}></Switch>
            <MoonIcon className="w-5 h-5"></MoonIcon>
        </div>
    );
};

export { DarkModeSwitch };