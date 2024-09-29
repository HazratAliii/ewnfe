"use client";
import React, { Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Image from "next/image";
import RepoList from "@/components/RepoList";
import FollowersList from "@/components/FollowersList";

const GitProfile = () => {
  const pathname = usePathname();
  console.log("pathname ", pathname.split("/")[2]);
  const searchParam = useSearchParams();
  console.log(searchParam.get("avatar"));
  console.log(pathname.split("/")[2]);
  const username = pathname.split("/")[2];
  return (
    <>
      <div className="min-h-screen">
        <div className="w-full bg-[#FFFFFF] mt-10 flex justify-around flex-col">
          <div className="mx-10">
            <Suspense fallback={<div>Loading...</div>}>
              <Image
                width={200}
                height={200}
                src={searchParam.get("avatar") || "/avatar.png"}
                alt="avatar"
              />
            </Suspense>
            <h1 className="text-xl ml-10">{username}</h1>
          </div>
          <div className="mx-10">
            <h3 className="text-xl text-center my-10">First five Repos</h3>
            <RepoList username={username} />
          </div>
          <div className="mx-10">
            <h3 className="text-xl text-center my-10">First five Followers</h3>
            <FollowersList username={username} />
          </div>
        </div>
      </div>
    </>
  );
};

export default GitProfile;
