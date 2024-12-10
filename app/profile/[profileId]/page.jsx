"use client";

import React from "react";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Profile from "@components/Profile";

const MyProfile = ({ params }) => {
  const { data: session } = useSession();

  const [userData, setUserData] = useState({});

  const router = useRouter();

  const profileId = params?.profileId;

  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const req = await fetch(`/api/users/${profileId}/posts`);
      const data = await req.json();
      setPosts(data);
    } catch (error) {
      console.error("Error while fetching post", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post) => {
    const hasConfirmed = confirm(
      "Are you sure that you defently want to delete the prompt?"
    );

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });

        const filteredPost = posts.filter((p) => p._id !== post._id);

        setPosts(filteredPost);
      } catch (error) {
        console.error("Failed to delete post:", error);
      }
    }
  };

  const fetchUser = async () => {
    try {
      const res = await fetch(`/api/users/${profileId}`);
      const userData = await res.json();
      setUserData(userData);
    } catch (error) {
      console.error("Failed to fetched user details.", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <Profile
      name={profileId === session?.user?.id ? "My" : userData.name}
      desc={
        "Passionate developer with a knack for building user-friendly web applications. Skilled in creating dynamic interfaces and efficient backend systems using modern technologies."
      }
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
