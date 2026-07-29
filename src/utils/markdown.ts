export function parseFrontmatter(markdown: string) {
  const frontmatterRegex = /^---\s*[\r\n]+([\s\S]*?)[\r\n]+---\s*[\r\n]+/;
  const match = markdown.match(frontmatterRegex);

  let data: Record<string, string> = {};
  let content = markdown;

  if (match) {
    const frontmatterString = match[1];
    content = markdown.replace(frontmatterRegex, '');

    frontmatterString.split('\n').forEach(line => {
      const [key, ...valueParts] = line.split(':');
      if (key && valueParts.length > 0) {
        let value = valueParts.join(':').trim();
        if (value.startsWith('"') && value.endsWith('"')) {
          value = value.substring(1, value.length - 1);
        } else if (value.startsWith("'") && value.endsWith("'")) {
          value = value.substring(1, value.length - 1);
        }
        data[key.trim()] = value;
      }
    });
  }

  return { data, content };
}
