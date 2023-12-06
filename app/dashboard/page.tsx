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

  revalidatePath("/dashboard");

  return data;
}

type Props = {};

export default async function page({}: Props) {
  const data = await getData();
  return (
    <div>
      {data.map((todo) => (
        <div key={todo.id} className="flex">
          <p>{todo.input}</p>
        </div>
      ))}
    </div>
  );
}
