// src/App.tsx
import { useState } from "react";
import QuestionCard from "./components/QuestionCard";
import type { Question } from "./types/quiz";
import { Button, Container, Typography } from "@mui/material";

const quizData: Question[] = [
  {
    question: "Apa ibukota Indonesia?",
    options: ["Jakarta", "Bandung", "Surabaya", "Medan"],
    correctAnswer: "Jakarta",
  },
  {
    question: "2 + 2 = ?",
    options: ["3", "4", "5", "22"],
    correctAnswer: "4",
  },
  {
    question: "React dikembangkan oleh?",
    options: ["Google", "Microsoft", "Facebook", "Apple"],
    correctAnswer: "Facebook",
  },
];

function App() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<(string | null)[]>(
    Array(quizData.length).fill(null)
  );
  const [showResult, setShowResult] = useState(false);

  const handleSelect = (option: string) => {
    const updated = [...answers];
    updated[current] = option;
    setAnswers(updated);
  };

  const next = () => {
    if (current < quizData.length - 1) setCurrent(current + 1);
    else setShowResult(true);
  };

  const prev = () => {
    if (current > 0) setCurrent(current - 1);
  };

  const score = answers.reduce((acc, answer, i) => {
    return answer === quizData[i].correctAnswer ? acc + 1 : acc;
  }, 0);

  return (
    <Container className="p-4">
      <Typography variant="h4" className="text-center font-bold mb-4">
        Quiz App
      </Typography>

      {!showResult ? (
        <>
          <QuestionCard
            question={quizData[current]}
            selected={answers[current]}
            onSelect={handleSelect}
          />

          <div className="flex justify-between mt-4">
            <Button
              onClick={prev}
              variant="outlined"
              disabled={current === 0}
            >
              Sebelumnya
            </Button>
            <Button
              onClick={next}
              variant="contained"
              disabled={answers[current] === null}
            >
              {current === quizData.length - 1 ? "Selesai" : "Selanjutnya"}
            </Button>
          </div>
        </>
      ) : (
        <div className="text-center mt-10">
          <Typography variant="h5">Hasil Kamu: {score}/{quizData.length}</Typography>
          <Button
            className="mt-4"
            variant="contained"
            onClick={() => {
              setAnswers(Array(quizData.length).fill(null));
              setCurrent(0);
              setShowResult(false);
            }}
          >
            Ulangi Kuis
          </Button>
        </div>
      )}
    </Container>
  );
}

export default App;
