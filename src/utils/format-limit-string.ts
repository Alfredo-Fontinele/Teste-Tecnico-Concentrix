type FormatLimitStringProps = {
  input: string
  limit: number
}

export const formatLimitString = ({ input, limit }: FormatLimitStringProps) => {
  if (!input) return

  if (input.length > limit) {
    const sliced = input.slice(0, limit)
    return `${sliced}...`
  }

  return input
}
