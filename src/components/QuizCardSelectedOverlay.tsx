export default function QuizCardSelectedOverlay () {
  return (
    <div className="absolute rounded-[20px] inset-0 bg-black/70 flex items-center justify-center">
      <div className="absolute top-1/4 bg-[var(--current-step-color)] w-14 h-14 rounded-full p-3 flex items-center justify-center">
        <img
          src={require('../assets/svg/check.svg').default}
          alt="Check icon"
          width={44}
          height={44}
          className="object-cover"
        />
      </div>
    </div>
  )
}