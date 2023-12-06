"use server";

import { revalidatePath } from "next/cache";
import prisma from "./db";

export async function create(prevState: any, formData: FormData) {
  try {
    const input = formData.get("input") as string;

    //  // Validate that the input contains only letters
    //  if (!/^[A-Za-z]+$/.test(input)) {
    //   throw new Error("Input must contain only letters.");
    // }

    await prisma.todo.create({
      data: {
        input: input,
      },
    });

    revalidatePath("/good");
  } catch (error) {
    return "Fail to create new post " + error;
  }
}

export async function createUser(prevState: any, formData: FormData) {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const captcha = formData.get("captcha") as string;

    // You can add validation logic here if needed

    await prisma.user.create({
      data: {
        email,
        password,
        captcha,
      },
    });

    revalidatePath("/project");

    return null; // Indicates success (you can return any relevant data if needed)
  } catch (error) {
    console.error("Failed to create user:", error);
    return "Failed to create user: " + error;
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
