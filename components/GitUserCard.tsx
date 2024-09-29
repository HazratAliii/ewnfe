import Image from "next/image";
import React from "react";

interface GitUserCardProps {
  login: string;
  avatar: string;
}

const GitUserCard: React.FC<GitUserCardProps> = ({ login, avatar }) => {
  return (
    <div className="flex items-center space-x-4">
      {/* <img src={avatar} alt={login} className="w-12 h-12 rounded-full" /> */}
      <Image
        src={avatar}
        alt={login}
        height={30}
        width={30}
        className=" rounded-full"
      />
      <p>{login}</p>
    </div>
  );
};

export default GitUserCard;
