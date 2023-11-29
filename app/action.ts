"use server";

import { revalidatePath } from "next/cache";
import prisma from "./db";

export async function create(prevState: any, formData: FormData) {
  try {
    const input = formData.get("input") as string;
    await prisma.todo.create({
      data: {
        input: input,
      },
    });

    revalidatePath("/good");
  } catch (error) {
    return ('Fail to create new post ' + error)
  }
}

export async function edit(formData: FormData) {
  const input = formData.get("input") as string;
  const inputId = formData.get("inputId") as string;

  await prisma.todo.update({
    where: {
      id: inputId,
    },
    data: {
      input: input,
    },
  });

  revalidatePath("/good");
}

export async function deleteItem(formData: FormData) {
  const inputId = formData.get("inputId") as string;

  await prisma.todo.delete({
    where: {
      id: inputId,
    },
  });

  revalidatePath("/good");
}
