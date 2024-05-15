import Progress from "@/MyComponents/Progress";

export default function ProgressBar({}) {

    const arr = [];

    return (
        <div className="flex w-96 h-full flex-col gap-2">
            <Progress rating={5} value={60}/>
            <Progress rating={4} value={20}/>
            <Progress rating={3} value={5}/>
            <Progress rating={2} value={10}/>
            <Progress rating={1} value={5}/>
        </div>
    );
}

