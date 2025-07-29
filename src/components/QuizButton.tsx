interface QuizButtonProps {
  text: string
  disabled?: boolean
  stepper?: string // double check this name data coming in this format(1/3)
  nextStep: () => void
}

export default function QuizButton ({ text, disabled = false, stepper, nextStep }: QuizButtonProps) {
  return (
    <button
      className={
        `
          fixed left-1/2 -translate-x-1/2 container bottom-0 z-10 rounded-t-[20px] text-center w-full flex px-9 py-5 items-center font-ubuntu text-base text-white leading-normal
          bg-[var(--current-step-color,#000)]
          disabled:cursor-not-allowed disabled:bg-[linear-gradient(0deg,rgba(0,0,0,0.5),rgba(0,0,0,0.5))]
        `
      }
      disabled={disabled}
      onClick={nextStep}
    >
      <span className="flex-1">{ text }</span>
      { stepper && <span className="text-xl leading-normal">{ stepper }</span> }
    </button>
  )
}