import { VerticalTimelineElement } from 'react-vertical-timeline-component'

interface ResumeCardType {
  CompanyName: string
  PositionName: string
  date: string
  points: string[]
}

export const ResumeCard: React.FC<ResumeCardType> = ({
  CompanyName,
  PositionName,
  date,
  points,
}) => {
  return (
    <div data-testid='resume-card' className='mt-9'>
      <VerticalTimelineElement
        contentStyle={{
          background: '#171717',
          boxShadow: ' 0px 0px 12px rgba(255, 255, 255, 0.05),  0px 0px 8px rgba(0, 0, 0, 0.18)      ',
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
