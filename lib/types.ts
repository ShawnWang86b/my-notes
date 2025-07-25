export interface BlogPost {
  _meta: {
    path: string;
    filePath: string;
    directory: string;
  };
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  image?: string;
  mdx: string;
}
