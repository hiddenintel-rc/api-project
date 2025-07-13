import React, { useEffect, useState } from 'react';

function decodeHtml(html) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

function shuffleArray(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function TriviaSection() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const fetchQuestions = async () => {
    try {
      const response = await fetch(
        'https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple'
      );
      const data = await response.json();
      const prepared = data.results.map((q) => ({
        question: decodeHtml(q.question),
        correct: decodeHtml(q.correct_answer),
        choices: shuffleArray([
          ...q.incorrect_answers.map(decodeHtml),
          decodeHtml(q.correct_answer),
        ]),
      }));
      setQuestions(prepared);
      setCurrentIndex(0);
      setSelectedAnswer('');
      setShowResult(false);
      setScore(0);
      setQuizComplete(false);
    } catch (err) {
      console.error('Error fetching trivia:', err);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const current = questions[currentIndex];

  const handleSelect = (choice) => {
    if (showResult) return;
    setSelectedAnswer(choice);
    setShowResult(true);
    if (choice === current.correct) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex === questions.length - 1) {
      setQuizComplete(true);
    } else {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer('');
      setShowResult(false);
    }
  };

  const handleRestart = () => {
    fetchQuestions(); // resets all state internally
  };

  if (!current && !quizComplete) {
    return (
      <section className="w-full py-12 px-6 bg-purple-100 border-b border-gray-300">
        <h2 className="text-2xl font-bold">Trivia Quiz</h2>
        <p className="mt-4">Loading questions...</p>
      </section>
    );
  }

  return (
    <section className="w-full py-12 px-6 bg-purple-100 border-b border-gray-300">
      <div className="flex justify-between items-center max-w-2xl mx-auto mb-4">
        <h2 className="text-2xl font-bold">Trivia Quiz</h2>
        <span className="text-sm text-gray-700">Score: {score}/{questions.length}</span>
      </div>

      {!quizComplete && current && (
        <div className="p-4 bg-white rounded shadow max-w-2xl mx-auto">
          <p className="font-semibold mb-4">{current.question}</p>

          <ul className="space-y-2">
            {current.choices.map((choice) => {
              let bgClass = 'bg-gray-100 hover:bg-gray-200';
              if (showResult) {
                if (choice === current.correct) bgClass = 'bg-green-200';
                else if (choice === selectedAnswer) bgClass = 'bg-red-200';
              }

              return (
                <li key={choice}>
                  <button
                    onClick={() => handleSelect(choice)}
                    disabled={showResult}
                    className={`w-full text-left px-4 py-2 rounded ${bgClass}`}
                  >
                    {choice}
                  </button>
                </li>
              );
            })}
          </ul>

          {showResult && (
            <div className="mt-4 flex flex-col items-start gap-3">
              <p className="text-sm">
                {selectedAnswer === current.correct
                  ? '✅ Correct!'
                  : `❌ Correct answer: ${current.correct}`}
              </p>
              <button
                onClick={handleNext}
                className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
              >
                {currentIndex === questions.length - 1 ? 'Finish' : 'Next'}
              </button>
            </div>
          )}
        </div>
      )}

      {quizComplete && (
        <div className="p-6 bg-white rounded shadow max-w-2xl mx-auto text-center">
          <h3 className="text-xl font-semibold mb-2">🎉 Quiz Complete!</h3>
          <p className="mb-4">Your score: {score} out of {questions.length}</p>
          <button
            onClick={handleRestart}
            className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700"
          >
            Restart Quiz
          </button>
        </div>
      )}
    </section>
  );
}

export default TriviaSection;
