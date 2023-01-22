import { useQuery } from "@tanstack/react-query";
import { UserEntity } from "../types/User";

const fetchUsers = async (): Promise<UserEntity[]> => {
  const response = await fetch("http://localhost:3002/users");
  if (!response.ok) {
    throw new Error("Something went wrong 😔");
  }
  return response.json();
};

export const useUsersQuery = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    select: (data): { [id: string]: { name: string; email: string } } =>
      data.reduce(
        (users, { id, name, email }) => ({ ...users, [id]: { name, email } }),
        {}
      ),
  });
};
