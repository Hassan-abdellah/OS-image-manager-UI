import { useRootFolder } from "@/hooks/useFolders";
import { useAuth } from "@clerk/react";

const HomePage = () => {
  const { data } = useRootFolder();
  const { userId } = useAuth();
  console.log("user", userId);
  return <div>HomePage</div>;
};

export default HomePage;
