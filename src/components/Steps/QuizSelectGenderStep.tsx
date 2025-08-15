import { Gender, GenderStep } from 'types/quiz';
import genderPicker from 'data/gender-picker.json'
//components
import QuizSelectGenderButton from 'components/GenderBased/QuizSelectGenderButton';
import QuizTitle from 'components/Common/QuizTitle';

interface QuizSelectGenderProps {
  onGenderSelect: (gender: Gender) => void
}

export default function QuizSelectGenderStep ({ onGenderSelect } : QuizSelectGenderProps ) {
  // @ts-ignore
  const genderSteps: GenderStep = genderPicker;

  return (
    <div className="flex flex-col flex-1">
      <QuizTitle
        title={genderSteps.title}
        icon={genderSteps.logo}
        hideMarginBottom={true}
      />

      <div className="flex flex-1 flex-col items-center justify-around">
        <p className="mb-12 text-2xl text-center">{ genderSteps.text }</p>
        <div className="flex gap-6">
          {
            genderSteps.options.map(genderOption =>
              <div className="flex flex-col gap-4" key={genderOption.id}>
                <QuizSelectGenderButton
                  genderOption={genderOption}
                  onGenderSelect={onGenderSelect}
                />
                <span className="text-sm leading-tight font-semibold text-center">{ genderOption.label }</span>
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}
