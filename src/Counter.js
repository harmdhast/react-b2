import { Button } from "@/components/ui/button";
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";

import { animated, to, useSpring, useSpringRef, useTransition } from '@react-spring/web';
import { useContext, useEffect, useState } from "react";
import { zinc } from 'tailwindcss/colors';

import { UserContext } from './App';

function Counter({ count, setCount }) {
    const { isDarkMode, toggleDarkMode } = useContext(UserContext);
    const [animDirection, setAnimDirection] = useState(true); // Direction de l'animation du compteur
    const [baseColor, setBaseColor] = useState("white");

    function updateCounter(val) {
        if (count + val < 0) {
            return playErrorAnim();
        }
        setAnimDirection(val < 0);
        setCount(count + val);
    }

    // Animation erreur (compteur < 0)
    const errorColorApi = useSpringRef();
    const { color: errorColor } = useSpring({
        ref: errorColorApi,
        from: { color: 0 },
        color: 0,
        config: { duration: 400 },
        reset: true
    });

    function playErrorAnim() {
        errorColorApi.set({ color: 0 });
        errorColorApi.start({ color: 1 });
    }

    useEffect(() => {
        setBaseColor(isDarkMode ? "white" : zinc["800"])
    }, [isDarkMode])

    // Animation compteur
    const transitions = useTransition([count], {
        from: { position: animDirection ? '100%' : '-100%', opacity: 0, rotation: '90deg' },
        enter: { position: '0%', opacity: 1, rotation: '0deg' },
        leave: { position: animDirection ? '-100%' : '100%', opacity: 0, rotation: '90deg' },
        initial: null
    })

    return (
        <div className="flex flex-row bg-zinc-100 dark:bg-zinc-900 dark:text-white text-zinc-800 grow justify-center align-middle items-center gap-36">

            <Button className="h-24 w-24" variant="ghost" size="icon" onClick={function () { updateCounter(-1) }}>
                <MinusIcon className="h-16 w-16" />
            </Button>

            <div className="tabular-nums w-96 h-32">
                {
                    transitions((style, item) => (
                        <animated.div
                            className="text-9xl tabular-nums text-center"
                            style={{
                                color: errorColor.to({ /* Map animation erreur */
                                    range: [0, 0.25, 0.5, 0.75, 1],
                                    output: [baseColor, "red", baseColor, "red", baseColor]
                                }),
                                position: "absolute",
                                left: 0,
                                right: 0,
                                marginLeft: "auto",
                                marginRight: "auto",
                                width: "30%",
                                transform: to([style.position, style.rotation], (p, s) => `translateY(${p}) rotateX(${s})`),
                                opacity: style.opacity
                            }}>
                            {item}
                        </animated.div>
                    ))
                }
            </div>

            <Button className="h-24 w-24" variant="ghost" size="icon" onClick={function () { updateCounter(1) }}>
                <PlusIcon className="h-16 w-16" />
            </Button>
        </div >
    );
}

export default Counter;
