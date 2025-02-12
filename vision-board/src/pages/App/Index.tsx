import { useState } from "react";
import dynamic from "next/dynamic";
import { User } from "firebase/auth"; // Import User type
import Login from "../Login/Index";
import VisionBoard from "../Home/Index";

function Index() {
  const [user, setUser] = useState<User | null>(null); // Explicitly set the type here

  return (
    <div className="Index">
      {user ? <VisionBoard user={user} /> : <Login setUser={setUser} />}
    </div>
  );
}

export default Index;
