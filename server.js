const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
var path = require("path");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

const questionStore = [
  {
    question: "What is the speed of light?",
    subject: "Physics",
    topic: "Waves",
    difficulty: "Easy",
    marks: 5,
  },
  {
    question: "How does a lens work?",
    subject: "Physics",
    topic: "Optics",
    difficulty: "Medium",
    marks: 8,
  },
  {
    question: "Explain the laws of thermodynamics.",
    subject: "Physics",
    topic: "Thermodynamics",
    difficulty: "Hard",
    marks: 10,
  },
  {
    question: "Define Newton's laws of motion.",
    subject: "Physics",
    topic: "Mechanics",
    difficulty: "Medium",
    marks: 8,
  },
  {
    question: "Explain the concept of electric current.",
    subject: "Physics",
    topic: "Electricity",
    difficulty: "Easy",
    marks: 5,
  },
  {
    question: "How does a rainbow form?",
    subject: "Physics",
    topic: "Waves",
    difficulty: "Easy",
    marks: 5,
  },
  {
    question: "Define the laws of reflection.",
    subject: "Physics",
    topic: "Optics",
    difficulty: "Easy",
    marks: 5,
  },
  {
    question: "Explain the concept of interference in waves.",
    subject: "Physics",
    topic: "Waves",
    difficulty: "Medium",
    marks: 8,
  },
  {
    question: "What is Boyle's law?",
    subject: "Physics",
    topic: "Thermodynamics",
    difficulty: "Hard",
    marks: 10,
  },
  {
    question: "Define the concept of simple harmonic motion.",
    subject: "Physics",
    topic: "Mechanics",
    difficulty: "Medium",
    marks: 8,
  },
  {
    question: "What is the formula for electric potential energy?",
    subject: "Physics",
    topic: "Electricity",
    difficulty: "Easy",
    marks: 5,
  },
  {
    question: "How does a transformer work?",
    subject: "Physics",
    topic: "Electricity",
    difficulty: "Medium",
    marks: 8,
  },
  {
    question: "Explain the concept of dark matter.",
    subject: "Physics",
    topic: "Thermodynamics",
    difficulty: "Hard",
    marks: 10,
  },
  {
    question: "Define the laws of planetary motion.",
    subject: "Physics",
    topic: "Mechanics",
    difficulty: "Hard",
    marks: 10,
  },
  {
    question: "What is Hooke's Law?",
    subject: "Physics",
    topic: "Mechanics",
    difficulty: "Easy",
    marks: 5,
  },
  {
    question: "How does a transistor work?",
    subject: "Physics",
    topic: "Electricity",
    difficulty: "Hard",
    marks: 10,
  },
  {
    question: "Explain the laws of thermodynamics.",
    subject: "Physics",
    topic: "Thermodynamics",
    difficulty: "Medium",
    marks: 8,
  },
  {
    question: "What is the formula for work done?",
    subject: "Physics",
    topic: "Mechanics",
    difficulty: "Easy",
    marks: 5,
  },
  {
    question: "What is the conservation of energy?",
    subject: "Physics",
    topic: "Waves",
    difficulty: "Easy",
    marks: 5,
  },
  {
    question: "Define the concept of magnetic field.",
    subject: "Physics",
    topic: "Electricity",
    difficulty: "Easy",
    marks: 5,
  },
  {
    question: "Explain the concept of electromagnetic induction.",
    subject: "Physics",
    topic: "Waves",
    difficulty: "Medium",
    marks: 8,
  },
  {
    question: "What is the Heisenberg Uncertainty Principle?",
    subject: "Physics",
    topic: "Optics",
    difficulty: "Hard",
    marks: 10,
  },
  {
    question: "How does a nuclear reactor work?",
    subject: "Physics",
    topic: "Thermodynamics",
    difficulty: "Medium",
    marks: 8,
  },
  {
    question: "Define the laws of reflection.",
    subject: "Physics",
    topic: "Optics",
    difficulty: "Easy",
    marks: 5,
  },
  {
    question: "Explain the Doppler effect.",
    subject: "Physics",
    topic: "Waves",
    difficulty: "Hard",
    marks: 10,
  },
  {
    question: "Define the laws of electromagnetic waves.",
    subject: "Physics",
    topic: "Waves",
    difficulty: "Easy",
    marks: 5,
  },
  {
    question: "What is the formula for angular momentum?",
    subject: "Physics",
    topic: "Mechanics",
    difficulty: "Medium",
    marks: 8,
  },
  {
    question: "Define the concept of capacitance.",
    subject: "Physics",
    topic: "Electricity",
    difficulty: "Hard",
    marks: 10,
  },
  {
    question: "How does a cathode-ray tube work?",
    subject: "Physics",
    topic: "Optics",
    difficulty: "Hard",
    marks: 10,
  },
];

