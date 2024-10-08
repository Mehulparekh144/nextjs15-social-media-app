"use server"

import { validateRequest } from "@/app/auth"
import prisma from "@/lib/prisma";
import { createPostSchema } from "@/lib/validation";

export async function submitPost(input: string ){
  const {user} = await validateRequest();

  if(!user) throw new Error("Unauthorized");

  const { content } = createPostSchema.parse({content : input});

  await prisma.post.create({
    data : {
      content,
      userId : user.id
    }
  });
}