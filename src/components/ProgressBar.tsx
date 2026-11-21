type ProgressBarProps ={
    current:number;
    total:number;
};
export function ProgressBar({current,total}:ProgressBarProps){
    const percent = total === 0 ? 0 :Math.round((current/total)*100);
    return(
        <div className="mb-4">
            <div className="h-2 w-full rounded-full bg-gray-200">
                <div className="h-2 rounded-full bg-blue-500 transition-all duration-300" style={{width:`${percent}%`}}/>
            </div>
            <p className="mt-1 text-right text-xs text-gray-500">{percent}%</p>
        </div>
    );
}
