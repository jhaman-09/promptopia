"use client";
import React from "react";
import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ posts, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {posts.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value)
  };

  const fetchPosts = async () => {
    const res = await fetch("/api/prompt");
    const data = await res.json();
    setPosts(data);
  };


  const handleTagClick = () => {
    
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
        />
      </form>

      <PromptCardList
        posts={posts}
        handleTagClick={handleTagClick}
      />
    </section>
  );
};

export default Feed;
