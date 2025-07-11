import { fastifyCors } from "@fastify/cors";
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod";
import { env } from "./env.ts";
import { fastify } from "fastify";
import { getRoomsRoute } from "./http/routes/get-rooms.ts";
import { createRoomsRoute } from "./http/routes/create-room.ts";
import { getRoomQuestions } from "./http/routes/get-room-questions.ts";
import { createQuestionRoute } from "./http/routes/create-question.ts";

const app = fastify().withTypeProvider<ZodTypeProvider>();



app.register(fastifyCors, {
  origin: "http://localhost:5173",
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

// app.listen({port: process.env.PORT ? Number(process.env.PORT) : 3333}).then(() =>{
//     console.log(`Port: ${process.env.PORT}`)
// })

app.get("/health", () => {
  return "ok";
});

app.register(getRoomsRoute)
app.register(createRoomsRoute)
app.register(getRoomQuestions)
app.register(createQuestionRoute)

app.listen({ port: env.PORT });
// app.listen({ port: env.PORT }).then(() => {
//   console.log("server running");
// });
