import QuizTitle from './QuizTitle';
import { Gender } from '../types/quiz';
import { useQuizStore } from '../store/quiz';


// TO DO: Gender type
interface QuizSelectGenderProps {
  onGenderSelect: (gender: Gender) => void
}

export default function QuizSelectGender ({ onGenderSelect } : QuizSelectGenderProps ) {
  const { steps } = useQuizStore();

  return (
    <div className="flex flex-col flex-1">
      <QuizTitle
        title={steps.genderStep.title}
        icon={steps.genderStep.logo}
        hideMarginBottom={true}
      />

      <div className="flex flex-1 flex-col items-center justify-around">
        <p className="mb-12 text-2xl text-center">{ steps.genderStep.text }</p>
        <div className="flex gap-6">
          {
            steps.genderStep.options.map(genderOption =>
              <div className="flex flex-col gap-4" key={genderOption.id}>
                <button
                  style={{ '--gender-button-bg': genderOption.color} as React.CSSProperties}
                  className="bg-[var(--gender-button-bg)] w-28 h-28 rounded-full flex items-center justify-center p-4"
                  onClick={() => onGenderSelect(genderOption.id)}
                >
                    <img
                      className=""
                      src={require(`../assets/images/${genderOption.image}`)}
                      alt={genderOption.label}
                      width={72}
                      height={72}
                    />
                </button>

                <span className="text-sm leading-tight font-semibold text-center">{ genderOption.label }</span>
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}