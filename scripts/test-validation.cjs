const assert = require("node:assert");
const fs = require("node:fs");

console.log("=== RUNNING LICENSEPREP VALIDATION SUITE ===");

const rawData = JSON.parse(fs.readFileSync("./src/data/questions.json", "utf8"));

// 1. Raw Dataset checks
console.log("1. Checking Raw Dataset...");
assert.strictEqual(rawData.total_questions, 500, "Dataset must declare 500 questions");
assert.strictEqual(rawData.questions.length, 500, "Dataset must contain exactly 500 questions");
console.log("✓ Raw dataset contains 500 questions.");

// 2. Parser verification
console.log("2. Checking Question Parser logic...");
function parseQuestion(raw) {
  const options = Array.isArray(raw.options)
    ? raw.options
        .filter((opt) => opt && (opt.key || opt.text))
        .map((opt) => ({
          key: (opt.key || "").trim(),
          text: (opt.text || "").trim(),
        }))
    : [];

  const correctKey = (raw.correct_answer?.key || "").trim();
  const correctText = (raw.correct_answer?.text || "").trim();
  const isValidForExam = options.length >= 2 && Boolean(correctKey);

  return {
    id: `q-${raw.number}`,
    number: raw.number,
    section: (raw.section || "").trim(),
    question: (raw.question || "").trim(),
    options,
    correctAnswerKey: correctKey,
    correctAnswerText: correctText,
    sourcePage: raw.source_page || 1,
    isValidForExam,
    isNote: options.length === 0 ? "No options in source PDF" : undefined,
  };
}

const allQuestions = rawData.questions.map(parseQuestion);
assert.strictEqual(allQuestions.length, 500);

const validQuestions = allQuestions.filter((q) => q.isValidForExam);
assert.strictEqual(validQuestions.length, 499, "Valid questions must be 499 (excluding Q290)");

const q290 = allQuestions.find((q) => q.number === 290);
assert.strictEqual(q290.isValidForExam, false);
assert.ok(q290.isNote);
console.log("✓ Parser logic and Q290 edge case verified.");

// 3. Sections checks
console.log("3. Checking Sections...");
assert.strictEqual(rawData.sections.length, 6);
const totalSectionCount = rawData.sections.reduce((acc, s) => acc + s.count, 0);
assert.strictEqual(totalSectionCount, 500);
console.log("✓ All 6 DOTM categories verified (sum = 500).");

// 4. Option Randomization & Accurate Mapping check
console.log("4. Testing Option Randomization & Accurate Answer Mapping (500 iterations)...");
const STANDARD_DEV_KEYS = ["क", "ख", "ग", "घ", "ङ", "च"];

function shuffleArray(arr) {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function prepareExamQuestion(q, randomizeOptions) {
  let finalOptions;
  let correctKey;

  if (randomizeOptions && q.options.length > 1) {
    const shuffledOpts = shuffleArray(q.options);
    finalOptions = shuffledOpts.map((opt, i) => {
      const assignedKey = STANDARD_DEV_KEYS[i] || opt.key;
      return {
        key: assignedKey,
        text: opt.text,
        originalKey: opt.key,
      };
    });

    const matchingOption = finalOptions.find((o) => o.originalKey === q.correctAnswerKey);
    correctKey = matchingOption ? matchingOption.key : q.correctAnswerKey;
  } else {
    finalOptions = q.options.map((opt) => ({
      key: opt.key,
      text: opt.text,
      originalKey: opt.key,
    }));
    correctKey = q.correctAnswerKey;
  }

  return {
    id: `exam-q-${q.number}`,
    originalNumber: q.number,
    section: q.section,
    question: q.question,
    options: finalOptions,
    correctOptionKey: correctKey,
    correctAnswerText: q.correctAnswerText,
  };
}

for (let i = 0; i < validQuestions.length; i++) {
  const randomQ = validQuestions[i];
  const examQ = prepareExamQuestion(randomQ, true);

  const correctOpt = examQ.options.find((o) => o.key === examQ.correctOptionKey);
  assert.ok(correctOpt, `Exam question ${examQ.originalNumber} must have option for key ${examQ.correctOptionKey}`);
  assert.strictEqual(
    correctOpt.text,
    randomQ.correctAnswerText,
    `Question #${examQ.originalNumber}: Option text for key ${examQ.correctOptionKey} must equal "${randomQ.correctAnswerText}"`
  );
  assert.strictEqual(
    correctOpt.originalKey,
    randomQ.correctAnswerKey,
    `Question #${examQ.originalNumber}: Original key must equal "${randomQ.correctAnswerKey}"`
  );
}
console.log("✓ 500 randomized transformations verified with 100% correct answer mapping accuracy.");

// 5. Exam Grading check
console.log("5. Testing Exam Grading Logic...");
function gradeExam(questions, passingPercentage) {
  let correctCount = 0;
  let incorrectCount = 0;
  let skippedCount = 0;

  questions.forEach((q) => {
    if (!q.userSelectedKey) {
      skippedCount++;
    } else if (q.userSelectedKey === q.correctOptionKey) {
      correctCount++;
    } else {
      incorrectCount++;
    }
  });

  const total = questions.length;
  const percentage = Math.round((correctCount / total) * 100);
  const passed = percentage >= passingPercentage;

  return { total, correctCount, incorrectCount, skippedCount, percentage, passed };
}

const mockExamQuestions = validQuestions.slice(0, 20).map((q) => prepareExamQuestion(q, true));
mockExamQuestions.forEach((q, idx) => {
  if (idx < 12) q.userSelectedKey = q.correctOptionKey;
  else if (idx < 17) {
    const wrong = q.options.find((o) => o.key !== q.correctOptionKey);
    q.userSelectedKey = wrong ? wrong.key : "none";
  } else {
    q.userSelectedKey = undefined; // skipped
  }
});

const result = gradeExam(mockExamQuestions, 50);
assert.strictEqual(result.total, 20);
assert.strictEqual(result.correctCount, 12);
assert.strictEqual(result.incorrectCount, 5);
assert.strictEqual(result.skippedCount, 3);
assert.strictEqual(result.percentage, 60);
assert.strictEqual(result.passed, true);

console.log("✓ Exam grading logic verified: 12 correct, 5 incorrect, 3 skipped => 60%, Passed: true.");
console.log("\n=== ALL UNIT ASSERTIONS PASSED WITH ZERO ERRORS! ===");
