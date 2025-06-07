import React from 'react';
import { QuizQuestion } from '../../types';
import { QUIZ_TYPE } from '../../common/const';
import MultiChoice from '../ui/MultiChoice';
import ListenRepeat from '../ui/ListenRepeat';
import FillBlank from '../ui/FillBlank';

interface QuizCardProps {
  question: QuizQuestion;
  onAnswer: (isCorrect: boolean) => void;
  onNext: () => void;
}

const QuizCard: React.FC<QuizCardProps> = ({ question, onAnswer, onNext }) => {
  const renderQuestion = () => {
    switch (question.type) {
      case QUIZ_TYPE.FillBlank_Word:
        return <FillBlank 
          type={question.type}
          word={question.word}
          onAnswer={onAnswer}
          onNext={onNext}
        /> 
      
      case QUIZ_TYPE.FillBlank_Listen:
        return <FillBlank 
          type={question.type}
          word={question.word}
          onAnswer={onAnswer}
          onNext={onNext}
        />
      
      case QUIZ_TYPE.ListenRepeat:
        return <ListenRepeat
          type={question.type}
          word={question.word}
          onAnswer={onAnswer}
          onNext={onNext}
        />
      case QUIZ_TYPE.MultiChoice_Mean:
        return <MultiChoice 
          type={question.type}
          word={question.word}
          onAnswer={onAnswer}
          onNext={onNext}
        />
      case QUIZ_TYPE.MultiChoice_Listen:
        return <MultiChoice 
          type={question.type}
          word={question.word}
          onAnswer={onAnswer}
          onNext={onNext}
        />

      case QUIZ_TYPE.MultiChoice_Hanzi:
        return <MultiChoice 
          type={question.type}
          word={question.word}
          onAnswer={onAnswer}
          onNext={onNext}
        />

      case QUIZ_TYPE.MultiChoice_FillBlank:
        return <MultiChoice 
          type={question.type}
          word={question.word}
          onAnswer={onAnswer}
          onNext={onNext}
        />
      
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      {renderQuestion()}
    </div>
  );
};

export default QuizCard;