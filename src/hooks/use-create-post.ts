import { useFirebaseAuthnContext } from "@/contexts/firebase";
import { collections } from "@/lib/firebase";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import dayjs from "dayjs";

export const useCreatePost = () => {
  const { currentUser } = useFirebaseAuthnContext();
  if (!currentUser) throw new Error("User is not logged in");
  const createPost = async (body: string): Promise<void> => {
    const { id } = currentUser;
    const key = collections.app.v1.user(id).get();
    updateDoc(doc(...key), {
      posts: arrayUnion({
        body: body,
        date: dayjs().format("YYYY-MM-DD"),
      }),
    }).then((data) => console.log("post created: ", data));
  };
  return [createPost];
};
