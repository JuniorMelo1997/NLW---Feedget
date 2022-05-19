import { SubmitFeedbackUseCase } from "./submit-feedback-use-case"

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn()

describe("Submit feedback", ()=>{
    test("should be able to submit a feedback", async ()=>{
        const submitFeedback = new SubmitFeedbackUseCase(
        {create: createFeedbackSpy},
        {sendMail: sendMailSpy}
        )
                    
        await expect(submitFeedback.execute({
            type: "BUG",
            comment: "example comment",
            image: "data:image/png;base64"
        })).resolves.not.toThrow();

        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(sendMailSpy).toHaveBeenCalled();

        await expect(submitFeedback.execute({
            type: "",
            comment: "example comment",
            image: "data:image/png;base64.jpg"
        })).rejects.toThrow();
        
        await expect(submitFeedback.execute({
            type: "BUG",
            comment: "",
            image: "data:image/png;base64.jpg"
        })).rejects.toThrow();

        
        await expect(submitFeedback.execute({
            type: "BUG",
            comment: "example comment",
            image: "testing.jpg"
        })).rejects.toThrow();
    })
})