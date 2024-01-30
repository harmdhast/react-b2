import { useState } from "react";
import { Button } from "@/components/ui/button";
import { animated, useSpringValue } from '@react-spring/web';

export function ButtonOutline() {
    return;
}
function Names() {
    const [name, setName] = useState(null);

    async function fetchName() {
        try {
            const response = await fetch("https://randomuser.me/api/");
            const data = await response.json();

            opacity.reset();
            opacity.start(1);
            const name = data.results[0].name;
            setName(name.first + " " + name.last);
        } catch {
            console.log("Couldn't fetch name");
        }
    }

    const opacity = useSpringValue(0);

    return (
        <div className="flex flex-col bg-slate-900 grow justify-center align-middle items-center text-white gap-1">
            <animated.div className="text-xl h-5 mb-2" style={{ opacity }}>{name}</animated.div>
            <Button onClick={fetchName} variant="outline" className="text text-xl" size="lg">Changer nom</Button>
        </div>
    );
}

export default Names;
