import { useFirebaseAuthnContext } from "@/contexts/firebase";
import { collections } from "@/lib/firebase";
import { Post, UserWithPosts } from "@/lib/post";
import dayjs from "dayjs";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

export const useUserPosts = () => {
  const { currentUser } = useFirebaseAuthnContext();
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    if (!currentUser) return;
    const { id } = currentUser;
    const key = collections.app.v1.user(id).get();
    getDoc(doc(...key)).then((snapshot) => {
      if (!snapshot.exists()) {
        const c = collection(...collections.app.v1.users.get());
        setDoc(doc(c, id), {
          posts: [
            {
              date: "2023-12-02",
              body: "最初の投稿",
            },
          ],
        } as UserWithPosts).then((data) =>
          console.log("user initialized: ", data),
        );
      } else {
        const user = snapshot.data() as UserWithPosts;
        setPosts(
          user.posts.sort(
            (a, b) => dayjs(b.date).unix() - dayjs(a.date).unix(),
          ),
        );
      }
    });
  }, [currentUser]);

  return [posts, setPosts] as const;
};
