import { FeedbackType, feedbackTypes } from "..";
import { CloseButton } from "../../CloseButton";

interface FeedbackStepTypeProps {
    onFeedbackTypeChange: (type: FeedbackType) => void
}

export function FeedbackTypeStep({onFeedbackTypeChange}: FeedbackStepTypeProps){
    return(
        <>
            <header className="">
                <span className="text-xl leading-6">Deixe seu feedback</span>
                <CloseButton />
            </header>

            <div className="flex my-8 gap-2 w-full">
            {Object.entries(feedbackTypes).map(([key, value])=>{
                return (
                    <button key = {key} onClick={()=>{onFeedbackTypeChange(key as FeedbackType)}} className="bg-zinc-800 rounded-lg py-5 w-24 flex-1 flex flex-col items-center justify-center gap-2 border-2 border-transparent hover:border-brand-500 focus:border-brand-500 focus:outline-none transition-all duration-500">
                        <img src={value.image.source} alt={value.image.alt} />
                        <span>{value.title}</span>
                    </button>
                );
            })}
            </div>
        </>
        )
        
}