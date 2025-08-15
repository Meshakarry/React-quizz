interface QuizCardAvatarProps {
  avatar: {
    dir: string,
    filename: string
  }
  agentName: string
}

export default function QuizCardAvatar({ avatar, agentName }: QuizCardAvatarProps) {
  return (
    <div className="flex gap-2 items-center">
      <img
        className="rounded-full h-5 w-5"
        src={`/images/${avatar.dir}/${avatar.filename}`}
        alt={agentName}
      />
      <span className="text-xs">{agentName}</span>
    </div>
  )
}