# Official ReadSonic Next.js Component

Official Next.js component for [ReadSonic](https://readsonic.io).

## Installation

### NPM

```bash
npm install nextjs-readsonic
```

### Yarn

```bash
yarn add nextjs-readsonic
```

### PNPM

```bash
pnpm add nextjs-readsonic
```

## Usage

Add the `<ReadSonic />` component to your page. The component should be placed in the component that wraps all of your blog posts.

For example, if you have a `app/blog/[slug].tsx` page that renders all of your blog posts, you should add the `<ReadSonic />` component to that page, or to a component that is rendered by that page.

```tsx
import ReadSonic from 'nextjs-readsonic';

export default function Post() {
  return (
    <div>
      <ReadSonic />  <-- Add this component
      <h1>Post Title</h1>
      <article>
        <p>Post content</p>
        <p>...</p>
      </article>
    </div>
  );
}
```

> **IMPORTANT**: ReadSonic currently reads everything that is between the `<article>` and `</article>` tags on your page, but nothing else. Use these tags on your blog posts to ensure that ReadSonic reads the correct content.


## Props

By default, `<ReadSonic />` will render a play button wherever it is placed on the page. You can customize the component with the `className` prop.

```tsx
<ReadSonic className="my-custom-class" />
```
