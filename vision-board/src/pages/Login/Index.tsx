import { FC } from "react";
import { auth, provider } from "../../firebase"; // Adjust based on your file structure
import { signInWithPopup, User } from "firebase/auth";

// Define types for the props
interface LoginProps {
  setUser: (user: User | null) => void;
}

const Index: FC<LoginProps> = ({ setUser }) => {
  const signIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user); // Set the authenticated user
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <button
        onClick={signIn}
        className="px-6 py-3 bg-blue-500 text-white rounded-lg"
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default Index;
