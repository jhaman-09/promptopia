"use client";
import React from "react";
import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";
import { FaSearch } from "react-icons/fa";

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
    <h1 className="text-center text-4xl text-black font-semibold mt-10">
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
    try {
      const res = await fetch("/api/prompt");
      const data = await res.json();
      setPosts(data);
      setFilteredPosts(data);
    } catch (error) {
      console.error(error)
    }
  };

  const filterPosts = async (text) => {
    if (!text.trim()) {
      setFilteredPosts(posts);
    } else {
      const filtered = posts.filter(
        (post) =>
          post.tag.toLowerCase().includes(text.toLowerCase()) ||
          post.prompt.toLowerCase().includes(text.toLowerCase()) ||
          post.creator.username.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredPosts(filtered);
    }
  };

  const handleTagClick = (text) => {
    const filtered = posts.filter((post) =>
      post.tag.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredPosts(filtered);
  };

  useEffect(() => {
    fetchPosts();
  }, []);


  return (
    <section className="feed">
      <form className="relative w-full text-center items-center search_input focus-within:ring-1 focus-within:ring-orange-500">
        <div className="w-full flex flex-row items-center rounded-md">
          <FaSearch className="text-gray-400 ml-2" />
          <input
            type="text"
            placeholder="Search for a tag or a username"
            value={searchText}
            onChange={handleSearchChange}
            required
            className="w-full pl-4 py-1 text-lg focus:outline-none"
          />
        </div>
      </form>

      <PromptCardList posts={filteredPosts} handleTagClick={handleTagClick} />
    </section>
  );
};

export default Feed;
