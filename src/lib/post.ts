export type UserWithPosts = {
  posts: Post[];
};

export type Post = {
  body: string;
  date: string;
};
