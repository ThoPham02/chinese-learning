import { Word } from "../../types";

interface QuizProps {
  words: Word[];
  onNext: () => void;
  onPrevious: () => void;
  learnStage: boolean;
}

const Quiz: React.FC<QuizProps> = ({
    words,
    onNext,
    onPrevious,
    learnStage,
}) => {
    console.log("Quiz component rendered with words:", words, onNext, onPrevious, learnStage);

    return (
        <div className="container mx-auto px-4 py-8">

        </div>
    )
}

export default Quiz;