import { useState } from "react";
import { PlusIcon, MinusIcon } from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"

function Counter({ count, setCount }) {
    const [isError, setIsError] = useState(false);

    function changeCount(test) {
        if (count + test < 0) {
            return setIsError(true);
        }

        setCount(count + test);
        setIsError(false);
    }

    return (
        <div className="flex flex-row bg-slate-900 grow justify-center align-middle items-center text-white gap-36">

            <Button className="h-24 w-24" variant="ghost" size="icon" onClick={function () { changeCount(-1) }}>
                <MinusIcon className="h-16 w-16" />
            </Button>

            <div
                className={"text-9xl " + (isError ? "text-red-500" : "text-white")}>
                {count}
            </div>

            <Button className="h-24 w-24" variant="ghost" size="icon" onClick={function () { changeCount(1) }}>
                <PlusIcon className="h-16 w-16" />
            </Button>
        </div>
    );
}

export default Counter;
