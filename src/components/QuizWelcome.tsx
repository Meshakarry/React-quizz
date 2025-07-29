import QuizButton from './QuizButton';
import { useQuizStore } from '../store/quiz';

export default function QuizWelcome () {
  const { incrementStep } = useQuizStore();

  function startQuiz () {
    incrementStep()
  }

  return (
    <div>
      <h1 className="font-ubuntu font-normal text-2xl leading-tight text-center mb-16">Lorem<strong>Ipsum</strong></h1>
      <div className="max-w-[50ch] mx-auto text-base leading-normal lg:max-w-full">
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
          when an unknown printer took a galley of type and scrambled it to make a type specimen book.
          It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
        </p>
        <p className="mt-8">
          It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
          and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </p>
      </div>
        {/* TO DO: move it to App.tsx and implement remaining logic there, instead of calling */}
      <QuizButton text='Start quiz' nextStep={startQuiz} />
    </div>
  )
}