# Tech Blog

A modern tech blog built with Next.js 15, TypeScript, Tailwind CSS, and MDX.

## Features

- 📝 **MDX Support**: Write blog posts in Markdown with React components
- 🎨 **Beautiful Design**: Clean, modern UI with Tailwind CSS
- 💬 **Comments**: GitHub Giscus integration for comments
- 📱 **Responsive**: Mobile-first responsive design
- ⚡ **Fast**: Built with Next.js 15 and optimized for performance
- 🔍 **SEO Friendly**: Proper meta tags and structured data

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
my-notes/
├── app/                    # Next.js App Router
│   ├── blog/[slug]/       # Dynamic blog post pages
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
├── posts/                 # MDX blog posts
├── lib/                   # Utility functions and types
└── content-collections.ts # Content configuration
```

## Writing Blog Posts

1. **Create a new MDX file** in the `posts/` directory:
   ```mdx
   ---
   title: "Your Blog Post Title"
   description: "A brief description of your post"
   date: "2024-01-20"
   author: "Your Name"
   tags: ["nextjs", "react", "web-development"]
   image: "/your-image.jpg"
   ---

   # Your Blog Post Title

   Your content here...
   ```

2. **The post will automatically appear** on the home page and be accessible at `/blog/filename`

## Setting Up Comments (Giscus)

To enable comments on your blog posts:

1. **Set up Giscus** by following the instructions at [giscus.app](https://giscus.app/)

2. **Update the Giscus component** in `app/blog/[slug]/page.tsx`:
   ```tsx
   <Giscus
     repo="your-username/your-repo"
     repoId="your-repo-id"
     category="General"
     categoryId="your-category-id"
     mapping="pathname"
     theme="light"
   />
   ```

## Customization

### Styling
- The project uses Tailwind CSS for styling
- Typography is handled by `@tailwindcss/typography`
- Customize colors and theme in `tailwind.config.js`

### Content Collections
- Blog post processing is handled by `@content-collections/core`
- Configuration is in `content-collections.ts`
- Supports custom frontmatter fields

## Deployment

The easiest way to deploy is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with one click

## Tech Stack

- **Framework**: Next.js 15
- **Styling**: Tailwind CSS v4
- **Content**: MDX with Content Collections
- **Comments**: GitHub Giscus
- **Typography**: Tailwind Typography
- **Language**: TypeScript

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - feel free to use this project for your own blog!