# Class A/K Driving License Practice Dataset

## Contents
- `class-a-k-driving-license-500-questions-with-images.json` — all 500 questions, options, correct answers, sections, source pages, and image references.
- `images/` — original illustrations extracted from the supplied PDF.

## Image rendering
Each question has an `images` array. It is empty when the source PDF has no illustration for that question.

Example:
```js
{ "number": 416, "images": [
  { "src": "images/question-416-image-1.png", "alt": "प्रश्न 416 को चित्र", "source_page": 57 }
]}
```

In a Next.js app, if the JSON and `images/` folder are both placed under `public/data/`, render with:
```jsx
{question.images?.map((image) => (
  <img key={image.src} src={`/data/${image.src}`} alt={image.alt}
       className="max-w-full h-auto object-contain" />
))}
```
Keep the JSON file and `images/` folder together so the relative paths remain valid.
