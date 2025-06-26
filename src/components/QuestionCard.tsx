import { Button, Card, CardContent, Typography } from "@mui/material";
import type { Question } from "../types/quiz";

type Props = {
  question: Question;
  selected: string | null;
  onSelect: (option: string) => void;
};

export default function QuestionCard({ question, selected, onSelect }: Props) {
  return (
    <Card className="my-4 shadow-lg">
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {question.question}
        </Typography>
        <div className="flex flex-col gap-2 mt-4">
          {question.options.map((option, idx) => (
            <Button
              key={idx}
              variant={selected === option ? "contained" : "outlined"}
              onClick={() => onSelect(option)}
              color={
                selected
                  ? option === question.correctAnswer
                    ? "success"
                    : option === selected
                    ? "error"
                    : "primary"
                  : "primary"
              }
            >
              {option}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
