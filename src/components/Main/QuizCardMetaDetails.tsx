interface QuizCardMetaDetailsProps {
  items: string[]
}

export default function QuizCardMetaDetails ({ items }: QuizCardMetaDetailsProps) {
  return (
    <ul className="flex gap-5 pl-3 list-disc text-[10px] pb-5 pt-2.5">
      {
        items.map(item =>
          <li key={item}>{ item }</li>
        )
      }
    </ul>
  )
}