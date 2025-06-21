import { VerticalTimelineElement } from 'react-vertical-timeline-component'

interface ResumeCardType {
  CompanyName: string
  PositionName: string
  date: string
  points: string[]
  index: number
}

export const ResumeCard: React.FC<ResumeCardType> = ({
  CompanyName,
  PositionName,
  date,
  points,
  index
}) => {
  return (
    <div data-testid='resume-card' className='mt-9'>
      <VerticalTimelineElement
        contentStyle={{
          background: '#171717',
          boxShadow: "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
          color: '#fff'
        }}
        date={date}
        iconStyle={{
          background: '#fff',
          color: '#1d1836',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1rem'
        }}

      >
        <div>
          <h3 className='text-white text-[24px] font-bold'>{PositionName}</h3>
          <p
            className='text-secondary text-[16px] font-semibold'
            style={{ margin: 0 }}
          >
            {CompanyName}
          </p>
        </div>
        <ul className='mt-5 list-disc ml-5 space-y-2'>
          {points.map((point, idx) => (
            <li
              key={`resume-point-${idx}`}
              className='text-white-100 text-[14px] pl-1 tracking-wider'
            >
              {point}
            </li>
          ))}
        </ul>
      </VerticalTimelineElement>
    </div>
  )
}
