const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Question Store to store questions
const questionStore = [
  { question: "What is the speed of light", subject: "Physics", topic: "Waves", difficulty: "Easy", marks: 5 },
  { question: "How does a lens work", subject: "Physics", topic: "Optics", difficulty: "Medium", marks: 8 },
  { question: "Explain the laws of thermodynamics", subject: "Physics", topic: "Thermodynamics", difficulty: "Hard", marks: 10 },
  { question: "Define Newton's laws of motion", subject: "Physics", topic: "Mechanics", difficulty: "Medium", marks: 8 },
  { question: "Define the concept of entropy", subject: "Physics", topic: "Thermodynamics", difficulty: "Medium", marks: 8 },
  { question: "What is Boyle's law?", subject: "Physics", topic: "Gas Laws", difficulty: "Hard", marks: 10 },
  { question: "How does a rainbow form?", subject: "Physics", topic: "Optics", difficulty: "Easy", marks: 5 },
  { question: "Define the concept of momentum", subject: "Physics", topic: "Mechanics", difficulty: "Medium", marks: 8 },
  { question: "Explain the Doppler effect", subject: "Physics", topic: "Waves", difficulty: "Hard", marks: 10 },
  { question: "What is Hooke's Law?", subject: "Physics", topic: "Mechanics", difficulty: "Easy", marks: 5 },
  { question: "Explain the photoelectric effect", subject: "Physics", topic: "Modern Physics", difficulty: "Medium", marks: 8 },
  { question: "What is the formula for work done?", subject: "Physics", topic: "Mechanics", difficulty: "Easy", marks: 5 },
  { question: "What is the Heisenberg Uncertainty Principle?", subject: "Physics", topic: "Quantum Mechanics", difficulty: "Hard", marks: 10 },
  { question: "What is Archimedes' principle?", subject: "Physics", topic: "Fluid Mechanics", difficulty: "Medium", marks: 8 },
  { question: "Explain the concept of electric current", subject: "Physics", topic: "Electricity", difficulty: "Easy", marks: 5 },
  { question: "Define the laws of reflection", subject: "Physics", topic: "Optics", difficulty: "Easy", marks: 5 },
  { question: "Explain the concept of centripetal force", subject: "Physics", topic: "Mechanics", difficulty: "Medium", marks: 8 },
  { question: "What is the formula for torque?", subject: "Physics", topic: "Rotational Motion", difficulty: "Medium", marks: 8 },
  { question: "Define the concept of capacitance", subject: "Physics", topic: "Electricity", difficulty: "Hard", marks: 10 },
  { question: "How does a transistor work?", subject: "Physics", topic: "Electronics", difficulty: "Hard", marks: 10 },
  { question: "What is the formula for power?", subject: "Physics", topic: "Energy", difficulty: "Medium", marks: 8 },
  { question: "Explain the concept of electromagnetic induction", subject: "Physics", topic: "Electromagnetism", difficulty: "Hard", marks: 10 },
  { question: "Define the concept of wave-particle duality", subject: "Physics", topic: "Quantum Mechanics", difficulty: "Hard", marks: 10 },
  { question: "What is the principle behind a refrigerator?", subject: "Physics", topic: "Thermodynamics", difficulty: "Medium", marks: 8 },
  { question: "Explain the concept of simple harmonic motion", subject: "Physics", topic: "Mechanics", difficulty: "Medium", marks: 8 },
  { question: "Define the laws of electromagnetic waves", subject: "Physics", topic: "Electromagnetism", difficulty: "Easy", marks: 5 },
  { question: "How does a cathode-ray tube work?", subject: "Physics", topic: "Modern Physics", difficulty: "Hard", marks: 10 },
  { question: "What is the formula for angular momentum?", subject: "Physics", topic: "Rotational Motion", difficulty: "Medium", marks: 8 },
  { question: "Define the concept of magnetic field", subject: "Physics", topic: "Electromagnetism", difficulty: "Easy", marks: 5 },
  { question: "Explain the concept of quantum entanglement", subject: "Physics", topic: "Quantum Mechanics", difficulty: "Hard", marks: 10 },
  { question: "What is the conservation of energy?", subject: "Physics", topic: "Energy", difficulty: "Easy", marks: 5 },
  { question: "Define the laws of radioactivity", subject: "Physics", topic: "Nuclear Physics", difficulty: "Medium", marks: 8 },
  { question: "How does a transformer work?", subject: "Physics", topic: "Electromagnetism", difficulty: "Medium", marks: 8 },
  { question: "Explain the concept of interference in waves", subject: "Physics", topic: "Waves", difficulty: "Medium", marks: 8 },
  { question: "What is the formula for electric potential energy?", subject: "Physics", topic: "Electricity", difficulty: "Easy", marks: 5 },
  { question: "Define the laws of planetary motion", subject: "Physics", topic: "Astrophysics", difficulty: "Hard", marks: 10 },
  { question: "How does a nuclear reactor work?", subject: "Physics", topic: "Nuclear Physics", difficulty: "Medium", marks: 8 },
  { question: "Explain the concept of dark matter", subject: "Physics", topic: "Cosmology", difficulty: "Hard", marks: 10 },
  { question: "What is the formula for Coulomb's law?", subject: "Physics", topic: "Electrostatics", difficulty: "Easy", marks: 5 },
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
  const topicProbabilities = topics.map(topic => topicDistribution[topic]);
  const selectedTopicIndex = weightedRandom(topicProbabilities);
  return topics[selectedTopicIndex];
}

// Helper function to get a random question based on difficulty and topic
function getRandomQuestion(difficulty, topic) {
  const availableQuestions = questionStore.filter(
    question => question.difficulty === difficulty && question.topic === topic
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
function generateQuestionPaper(totalMarks, difficultyDistribution, topicDistribution) {
  const questionPaper = [];

  // Generate question paper based on difficulty, marks distribution, and topic distribution
  for (const difficulty of Object.keys(difficultyDistribution)) {
    const marks = Math.floor(totalMarks * difficultyDistribution[difficulty]);
    const generatedQuestions = generateQuestionsByDifficulty(difficulty, marks, topicDistribution);
    questionPaper.push(...generatedQuestions);
  }

  return questionPaper;
}

// Initial empty question paper
let generatedQuestionPaper = [];

app.get('/', (req, res) => {
  res.render('index', { questionStore, generatedQuestionPaper });
});

app.post('/generate', (req, res) => {
  const totalMarks = parseInt(req.body.totalMarks);
  const easyPercentage = parseInt(req.body.easyPercentage);
  const mediumPercentage = parseInt(req.body.mediumPercentage);
  const hardPercentage = parseInt(req.body.hardPercentage);

  const wavesPercentage = parseInt(req.body.wavesPercentage);
  const opticsPercentage = parseInt(req.body.opticsPercentage);
  const thermodynamicsPercentage = parseInt(req.body.thermodynamicsPercentage);
  const mechanicsPercentage = parseInt(req.body.mechanicsPercentage);

  const difficultyDistribution = {
    Easy: easyPercentage / 100,
    Medium: mediumPercentage / 100,
    Hard: hardPercentage / 100,
  };

  const topicDistribution = {
    Waves: wavesPercentage / 100,
    Optics: opticsPercentage / 100,
    Thermodynamics: thermodynamicsPercentage / 100,
    Mechanics: mechanicsPercentage / 100,
  };

  // Regenerate the question paper
  generatedQuestionPaper = generateQuestionPaper(totalMarks, difficultyDistribution, topicDistribution);
  res.render('index', { questionStore, generatedQuestionPaper });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});