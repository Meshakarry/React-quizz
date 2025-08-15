import { GenderOption, Gender } from 'types/quiz'

interface QuizSelectGenderButtonProps {
  genderOption: GenderOption
  onGenderSelect: (gender: Gender) => void
}

export default function QuizSelectGenderButton ({ genderOption, onGenderSelect } :QuizSelectGenderButtonProps) {
  return (
    <button
      style={{ '--gender-button-bg': genderOption.color} as React.CSSProperties}
      className="bg-[var(--gender-button-bg)] w-28 h-28 rounded-full flex items-center justify-center p-4"
      onClick={() => onGenderSelect(genderOption.id)}
    >
        <img
          src={`/images/${genderOption.image}`}
          alt={genderOption.label}
          width={72}
          height={72}
        />
    </button>
  )
}