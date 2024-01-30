import { useState } from "react";
import { PlusIcon, MinusIcon } from "@radix-ui/react-icons"
import { useTransition, animated, to, useSpring, useSpringRef } from '@react-spring/web'

import { Button } from "@/components/ui/button"

function Counter({ count, setCount }) {
    const [forward, setForward] = useState(true);

    function changeCount(val) {
        if (count + val < 0) {
            api.set({ color: 0 });
            api.start({ color: 1 });
            return;
        }
        setForward(val < 0);
        setCount(count + val);
    }

    const api = useSpringRef();
    const { color: errorColor } = useSpring({
        ref: api,
        from: { color: 0 },
        color: 0,
        config: { duration: 400 },
        reset: true
    });

    const transitions = useTransition([count], {
        from: { position: forward ? '100%' : '-100%', opacity: 0, rotation: '90deg' },
        enter: { position: '0%', opacity: 1, rotation: '0deg' },
        leave: { position: forward ? '-100%' : '100%', opacity: 0, rotation: '90deg' },
        initial: null
    })

    return (
        <div className="flex flex-row bg-slate-900 grow justify-center align-middle items-center text-white gap-36">

            <Button className="h-24 w-24" variant="ghost" size="icon" onClick={function () { changeCount(-1) }}>
                <MinusIcon className="h-16 w-16" />
            </Button>

            <div className="tabular-nums w-96 h-32">
                {
                    transitions((style, item) => (
                        <animated.div
                            className="text-9xl tabular-nums text-center"
                            style={{
                                color: errorColor.to({
                                    range: [0, 0.25, 0.5, 0.75, 1],
                                    output: ["white", "red", "white", "red", "white"]
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

            <Button className="h-24 w-24" variant="ghost" size="icon" onClick={function () { changeCount(1) }}>
                <PlusIcon className="h-16 w-16" />
            </Button>
        </div >
    );
}

export default Counter;
