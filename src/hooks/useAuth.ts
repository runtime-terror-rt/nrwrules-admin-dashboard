import { useAppSelector } from "@/redux/store/hooks";

export const useAuth = () => {
  const { user } = useAppSelector((state) => state.auth);
  
  return {
    user,
    isAuthenticated: !!user,
  };
};
