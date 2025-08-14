import Check from './Icons/Check';

export default function QuizCardSelectedOverlay () {
  return (
    <div className="absolute rounded-[20px] inset-0 bg-black/70 flex items-center justify-center">
      <div className="absolute top-1/4 bg-[var(--current-step-color)] w-14 h-14 rounded-full p-3 flex items-center justify-center">
        <Check className="w-11 h-11 text-white" />
      </div>
    </div>
  )
}