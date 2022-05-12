import { CloseButton } from "../../CloseButton";
import successImageUrl from "../../../assets/Success.svg"

interface FeedbackSuccessStepProps{
onFeedbackRestartedRequested: ()=>void;
}

export function FeedbackSuccessStep({onFeedbackRestartedRequested}: FeedbackSuccessStepProps){
    return(
        <>
            <header>
                <CloseButton />
            </header>

            <div className="flex flex-col items-center py-10 w-[304px]">
                <img src={successImageUrl} alt="Sucesso" />
                <span className="text-xl mt-2">
                    Agradeçemos seu feedback!
                </span>

                <button onClick={onFeedbackRestartedRequested} type="button" className="py-2 px-6 mt-6 bg-zinc-800 rounded-md border-transparent text-sm leading-6 hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-all duration-500">
                    Quero enviar outro
                </button>
            </div>
        </>
    )
}