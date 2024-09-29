"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

interface Repo {
  id: number;
  name: string;
  html_url: string;
  owner: {
    avatar_url: string;
    login: string;
  };
}

const RepoList = ({ username }: { username: string }) => {
  const [repos, setRepos] = useState<Repo[]>([]);

  // Display only the first 5 repositories
  const fetchRepos = async () => {
    try {
      console.log(username);
      const response = await axios.get(
        `https://api.github.com/users/${username}/repos`
      );
      setRepos(response.data);
    } catch {
      alert("Something went wrong");
    }
  };

  useEffect(() => {
    fetchRepos();
  });
  const displayedRepos = repos.slice(0, 5);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {displayedRepos.map((repo) => (
        <div key={repo.id} className="border p-4 rounded shadow">
          <Link href={repo.html_url} passHref>
            <div className="flex items-center cursor-pointer">
              <Image
                src={repo.owner.avatar_url}
                alt={repo.owner.login}
                width={48}
                height={48}
                className="w-12 h-12 rounded-full"
              />
              <h3 className="text-lg font-semibold mt-2 ml-2">{repo.name}</h3>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default RepoList;