// Helper function for weighted random selection
function weightedRandom(probabilities) {
  const total = probabilities.reduce((acc, val) => acc + val, 0);
  const randomValue = Math.random() * total;
  let cumulativeProbability = 0;

  for (let i = 0; i < probabilities.length; i++) {
    cumulativeProbability += probabilities[i];
    if (randomValue < cumulativeProbability) {
      return i;
    }
  }

  return probabilities.length - 1;
}

// Select a topic based on specified distribution
function selectTopic(topicDistribution) {
  const topics = Object.keys(topicDistribution);
  const topicProbabilities = topics.map((topic) => topicDistribution[topic]);
  const selectedTopicIndex = weightedRandom(topicProbabilities);
  return topics[selectedTopicIndex];
}

// Helper function to get a random question based on difficulty and topic
function getRandomQuestion(difficulty, topic) {
  const availableQuestions = questionStore.filter(
    (question) => question.difficulty === difficulty && question.topic === topic
  );
  if (availableQuestions.length === 0) {
    return null;
  }

  const randomIndex = Math.floor(Math.random() * availableQuestions.length);
  return availableQuestions[randomIndex];
}

// Generate questions based on difficulty and marks distribution
function generateQuestionsByDifficulty(difficulty, marks, topicDistribution) {
  const questionPaper = [];
  let currentMarks = 0;

  while (currentMarks < marks) {
    // Randomly select a topic based on specified distribution
    const topic = selectTopic(topicDistribution);
    const randomQuestion = getRandomQuestion(difficulty, topic);

    if (randomQuestion) {
      questionPaper.push(randomQuestion);
      currentMarks += randomQuestion.marks;
    } else {
      // No more questions of the specified difficulty and topic, break the loop
      break;
    }
  }

  return questionPaper;
}

// Function to generate a question paper
function generateQuestionPaper(
  totalMarks,
  difficultyDistribution,
  topicDistribution
) {
  const questionPaper = [];

  // Generate question paper based on difficulty, marks distribution, and topic distribution
  for (const difficulty of Object.keys(difficultyDistribution)) {
    const marks = Math.floor(totalMarks * difficultyDistribution[difficulty]);
    const generatedQuestions = generateQuestionsByDifficulty(
      difficulty,
      marks,
      topicDistribution
    );
    questionPaper.push(...generatedQuestions);
  }

  return questionPaper;
}

// Initial empty question paper
let generatedQuestionPaper = [];

// Get all unique topics
const allTopics = questionStore.reduce((topics, question) => {
  if (!topics.includes(question.topic)) {
    topics.push(question.topic);
  }
  return topics;
}, []);

app.get("/", (req, res) => {
  const allTopics = questionStore.reduce((topics, question) => {
    if (!topics.includes(question.topic)) {
      topics.push(question.topic);
    }
    return topics;
  }, []);
  
  const isReloadWithoutInput =
    !req.query.totalMarks &&
    !req.query.easyPercentage &&
    !req.query.mediumPercentage &&
    !req.query.hardPercentage &&
    allTopics.every((topic) => !req.query[`${topic.toLowerCase()}Percentage`]);
  if (isReloadWithoutInput) {
    res.locals.alertMessage = "Please input values and generate questions.";
  }
  res.render("index", { questionStore, generatedQuestionPaper, allTopics });
});

app.post("/generate", (req, res) => {
  if (req.body.totalMarks) {
    const totalMarks = parseInt(req.body.totalMarks);
    const easyPercentage = parseInt(req.body.easyPercentage);
    const mediumPercentage = parseInt(req.body.mediumPercentage);
    const hardPercentage = parseInt(req.body.hardPercentage);

    const difficultyDistribution = {
      Easy: easyPercentage / 100,
      Medium: mediumPercentage / 100,
      Hard: hardPercentage / 100,
    };

    const topicDistribution = {};
    allTopics.forEach((topic) => {
      const percentage = parseInt(req.body[`${topic.toLowerCase()}Percentage`]);
      topicDistribution[topic] = percentage / 100;
    });

    // Regenerate the question paper
    generatedQuestionPaper = generateQuestionPaper(
      totalMarks,
      difficultyDistribution,
      topicDistribution
    );
  }

  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
