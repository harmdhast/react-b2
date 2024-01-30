import { useEffect } from 'react';

function useDebouncedEffect(effect, deps, delay) {
    useEffect(() => {
        const handler = setTimeout(() => effect(), delay);

        return () => clearTimeout(handler);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [...(deps || []), delay])
};

export { useDebouncedEffect };