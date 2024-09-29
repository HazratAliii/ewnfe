import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

interface Follower {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
}

const FollowersList = ({ username }: { username: string }) => {
  const [followers, setFollowers] = useState<Follower[]>([]);

  const fetchFollowers = async () => {
    try {
      const response = await axios.get(
        `https://api.github.com/users/${username}/followers`
      );
      setFollowers(response.data.slice(0, 5));
    } catch (err) {
      if (axios.isAxiosError(err)) {
        alert(err.response?.data?.message || "Something went wrong");
      } else {
        alert("An unexprected error occured");
      }
    }
  };

  useEffect(() => {
    fetchFollowers();
  }, [username]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {followers.map((follower) => (
        <Link key={follower.id} href={follower.html_url} target="_blank">
          <div className="border p-4 rounded shadow cursor-pointer hover:bg-gray-100 transition">
            <Image
              src={follower.avatar_url}
              alt={follower.login}
              width={50}
              height={50}
              className="w-12 h-12 rounded-full"
            />
            <h3 className="text-lg font-semibold mt-2">{follower.login}</h3>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default FollowersList;
