import React from "react";
import prisma from "../db";
import UserForm from "./com/UserForm";
import Image from "next/image";
import Link from "next/link";

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
  //   const data = await getData();

  return (
    <div className="grid place-content-center mt-10 mx-auto sm:w-full md:w-96 sm:p-4 md:p-2 p-2">
      <div
        className="mb-3"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          src="https://i.ibb.co/jG1yYn1/Whats-App-Image-2023-12-06-at-1-15-39-PM-removebg-preview.png"
          width={350}
          height={350}
          alt="Picture of the author"
        />
      </div>

      <div className="text-center mb-2">
        <p>Is this your first time posting?</p>

        <div className="mt-2 mb-3">
          <button
            style={{ backgroundColor: "#0ea5e9", fontSize: "20px" }}
            className="px-10 py-0 font-semibold inline-flex text-white rounded "
          >
            Start here
          </button>
        </div>

        <p>Already have an account?</p>
      </div>

      <div>
        <UserForm />
      </div>

      <div
        className="mt-1"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          src="https://i.ibb.co/kx7qf2Y/Whats-App-Image-2023-12-06-at-1-21-46-PM-1-removebg-preview-1-1.png"
          width={350}
          height={350}
          alt="Picture of the author"
        />
      </div>

      <div className="inline-flex gap-1 justify-center mt-3">
        <Link
          href="/blog/hello-world"
          style={{ color: "#5495ff", fontSize: "14px", fontWeight: "normal" }}
        >
          Forgot password
        </Link>
      </div>

      <div className="inline-flex gap-1 justify-center">
        <Link
          href="/blog/hello-world"
          style={{ color: "#38bdf8", fontSize: "12px" }}
        >
          Home |
        </Link>

        <Link
          href="/blog/hello-world"
          style={{ color: "#38bdf8", fontSize: "12px" }}
        >
          Manage Posts |
        </Link>
        <Link
          href="/blog/hello-world"
          style={{ color: "#38bdf8", fontSize: "12px" }}
        >
          Contact Us |
        </Link>
        <Link
          href="/blog/hello-world"
          style={{ color: "#38bdf8", fontSize: "12px" }}
        >
          Polices & Terms
        </Link>
      </div>

      <div className="text-center mt-3">
        <Link
          href="/blog/hello-world"
          style={{ color: "#38bdf8", fontSize: "12px" }}
        >
          Copyright &copy;2022 MegaPersonals.eu
        </Link>
      </div>
    </div>
  );
}
