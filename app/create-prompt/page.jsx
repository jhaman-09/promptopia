"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Form from "@components/Form";

const page = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Form
      type={'Create'}
      post={post}
      setPost={setPost}
      handleSubmit={handleSubmit}
      submitting={submitting}
    />
  );
};

export default page;
