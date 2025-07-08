import { fastify } from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod";
import { fastifyCors } from "@fastify/cors";
import { env } from "./env.ts";

const app = fastify().withTypeProvider<ZodTypeProvider>();

export default app;

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
app.listen({ port: env.PORT })
// app.listen({ port: env.PORT }).then(() => {
//   console.log("server running");
// });
