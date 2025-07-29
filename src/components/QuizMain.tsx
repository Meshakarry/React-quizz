import { useQuizStore } from '../store/quiz';
import QuizCardsList from './QuizCardsList';
import QuizOverview from './QuizOverview';

export default function QuizMain () {
  const { quizFinished } = useQuizStore();

  return (
    <div>
      { !quizFinished ? (
          <QuizCardsList />
        ) : (
          <QuizOverview /> //last step
        )
      }
    </div>
  )
}