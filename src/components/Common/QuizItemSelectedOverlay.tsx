import Check from 'components/Icons/Check';

// or if you want better ts support https://stackoverflow.com/questions/71943509/typescript-types-for-tailwind-css-classes
interface QuizItemSelectedOverlayProps {
  className?: React.HTMLProps<HTMLElement>["className"]
  icon: {
    width: number
    height: number
  }
}

export default function QuizItemSelectedOverlay ({ className, icon }: QuizItemSelectedOverlayProps) {
  return (
    <div className="absolute rounded-[20px] inset-0 bg-black/70 flex items-center justify-center">
      <div
        className={
          `
            absolute w-14 h-14 rounded-full p-3 flex items-center justify-center
            bg-[var(--current-step-color)]
            ${className ?? ''}
          `
        }
      >
        <Check
          className="text-white"
          width={icon.width}
          height={icon.height}
        />
      </div>
    </div>
  )
}
