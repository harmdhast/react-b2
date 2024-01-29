import { useTransition, animated, useSpring } from '@react-spring/web'

function TestCounter({ count, isError }) {

    const [transitions, api] = useSpring(() => ({
        from: { opacity: 0 },
        to: { opacity: 1 }
    }))

    return (
        <animated.div className={"text-9xl tabular-nums " + (isError ? "text-red-500" : "text-white")} style={transitions}>{count}</animated.div>
    );
}

export { TestCounter };