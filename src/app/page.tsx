import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export default function Home() {
  return (
    <div>
      <Button>Click me</Button>
      <Card className="w-[350px] p-4">
        <Post />
        <Post />
        <Post />
      </Card>
    </div>
  );
}

const Post = () => {
  return (
    <div className="mb-4 grid grid-cols-[25px_1fr] items-start last:mb-0 last:pb-0">
      <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
      <div className="space-y-1">
        <p className="text-sm font-medium leading-none">
          テキストテキストテキストテキストテキスト
        </p>
        <p className="text-sm text-muted-foreground">2023/10/11</p>
      </div>
    </div>
  );
};
