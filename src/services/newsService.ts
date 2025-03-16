interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  description: string;
}

const CORS_PROXY = 'https://api.allorigins.win/raw?url=';
const RSS_URL = 'https://www.autosport.com/rss/f1/news/';

export const getF1News = async (): Promise<NewsItem[]> => {
  try {
    const response = await fetch(`${CORS_PROXY}${encodeURIComponent(RSS_URL)}`);
    const xmlText = await response.text();
    
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
    const items = xmlDoc.querySelectorAll('item');
    
    return Array.from(items).map(item => ({
      title: item.querySelector('title')?.textContent || '',
      link: item.querySelector('link')?.textContent || '',
      pubDate: item.querySelector('pubDate')?.textContent || '',
      description: item.querySelector('description')?.textContent || ''
    })).slice(0, 5);
  } catch (error) {
    console.error('Error fetching F1 news:', error);
    return [];
  }
}; 