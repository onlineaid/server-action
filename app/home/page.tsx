import React from "react";
import prisma from "../db";
import { revalidatePath } from "next/cache";

async function getData() {
  const data = await prisma.todo.findMany({
    select: {
      input: true,
      id: true,
    },
    orderBy: {
      createAt: "desc",
    },
  });

  return data;
}

export default async function Home() {
  const data = await getData();
  async function create(formData: FormData) {
    "use server";
    const input = formData.get("input") as string;
    await prisma.todo.create({
      data: {
        input: input,
      },
    });

    revalidatePath("/home");
  }

  async function edit(formData: FormData) {
    "use server";

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

    revalidatePath("/home");
  }

  async function deleteItem(formData: FormData) {
    "use server";
    const inputId = formData.get("inputId") as string;

    await prisma.todo.delete({
      where: {
        id: inputId,
      },
    });

    revalidatePath("/home");
  }

  return (
    <div className="grid place-content-center mt-10">
      Home
      <div className="shadow-xl w-[30vw] p-10">
        <form action={create}>
          <input
            name="input"
            type="text"
            className="border p-1 border-gray-800 max-w-fit"
          />
          <br />
          <button
            className="p-3 bg-green-600 block text-white rounded mt-2"
            type="submit"
          >
            submit
          </button>
        </form>

        <>
          {data.map((todo) => (
            <form key={todo.id} action={edit}>
              <input type="hidden" name="inputId" value={todo.id.toString()} />
              <input type="text" name="input" defaultValue={todo.input || ""} />
              <button type="submit" className="border bg-green-400">
                save
              </button>
              <button formAction={deleteItem} className="border bg-red-400">delete</button>
            </form>
          ))}
        </>
      </div>
    </div>
  );
}
