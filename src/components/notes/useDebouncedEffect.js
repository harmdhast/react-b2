import { useEffect } from 'react';

function useDebouncedEffect(effect, deps, delay) {
    useEffect(() => {
        const handler = setTimeout(() => effect(), delay);

        return () => clearTimeout(handler);
    }, [...(deps || []), delay])
};

export { useDebouncedEffect };