import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDir = path.resolve('src/posts');
const outputFile = path.resolve('src/postsData.json');

const posts = [];

if (fs.existsSync(postsDir)) {
  const files = fs.readdirSync(postsDir);

  for (const file of files) {
    if (file.endsWith('.md')) {
      const slug = file.replace('.md', '');
      const content = fs.readFileSync(path.join(postsDir, file), 'utf-8');
      
      const { data, excerpt } = matter(content, { excerpt: true, excerpt_separator: '<!-- more -->' });
      
      posts.push({
        slug,
        title: data.title || slug,
        date: data.date || new Date().toISOString().split('T')[0],
        author: data.author || 'Sahan',
        points: data.points || '1',
      });
    }
  }
}

posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

fs.writeFileSync(outputFile, JSON.stringify(posts, null, 2));
console.log('Posts data generated!');
