import { useState } from "react";
import { PlusIcon, MinusIcon } from "@radix-ui/react-icons"
import { useTransition, animated, to } from '@react-spring/web'

import { Button } from "@/components/ui/button"

function Counter({ count, setCount }) {
    const [isError, setIsError] = useState(false);
    const [forward, setForward] = useState(true);

    function changeCount(val) {
        if (count + val < 0) {
            return setIsError(true);
        }
        setForward(val < 0);
        setCount(count + val);
        setIsError(false);
    }

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
                            className={"text-9xl tabular-nums text-center " + (isError ? "text-red-500" : "text-white")}
                            style={{
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
