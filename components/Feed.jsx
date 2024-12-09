"use client";
import React from "react";
import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ posts, handleTagClick }) => {
  return posts.length !== 0 ? (
    <div className="mt-16 prompt_layout">
      {posts.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  ) : (
    <h1 className="text-center text-4xl mt-5 text-black font-semibold">
      No Item Found!
    </h1>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    filterPosts(e.target.value);
  };

  const fetchPosts = async () => {
    const res = await fetch("/api/prompt");
    const data = await res.json();
    setPosts(data);
    setFilteredPosts(data);
  };

  const filterPosts = async (text) => {
    if (!text.trim()) {
      setFilteredPosts(posts);
    } else {
      const filtered = posts.filter(
        (post) =>
          post.tag.toLowerCase().includes(text.toLowerCase()) ||
          post.prompt.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredPosts(filtered);
    }
  };

  const handleTagClick = () => {};

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
          className="search_input"
        />
      </form>

      <PromptCardList posts={filteredPosts} handleTagClick={handleTagClick} />
    </section>
  );
};

export default Feed;
