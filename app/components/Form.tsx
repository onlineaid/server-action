"use client";

import { useRef } from "react";
import { create } from "../action";
import { useFormState, useFormStatus } from "react-dom";

type Props = {};

export default function Form({}: Props) {
  const formRef = useRef<HTMLFormElement>(null);

  const [state, formAction] = useFormState(create, null);

  function SubmitButton() {
    const { pending } = useFormStatus();
    return (
      <button
        className="p-3 bg-green-600 block text-white rounded mt-2"
        type="submit"
      >
        {pending ? "Submitting..." : "submit"}
      </button>
    );
  }

  return (
    <>
      <p className="text-red-500">{state as string}</p>

      <form
        action={async (formData: FormData) => {
          formAction(formData);
          formRef.current?.reset();
        }}
        ref={formRef}
      >
        <input
          name="input"
          type="text"
          className="border p-1 border-gray-800 max-w-fit"
        />
        <br />
        <SubmitButton />
      </form>
    </>
  );
}
