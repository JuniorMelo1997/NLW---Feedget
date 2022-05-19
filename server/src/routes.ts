import express from "express";
import nodemailer from "nodemailer";
import { NodemailerMailAdapter } from "./Adapters/nodemailer/nodmailer-mail-adapter";
import { db } from "./db";
import { PrismaFeedbacksRepository } from "./Repositories/Prisma/prisma-feedback-repositories";
import { SubmitFeedbackUseCase } from "./use-cases/submit-feedback-use-case";
const routes = express.Router();


routes.post("/feedback", async (req, res)=>{
    const {type, comment, image} = req.body;

    const prismaFeebackRepository = new PrismaFeedbacksRepository;
    const nodemailerMailAdapter = new NodemailerMailAdapter();
    const submitFeedbackUseCase = new SubmitFeedbackUseCase(prismaFeebackRepository, nodemailerMailAdapter);

    await submitFeedbackUseCase.execute({
      type, comment, image
    })
    
    return res.status(201).send("Created successfully");
})

export {routes}