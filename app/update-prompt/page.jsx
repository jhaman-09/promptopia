"use client";

import Form from "@components/Form";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";

const UpdatePrompt = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const promptId = searchParams?.get("id");

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  const getPromptDetailsById = async () => {
    try {
      const res = await fetch(`/api/prompt/${promptId}`);
      const data = await res.json();
      setPost({
        prompt: data.prompt,
        tag: data.tag,
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (promptId) getPromptDetailsById();
  }, [promptId]);

  const updatePrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (!promptId) alert("Prompt ID not found");

    try {
      const res = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });
      if (res.ok) {
        router.push("/"); // go to home page
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Form
          type={"Update"}
          post={post}
          setPost={setPost}
          handleSubmit={updatePrompt}
          submitting={submitting}
        />
      </Suspense>
    </div>
  );
};

export default UpdatePrompt;
