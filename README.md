# LicensePrep — Nepal Driving License Written Exam Preparation

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-14.2-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)](https://tailwindcss.com/)
[![Cloudflare Pages](https://img.shields.io/badge/Cloudflare_Pages-Compatible-f38020)](https://pages.cloudflare.com/)

> **"Prepare Smarter. Drive Safer."**  
> Complete, production-grade driving license written examination preparation platform for Nepal Department of Transport Management (DOTM / यातायात व्यवस्था विभाग) Category A (Motorcycle) and Category K (Scooter / Moped) written exams.

---

## 🌟 Highlights & Features

- **100% Official DOTM Dataset**: Integrated all 500 questions from the official DOTM question bank verbatim, preserving exact Nepali (Devanagari) and English typography.
- **Interactive Practice Mode (`/practice`)**: One question at a time with instant answer checking, correct/incorrect feedback, retry option, sequential vs. random mode, and category filtering.
- **Timed Mock Examination (`/exam`)**: Authentic examination simulation with countdown timer, randomized questions, randomized option order while preserving 100% accurate correct-answer mapping, question palette grid, flagging questions for review, unanswered tracking, and automatic submission on timer expiration.
- **Detailed Examination Results (`/results`)**: Comprehensive score breakdown, pass/fail status, accuracy percentages, category-by-category performance analysis, and filtered question-by-question review (All, Incorrect, Correct, Skipped).
- **500-Question Bank (`/questions`)**: Full search interface supporting both Nepali Unicode (e.g. `जेब्रा`, `बत्ती`, `सडक`) and English keywords, filtering by 6 syllabus sections, status filters (practiced/unpracticed), and a Study Mode toggle to reveal or hide answers.
- **Bookmark System (`/bookmarks`)**: Save difficult or high-yield questions to localStorage and practice bookmarked questions in a dedicated session.
- **Offline Client-Side Progress**: Versioned `localStorage` engine tracking attempted questions, correct vs. incorrect answers, overall accuracy, past exam history, and last active question. Zero external backend or tracking required.
- **Cloudflare Ready**: Native static export support (`output: 'export'`) configured for ultra-fast deployment on **Cloudflare Pages** or any global static CDN with custom headers and Wrangler integration.

---

## 📚 Nepal DOTM Category A & K Syllabus Sections

The questions are distributed across the 6 official syllabus categories:

| # | Section Name (विषय) | Question Range | Count |
|---|---|---|---|
| 1 | **सवारी सञ्चालन सम्बन्धी ज्ञान** (Vehicle Operation) | 1 – 130 | 130 |
| 2 | **सवारी ऐन नियमसम्बन्धी ज्ञान** (Traffic Laws & Rules) | 131 – 220 | 90 |
| 3 | **सवारी साधनको प्राविधिक तथा यान्त्रिक ज्ञान** (Mechanical & Tech) | 221 – 300 | 80 |
| 4 | **वातावरण प्रदूषण सम्बन्धी अवधारणात्मक ज्ञान** (Pollution Awareness) | 301 – 330 | 30 |
| 5 | **दुर्घटना सचेतना सम्बन्धी ज्ञान** (Accident Prevention) | 331 – 390 | 60 |
| 6 | **ट्राफिक सङ्केत सम्बन्धी ज्ञान** (Traffic Signs & Road Markings) | 391 – 500 | 110 |
| **Total** | | | **500** |

---

## ☁️ Cloudflare Pages Deployment Guide

LicensePrep is built for seamless hosting on **Cloudflare Pages**:

### Quick Deploy via Git

1. Push this repository to GitHub:
   ```bash
   git remote add origin https://github.com/cyberchimpdev/LicensePrep.git
   git push -u origin main
   ```
2. Log into the [Cloudflare Dashboard](https://dash.cloudflare.com/) and navigate to **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
3. Select the `cyberchimpdev/LicensePrep` repository.
4. Set the build configuration:
   - **Framework Preset**: `Next.js (Static Export)`
   - **Build Command**: `npm run build`
   - **Build Output Directory**: `out`
5. Click **Save and Deploy**. Cloudflare Pages will build and deploy the application globally in seconds!

### Deploy via Wrangler CLI

```bash
# Install Wrangler globally or use npx
npx wrangler pages deploy out --project-name=licenseprep
```

Security and cache headers are pre-configured in `public/_headers`.

---

## 🚀 Local Development & Testing

### Prerequisites

- **Node.js**: v18.18+ (tested on Node v24)
- **npm**: v9+

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Validation Test Suite

Run the automated test suite verifying dataset integrity, question parsing, option randomization, and exam grading:

```bash
npm run test:validation
```

### Production Build

```bash
npm run build
```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
