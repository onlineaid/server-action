"use client";
import React from 'react';
import { useFormStatus } from 'react-dom';

interface BtnProps {
  loading: string;
  normal: string;
  backgroundColor: string;
}

export default function StateButton({ loading, normal, backgroundColor }: BtnProps) {
  const { pending } = useFormStatus();

  return (
    <button type="submit" className={`border ${backgroundColor}`}>
      {pending ? loading : normal}
    </button>
  );
}
