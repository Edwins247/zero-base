const newsCache = {}; 

export function cacheNews(category, page, data) {
  const key = `${category}-${page}`;
  newsCache[key] = data;
}

export function getCachedNews(category, page) {
  const key = `${category}-${page}`;
  return newsCache[key];
}


