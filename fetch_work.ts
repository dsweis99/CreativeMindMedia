import https from 'https';

https.get('https://www.creatvemindsmedia.com/work/', (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    const headings = [...data.matchAll(/<h[1-6][^>]*>(.*?)<\/h[1-6]>/g)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
    const links = [...data.matchAll(/<a[^>]+href="([^">]+)"[^>]*>(.*?)<\/a>/g)].map(m => ({href: m[1], text: m[2].replace(/<[^>]+>/g, '').trim()}));
    const images = [...data.matchAll(/<img[^>]+src="([^">]+)"[^>]*alt="([^">]*)"/g)].map(m => ({src: m[1], alt: m[2]}));
    
    console.log("Headings:", JSON.stringify(headings, null, 2));
    console.log("Links:", JSON.stringify(links.filter(l => l.href.includes('work')), null, 2));
    console.log("Images:", JSON.stringify(images.filter(i => i.src.includes('uploads')), null, 2));
  });
}).on("error", (err) => {
  console.log("Error: " + err.message);
});
