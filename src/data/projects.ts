export type Project = {
  id: string;
  name: string;
  category: 'Social Media' | 'Branding' | 'Web' | 'Design';
  logo: string;
  prob: string;
  sol: string[];
  result: string;
};

export const projects: Project[] = [
  { id: 'dotsugar', name: 'Dot Sugar PDX', category: 'Social Media', logo: 'https://www.creatvemindsmedia.com/wp-content/uploads/2025/12/Dot-Sugar-Logo-1.png', prob: 'No visual consistency or brand presence online', sol: ['Social Media', 'Design'], result: '↑ 2.4M Views & 240% Engagement' },
  { id: 'sheesh', name: 'SHEESH Shawarma', category: 'Web', logo: 'https://www.creatvemindsmedia.com/wp-content/uploads/2025/12/SHEESH-LOGO-03-1024x408.png', prob: 'No engagement despite regular posting', sol: ['Social Media', 'Design', 'Web'], result: '0 → 12.5K Followers in 3 Months' },
  { id: 'classicshawarma', name: 'Classic Shawarma', category: 'Branding', logo: 'https://www.creatvemindsmedia.com/wp-content/uploads/2025/12/ClassicShawarmaLogo-05-1024x1024.png', prob: 'No digital presence at launch', sol: ['Social Media', 'Design', 'Web'], result: '↑ 150% Foot Traffic & 500K Reach' },
  { id: 'hellophilly', name: 'Hello Philly Cheese', category: 'Web', logo: 'https://www.creatvemindsmedia.com/wp-content/uploads/2025/05/7.png', prob: 'Website abandoned by previous agency', sol: ['Design', 'Web'], result: '↑ 300% Traffic Growth' },
  { id: 'mrpotato', name: 'Mr Potato', category: 'Design', logo: 'https://www.creatvemindsmedia.com/wp-content/uploads/2025/06/Mr-Potato-Logo-04-300x300.png', prob: 'No digital presence at launch', sol: ['Branding', 'Social Media', 'Web'], result: '↑ 500% Brand Awareness & 1M+ Impressions' },
  { id: 'macadeli', name: 'Mac-A-Deli', category: 'Branding', logo: 'https://www.creatvemindsmedia.com/wp-content/uploads/2025/12/Wing-A-Deli-Logo-03-300x57.png', prob: 'No digital presence at launch', sol: ['Branding', 'Social Media', 'Web'], result: 'Sold Out Opening Week & 10K+ Local Reach' },
  { id: 'chickenshit', name: "Chicken's Hit", category: 'Social Media', logo: 'https://www.creatvemindsmedia.com/wp-content/uploads/2025/12/Chickens-Hit-4-300x300.png', prob: 'Needed bold impact online', sol: ['Social Media', 'Content Creation'], result: '↑ 300% Online Orders & 50K Monthly Views' },
  { id: 'shawarmaspot', name: 'Shawarma Spot', category: 'Branding', logo: 'https://www.creatvemindsmedia.com/wp-content/uploads/2025/12/Shawarma-Spot-Logo-300x300.png', prob: 'Needed a strong identity to stand out', sol: ['Branding', 'Design'], result: 'Your Spot, Their Craving' },
  { id: 'bakeontherun', name: 'Bake on the Run', category: 'Branding', logo: 'https://www.creatvemindsmedia.com/wp-content/uploads/2025/12/BakeontheRunlogocopy2-300x62.png', prob: 'Lacked a cohesive street-savvy look', sol: ['Branding', 'Design'], result: 'Island Flavor. Street Savvy.' },
  { id: 'sealand', name: 'Sealand Fish & Chips', category: 'Design', logo: 'https://www.creatvemindsmedia.com/wp-content/uploads/2025/06/Sealand-Fish-Chips-Logo-300x300.png', prob: 'Outdated visual identity', sol: ['Design', 'Branding'], result: 'Hooked on Identity. Anchored in Design.' },
  { id: 'shawarmahazard', name: 'Shawarma Hazard', category: 'Social Media', logo: 'https://www.creatvemindsmedia.com/wp-content/uploads/2025/12/Hazard-Logo-Final-01-300x163.png', prob: 'Low digital engagement', sol: ['Social Media', 'Content Creation'], result: 'Dangerously Good. Digitally Delivered.' },
  { id: 'turfandivy', name: 'Turf and Ivy', category: 'Web', logo: 'https://www.creatvemindsmedia.com/wp-content/uploads/2025/12/Turf-and-Ivy-Website-Logo-01-1024x519.png', prob: 'Needed an elevated online presence', sol: ['Web', 'Design'], result: 'Earthy Meets Elevated' },
  { id: 'mrgyro', name: 'Mr Gyro', category: 'Design', logo: 'https://www.creatvemindsmedia.com/wp-content/uploads/2025/12/Mr-Gyro-Logo-300x300.png', prob: 'Needed fresh design for their flavor', sol: ['Design', 'Branding'], result: 'Flavor with a Side of Fresh Design' },
  { id: 'sophiascafe', name: "SOPHIA'S CAFE", category: 'Design', logo: 'https://www.creatvemindsmedia.com/wp-content/uploads/2025/12/SOPHIAS-CAFE-New-Logo-300x77.png', prob: 'Menu and styling needed an upgrade', sol: ['Design', 'Branding'], result: 'Comfort, Styled & Served' },
  { id: 'mikescheesesteak', name: "Mike's Cheesesteak", category: 'Branding', logo: 'https://www.creatvemindsmedia.com/wp-content/uploads/2025/06/Mikes-Cheesesteak-Logo-01-300x300.png', prob: 'Needed a brand built to drip', sol: ['Branding', 'Design'], result: 'Built to Drip' },
  { id: 'namobuddha', name: 'Namo Buddha', category: 'Branding', logo: 'https://www.creatvemindsmedia.com/wp-content/uploads/2025/12/Namo-Buddha-Logo-300x300.png', prob: 'Required a refreshed look', sol: ['Branding', 'Design'], result: 'A Taste of the Himalayas, Refreshed.' },
  { id: 'shawarmagrill', name: 'Shawarma Grill Halal', category: 'Social Media', logo: 'https://www.creatvemindsmedia.com/wp-content/uploads/2025/12/Shawarma-Grill-Halal-Logo-10-1-300x300.png', prob: 'Needed digital sizzle to match the grill', sol: ['Social Media', 'Design'], result: 'Grill Heat. Digital Sizzle.' },
  { id: 'fosterfoodcarts', name: 'Foster Food Carts', category: 'Web', logo: 'https://www.creatvemindsmedia.com/wp-content/uploads/2025/12/Foster-Food-Carts-Logo-300x300.png', prob: 'Needed a community hub online', sol: ['Web', 'Social Media'], result: 'Serving Flavor. Supporting Community.' },
  { id: 'hawthorne', name: 'Hawthorne Street Food and Bar', category: 'Branding', logo: 'https://www.creatvemindsmedia.com/wp-content/uploads/2025/12/Hawthorne-Logo-300x300.png', prob: 'Needed a block-ready identity', sol: ['Branding', 'Design'], result: 'Built for the Block.' },
  { id: 'shawarmacenter', name: 'Shawarma Center', category: 'Design', logo: 'https://www.creatvemindsmedia.com/wp-content/uploads/2025/12/Shawarma-Center-Logo-BASIC-01-300x300.png', prob: 'Food truck needed a visual overhaul', sol: ['Design', 'Branding'], result: 'Flavor That Shows Up Daily.' },
  { id: 'futureminds', name: 'The Future Minds', category: 'Social Media', logo: 'https://www.creatvemindsmedia.com/wp-content/uploads/2025/12/TFM-Logo-Final-300x74.png', prob: 'Needed to shape stories for the future', sol: ['Social Media', 'Content Creation'], result: 'Stories That Shape the Future.' },
  { id: 'carolecharbel', name: 'Carole & Charbel', category: 'Web', logo: 'https://www.creatvemindsmedia.com/wp-content/uploads/2025/12/Carole-Charbel-Isolated-300x300.png', prob: 'Needed a platform for life\'s moments', sol: ['Web', 'Design'], result: 'Life, Love, and the Moments Between.' },
];
