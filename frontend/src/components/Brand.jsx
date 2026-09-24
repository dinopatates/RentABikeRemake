export default function Brand() {
    return (
        <div className="flex items-center gap-2 text-xl font-extrabold tracking-tight">
            <span className="relative h-3 w-5 rounded-t-lg rounded-b-sm border-2 border-current after:absolute after:bottom-[-5px] after:left-0.5 after:h-1 after:w-1 after:rounded-full after:bg-current before:absolute before:bottom-[-5px] before:right-0.5 before:h-1 before:w-1 before:rounded-full before:bg-current" />
            <span>Car Rental</span>
        </div>
    );
}