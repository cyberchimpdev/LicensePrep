const fs = require('fs');
const path = require('path');

const imgDatasetPath = path.join(__dirname, '../questions with image/questions.json');
const imgDir = path.join(__dirname, '../questions with image/images');
const currentDatasetPath = path.join(__dirname, '../src/data/questions.json');

console.log('--- INSPECTING DATASETS ---');

const imgData = JSON.parse(fs.readFileSync(imgDatasetPath, 'utf8'));
const currentData = JSON.parse(fs.readFileSync(currentDatasetPath, 'utf8'));

console.log(`Image-enabled dataset questions count: ${imgData.questions.length}`);
console.log(`Current dataset questions count: ${currentData.questions.length}`);

// Check questions with images
const questionsWithImages = imgData.questions.filter(q => q.images && q.images.length > 0);
console.log(`Total questions with images in imgData: ${questionsWithImages.length}`);

let totalImageRefs = 0;
let missingImages = [];
let existingImages = [];

const diskFiles = new Set(fs.readdirSync(imgDir));
console.log(`Total image files on disk in images/: ${diskFiles.size}`);

questionsWithImages.forEach(q => {
  q.images.forEach((img, idx) => {
    totalImageRefs++;
    // img.src is e.g. "images/question-416-image-1.png"
    const basename = path.basename(img.src);
    if (diskFiles.has(basename)) {
      existingImages.push({ qNum: q.number, src: img.src, basename, alt: img.alt });
    } else {
      missingImages.push({ qNum: q.number, src: img.src, basename });
    }
  });
});

console.log(`Total image references across all questions: ${totalImageRefs}`);
console.log(`Existing images found on disk: ${existingImages.length}`);
console.log(`Missing images: ${missingImages.length}`);

if (missingImages.length > 0) {
  console.log('MISSING IMAGE REFERENCES:', JSON.stringify(missingImages, null, 2));
}

// Check unreferenced images on disk
const referencedBasenames = new Set(existingImages.map(e => e.basename));
const unreferencedOnDisk = Array.from(diskFiles).filter(f => !referencedBasenames.has(f));
console.log(`Unreferenced image files on disk: ${unreferencedOnDisk.length}`);
if (unreferencedOnDisk.length > 0) {
  console.log('Unreferenced image files:', unreferencedOnDisk);
}

// Sample question with images
console.log('\nSample question with image:');
console.log(JSON.stringify(questionsWithImages[0], null, 2));

// Check if currentData has images field
const currentHasImages = currentData.questions.filter(q => q.images && q.images.length > 0);
console.log(`\nCurrent dataset questions with images: ${currentHasImages.length}`);
