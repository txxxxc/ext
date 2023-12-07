"use client";
import { useEffect, useState } from "react";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Diary, mocks } from "@/features/diary";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useUserPosts } from "@/hooks/use-user-posts";
import { useCreatePost } from "@/hooks/use-create-post";
import dayjs from "dayjs";

const FormSchema = z.object({
  body: z
    .string()
    .min(0, {
      message: "Body can't be empty.",
    })
    .max(160, {
      message: "Body must not be longer than 30 characters.",
    }),
});

export default function Home() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [analysis, setAnalysis] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [posts, setPosts] = useUserPosts();
  const [createPost] = useCreatePost();

  const analyzeDiary = async (diaries: Diary[]) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/analysis-diary`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ diaries }),
      },
    );
    const data = await res.json();
    return data;
  };

  const analyze = async () => {
    setLoading(true);
    const data = await analyzeDiary(diaries);
    setAnalysis(data);
    setLoading(false);
  };

  useEffect(() => {
    setDiaries(mocks.plain);
  }, []);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    form.reset();
    createPost(data.body);
    setPosts((prev) => [
      { date: dayjs().format("YYYY-MM-DD"), body: data.body },
      ...prev,
    ]);
  }

  return (
    <div>
      <div className="flex justify-between items-center max-w-2xl mx-auto px-4 py-4">
        <h1 className="text-2xl font-bold">Diary</h1>
      </div>
      <Container>
        <Card className="w-full p-4">
          <CardTitle>Analysis</CardTitle>
          <CardDescription>You can analyze your diary.</CardDescription>
          <div className="flex justify-end mt-4">
            {loading ? (
              <ButtonLoading />
            ) : (
              <Button variant="outline" onClick={() => analyze()}>
                Start Analysis
              </Button>
            )}
          </div>

          {analysis && (
            <>
              <CardTitle className="mt-4">Result</CardTitle>
              <CardDescription>Your analysis result is here.</CardDescription>
              <p className="max-h-500 overflow-y-auto leading-7 whitespace-pre-wrap">
                {analysis}
              </p>
            </>
          )}
        </Card>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-2"
          >
            <FormField
              control={form.control}
              name="body"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Body</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder=""
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </Form>
        {posts.map((diary, i) => (
          <Post key={i} {...diary} />
        ))}
      </Container>
    </div>
  );
}

const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col items-center min-h-screen py-10 px-4">
      {/* 真ん中のコンテンツのコンテナで、maxwidthは600px程度、画面が小さくなったらwidthは100% gapは32px程度 */}
      <div className="flex flex-col items-center max-w-xl w-full gap-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </div>
  );
};

const Post = ({ date, body }: Diary) => {
  return (
    <Card className="w-full p-4">
      <div className="mb-4 grid grid-cols-[25px_1fr] items-start last:mb-0 last:pb-0">
        <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
        <div className="space-y-1">
          <p className="text-sm font-medium leading-none">
            <span className="text-gray-900">{body}</span>
          </p>
          <p className="text-sm text-muted-foreground">{date}</p>
        </div>
      </div>
    </Card>
  );
};

function ButtonLoading() {
  return (
    <Button disabled>
      <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
      Please wait
    </Button>
  );
}
