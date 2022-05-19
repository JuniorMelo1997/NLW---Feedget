import { MailAdapter } from "../Adapters/mail-adapter";
import { FeedbackRespository } from "../Repositories/feedbacks-repository";

interface SubmitFeedbackUseCaseRequest{
    type: string;
    comment: string;
    image?: string
}

export class SubmitFeedbackUseCase{
    private feedbackRepository: FeedbackRespository;
    private mailAdapter: MailAdapter; 

    constructor(
        feedbacksRepository: FeedbackRespository,
        mailAdapter: MailAdapter
    ){
        this.feedbackRepository = feedbacksRepository;
        this.mailAdapter = mailAdapter;
    }

    async execute(request: SubmitFeedbackUseCaseRequest){
        const {type, comment, image} = request;

        if(image && !image.startsWith("data:image/png;base64")){
            throw new Error("Invalid image format");
        }

        if(!type){
            throw new Error("Missing type");
        }

        if(!comment){
            throw new Error("Missing comment");
        }

        await this.feedbackRepository.create({
            type, comment, image
        })

        await this.mailAdapter.sendMail({
            subject: "Novo Feedback",
            body: [
                `<p>Tipo de de feedback: ${type}</p>`,
                `<p>Comentário: ${comment}</p>`
            ].join("\n")
        })
    }
}