import Image from "next/image"

interface StatItemProps {
  src: string
  value: string
  label: string
}

const StatItem: React.FC<StatItemProps> = ({ src, value, label }) => (
  <div className="text-center">
    <Image src={src} width={100} height={100} className="2xl:w-40 2xl:h-40 w-36 m-auto" alt={label} />
    <p className="mt-3 font-bold text-xl text-white">{value}</p>
    <h3 className="text-text1 2xl:text-xl text-base sm:text-lg">{label}</h3>
  </div>
)

export default StatItem