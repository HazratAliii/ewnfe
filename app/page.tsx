"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

const Profile = () => {
  const [user, setUser] = useState({
    image: "",
    _id: "",
    email: "",
    password: "",
    givenName: "",
    familyName: "",
    language: "",
    verified: false,
    createdAt: "",
    updatedAt: "",
    __v: 0,
  });
  const searchParam = useSearchParams();
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const resp = await axios.get(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/users/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(resp.data.user);
    } catch (err) {
      console.log("error", err);
    }
  };
  const fetchDataWithToken = async (token: string) => {
    try {
      localStorage.setItem("token", token);
      const resp = await axios.get(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/users/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUser(resp.data.user);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    const token = searchParam.get("token");
    if (token) {
      fetchDataWithToken(token);
    } else {
      fetchData();
    }
  }, []);

  return (
    <>
      <div className="w-full h-screen flex justify-center mt-5 md:mt-10">
        <div className="w-full h-full md:w-2/3 md:h-2/3 bg-[#FFFFFF] flex md:flex-row flex-col md:gap-2">
          <div className="flex justify-center items-start md:w-1/3 mt-5 md:mt-5">
            <Image
              src={user.image ? user.image : "/avatar.png"}
              width={200}
              height={200}
              alt="image here"
            />
          </div>
          <div className="h-full w-full flex flex-col md:flex-row justify-start md:w-2/3 mt-5 md:mt-5">
            <div className="w-full md:w-1/2 flex flex-col gap-4 p-4">
              <div className="w-full flex justify-between items-center text-sm md:text-lg lg:text-xl mb-2">
                <div className="font-semibold">Family name:</div>
                <div>{user.familyName}</div>
              </div>
              <div className="w-full flex justify-between items-center text-sm md:text-lg lg:text-xl mb-2">
                <div className="font-semibold">Given name:</div>
                <div>{user.givenName}</div>
              </div>
              <div className="w-full flex justify-between items-center text-sm md:text-lg lg:text-xl mb-2">
                <div className="font-semibold">Email:</div>
                <div>{user.email}</div>
              </div>
              <div className="w-full flex justify-between items-center text-sm md:text-lg lg:text-xl mb-2">
                <div className="font-semibold">Verified:</div>
                <div>{user.verified ? "Yes" : "No"}</div>
              </div>
              <div className="w-full flex justify-between items-center text-sm md:text-lg lg:text-xl">
                <div className="font-semibold">Language:</div>
                <div>{user.language}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
