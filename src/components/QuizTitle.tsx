interface QuizTitleProps {
  title: string
  icon: string
  iconSize?: number
  hideMarginBottom?: boolean
}

export default function QuizTitle ({ title, icon, iconSize = 24, hideMarginBottom } : QuizTitleProps) {
  return (
    <h1 
      className={
        `
         flex items-center justify-center gap-3 font-bold text-black text-2xl leading-tight text-center
         ${!hideMarginBottom ? 'mb-14' : ''}
        `
      }
    >
       <img
          src={require(`../assets/svg/${icon}`)}
          alt={title}
          width={iconSize}
          height={iconSize}
       />

       <span className="capitalize">{ title }</span>
    </h1>
  )
}