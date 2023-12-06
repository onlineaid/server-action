import React from "react";
import prisma from "../db";
import { create, deleteItem, edit } from "../action";
import StateButton from "../components/StateButton";
import Form from "../components/Form";
import Image from "next/image";

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

export default async function good() {
  const data = await getData();

  return (
    <div className="grid place-content-center mt-10">
      <Image
        src="https://i.ibb.co/jG1yYn1/Whats-App-Image-2023-12-06-at-1-15-39-PM-removebg-preview.png"
        width={500}
        height={500}
        alt="Picture of the author"
      />

      <p>Is this your first time posting?</p>

      <button>Start here </button>
      
      <p>Already have an account?</p>

      Good practices
      <div className="shadow-xl w-[30vw] p-10">
        <Form />

        <>
          {data.map((todo) => (
            <div key={todo.id} className="flex">
              <form action={edit}>
                <input
                  type="hidden"
                  name="inputId"
                  value={todo.id.toString()}
                />
                <input
                  type="text"
                  name="input"
                  defaultValue={todo.input || ""}
                />
                <StateButton
                  loading="Saving..."
                  normal="Save"
                  backgroundColor="bg-green-400"
                />
              </form>
              <form action={deleteItem}>
                <input
                  type="hidden"
                  name="inputId"
                  value={todo.id.toString()}
                />

                <StateButton
                  loading="deleting..."
                  normal="delete"
                  backgroundColor="bg-red-400"
                />
              </form>
            </div>
          ))}
        </>
      </div>
    </div>
  );
}
