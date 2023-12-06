"use client";

import { useRef } from "react";
import { createUser } from "../../action";
import { useFormState, useFormStatus } from "react-dom";

type Props = {};

export default function Form({}: Props) {
  const formRef = useRef<HTMLFormElement>(null);

  const [state, formAction] = useFormState(createUser, null);

  function SubmitButton() {
    const { pending } = useFormStatus();
    return (
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <button
          className="px-3 py-1 bg-green-600 block text-white mt-2 font-semibold uppercase"
          type="submit"
          style={{ backgroundColor: "#FEB161" }}
        >
          {pending ? "Submitting..." : "Submit"}
        </button>
      </div>
    );
  }

  return (
    <>
      <p className="text-red-500">{state as string}</p>

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const formData = new FormData(e.target as HTMLFormElement);
          // Access form data here and pass it to your create action
          formAction(formData);
          formRef.current?.reset();
        }}
        ref={formRef}
      >
        <input
          name="email"
          type="text"
          className="border-2 px-2 border-gray-300 w-full mb rounded mb-3"
          placeholder="Email"
        />
        <br />

        <input
          name="password"
          type="password"
          className="border-2 px-2 border-gray-300 w-full mb rounded mb-3"
          placeholder="Password"
        />

        <input
          name="captcha"
          type="text"
          className="border-2 px-2 border-gray-300 w-full mb rounded"
        />
        <br />

        <SubmitButton />
      </form>
    </>
  );
}
