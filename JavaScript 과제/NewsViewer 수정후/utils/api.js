const API_KEY = "21b9896d7a53434e97d6ae27f982dfc1";

export const fetchNews = async (category, page = 1, pageSize = 5) => {
  try {

    const categoryParam = category !== "all" ? `&category=${category}` : "";

    const url = `https://newsapi.org/v2/top-headlines?country=us${categoryParam}&page=${page}&pageSize=${pageSize}&apiKey=${API_KEY}`;

    console.log("Fetching news from URL:", url);

    const response = await axios.get(url);

    return {
      articles: response.data.articles || [],
      totalResults: response.data.totalResults || 0,
    };

  } catch (error) {
    console.error("뉴스를 불러오던 중 에러가 발생했습니다.", error);
    return { articles: [], totalResults: 0 };
  }
};
