import { use, useOptimistic } from "react";
import { User } from "../../shared/api";
import { createUserAction, deleteUserAction } from "./action";
import { useUsersGlobal } from "../../entities/user";

export function useUsers() {
  const { refetchUsers, usersPromise } = useUsersGlobal();

  const [createdUsers, optimisticCreate] = useOptimistic(
    [] as User[],
    (createdUsers, user: User) => [...createdUsers, user]
  );
  const [deletedUsersIds, optimisticDelete] = useOptimistic(
    [] as string[],
    (deletedUsersIds, id: string) => deletedUsersIds.concat(id)
  );

  const useUsersList = () => {
    const users = use(usersPromise);
    return users
      .concat(createdUsers)
      .filter((user) => !deletedUsersIds.includes(user.id));
  };

  return {
    createUserAction: createUserAction({ refetchUsers, optimisticCreate }),
    deleteUserAction: deleteUserAction({ refetchUsers, optimisticDelete }),
    useUsersList,
  } as const;
}
