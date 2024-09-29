"use client";
import GitUserCard from "@/components/GitUserCard";
import axios from "axios";
import React, { useState } from "react";
import Link from "next/link";
interface GitUser {
  id: string;
  login: string;
  avatar_url: string;
}

const Search = () => {
  const [username, setUsername] = useState("");
  const [gitUsers, setGitUsers] = useState<GitUser[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const perPage = 10;

  const handleSearch = async () => {
    if (!username) {
      alert("Please enter a GitHub username");
      return;
    }
    console.log("Searching for:", username);
    try {
      const resp = await axios.get(
        `https://api.github.com/search/users?q=${username}&per_page=${perPage}&page=${currentPage}`
      );
      setGitUsers(resp.data.items);
      console.log(resp.data.items);
      setTotalPages(Math.ceil(resp.data.total_count / perPage));
    } catch (err) {
      console.log("first ", err);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      handleSearch();
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      handleSearch();
    }
  };

  return (
    <>
      <div className="w-full flex justify-center items-center mt-5">
        <div className="w-1/2 md:w-1/3 flex gap-5">
          <input
            type="text"
            className="w-full h-[40px] rounded-sm border border-black px-2"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="GitHub username"
          />
          <button
            className="px-3 py-1 bg-black rounded-sm text-white"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
          {gitUsers.map((gitUser) => (
            <div key={gitUser.id}>
              <Link
                href={`gituser/${gitUser.login}?avatar=${gitUser.avatar_url}`}
              >
                <GitUserCard
                  login={gitUser.login}
                  avatar={gitUser.avatar_url}
                />
              </Link>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-4">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-black text-white  rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-black rounded disabled:opacity-50 text-white"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Search;
