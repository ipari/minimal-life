export type Lang = "ko" | "en";

export const languages: Lang[] = ["ko", "en"];

export const ui = {
  en: {
    site_title: "Leaflette",
    description: "Notes on thoughtful ownership",
    recent_posts: "Recent posts",
    more: "More",
    view_all: "View all",
    no_posts: "No posts yet.",
    recent_items: "Recently acquired",
    recent_reviews: "Recent No-Buys",
    my_items: "My things",
    no_items: "No items yet.",
    all_posts: "All Posts",
    all_reviews: "No-Buys",
    acquired_date: "Acquired",
    back: "Back",
    view_all_items: "Things from before",
    past_items: "Things from before",
    about_nav: "About",
    author_title: "About the author",
    author_summary: "I write about owning less, using things longer, and making room for what matters.",
    author_more: "Read more",
  },
  ko: {
    site_title: "Leaflette",
    description: "고민하며 소유하는 기록",
    recent_posts: "최근 글",
    more: "더 보기",
    view_all: "전체 보기",
    no_posts: "아직 작성된 글이 없습니다.",
    recent_items: "최근 들인 물건들",
    recent_reviews: "최근 들이지 않기로 한 물건들",
    my_items: "나의 물건들",
    no_items: "아직 등록된 물건이 없습니다.",
    all_posts: "모든 글",
    all_reviews: "들이지 않기로 한 물건들",
    acquired_date: "들임",
    back: "뒤로 가기",
    view_all_items: "지나온 물건들",
    past_items: "지나온 물건들",
    about_nav: "소개",
    author_title: "글쓴이 소개",
    author_summary: "적게 소유하고 오래 사용하며, 중요한 것을 위한 자리를 만드는 과정을 기록합니다.",
    author_more: "더 알아보기",
  },
} as const;

export const itemCategories = [
  { id: "electronics", ko: "전자기기", en: "Electronics" },
  { id: "clothing", ko: "의류·신발", en: "Clothing & footwear" },
  { id: "bags", ko: "가방·액세서리", en: "Bags & accessories" },
  { id: "kitchen", ko: "주방용품", en: "Kitchen" },
  { id: "bathroom", ko: "욕실·위생용품", en: "Bathroom & hygiene" },
  { id: "household", ko: "침구·생활용품", en: "Household" },
  { id: "furniture", ko: "가구·인테리어", en: "Furniture & interior" },
  { id: "stationery", ko: "문구·사무용품", en: "Stationery & office" },
  { id: "books", ko: "책·기록물", en: "Books & records" },
  { id: "hobbies", ko: "취미·운동용품", en: "Hobbies & exercise" },
  { id: "tools", ko: "공구·관리용품", en: "Tools & maintenance" },
  { id: "supplies", ko: "소모품·비축품", en: "Supplies" },
  { id: "keepsakes", ko: "추억·기념품", en: "Keepsakes" },
  { id: "other", ko: "기타", en: "Other" },
] as const;

export function formatDate(date: Date, lang: Lang, style: "long" | "short" = "long") {
  if (style === "short") {
    return `${date.getUTCFullYear()}.${String(date.getUTCMonth() + 1).padStart(2, "0")}.${String(date.getUTCDate()).padStart(2, "0")}`;
  }

  if (lang === "ko") {
    return `${date.getUTCFullYear()}년 ${String(date.getUTCMonth() + 1).padStart(2, "0")}월 ${String(date.getUTCDate()).padStart(2, "0")}일`;
  }

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(date);
}

export function formatAcquiredDate(date: Date, lang: Lang) {
  if (lang === "ko") {
    return `${date.getUTCFullYear()}년 ${date.getUTCMonth() + 1}월 ${date.getUTCDate()}일에 ${ui.ko.acquired_date}`;
  }

  return `${ui.en.acquired_date} ${new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(date)}`;
}

export function slugFromPermalink(permalink: string) {
  return permalink.split("/").filter(Boolean).at(-1) ?? "";
}
