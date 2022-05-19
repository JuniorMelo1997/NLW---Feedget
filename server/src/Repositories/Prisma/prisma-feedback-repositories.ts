import { db } from "../../db";
import { FeedbackCreateData, FeedbackRespository } from "../feedbacks-repository";

export class PrismaFeedbacksRepository implements FeedbackRespository {
    async create({type, comment, image}: FeedbackCreateData){
        await db.feedback.create({
            data: {
                type,
                comment,
                image
            }
        })
    };
}