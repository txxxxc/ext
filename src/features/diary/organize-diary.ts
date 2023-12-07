import { Diary } from "./type";
// Diary型の配列を受け取って日付順にソートし、
// 各日付と日記の本文を結合した文字列を生成し
// 一つの文字列に返す関数
export const organizeDiary = (diaries: Diary[]): string => {
  // 日付順にソート
  const sortedDiaries = diaries.sort((a, b) => {
    return a.date > b.date ? 1 : -1;
  });

  // 日付と本文を結合
  const diariesWithDate = sortedDiaries.map((diary) => {
    return `${diary.date}\n${diary.body}`;
  });

  // 一つの文字列に結合
  return diariesWithDate.join("\n\n");
};
