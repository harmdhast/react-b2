import { Button } from "@/components/ui/button";
import { animated, useSpringValue } from '@react-spring/web';
import { useToast } from "./components/ui/use-toast";

function Names({ name, setName }) {
    const opacity = useSpringValue(1);
    const { toast } = useToast();

    async function getRandomName() {
        try {
            const response = await fetch("https://randomuser.me/api/");
            const data = await response.json();

            if (Object.hasOwn(data, "results") && data.results.length > 0) {
                return data;
            }
            return null;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    function playAnimation() {
        opacity.set(0);
        opacity.start(1);
    }

    async function setNewName() {
        const data = await getRandomName();

        if (!data) {
            return toast({
                title: "Erreur API: Aucune donnée",
                variant: "destructive"
            })
        }

        const name = data.results[0].name;
        playAnimation();
        setName(`${name.first} ${name.last}`);
    }

    return (
        <div className="flex flex-col bg-slate-900 grow justify-center align-middle items-center text-white gap-1">
            <animated.div className="text-xl h-5 mb-2" style={{ opacity }}>{name}</animated.div>
            <Button onClick={setNewName} variant="outline" className="text text-xl" size="lg">Changer nom</Button>
        </div>
    );
}

export default Names;
