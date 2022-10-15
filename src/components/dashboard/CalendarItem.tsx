import {FC, useEffect} from 'react'
import Calendar, {EventObject} from '@toast-ui/calendar'
import useEvent from 'src/hooks/useEvent'
import {Event} from '../states/eventState'
import {Empty} from '../empty/Empty'

const options: any = {
  defaultView: 'month',
  timezone: {
    zones: [
      {
        timezoneName: 'Asia/Seoul',
        displayLabel: 'Seoul',
      },
    ],
  },
  calendars: [
    {
      id: 'cal0',
      name: 'Event',
      backgroundColor: '#1abaa0',
    },
    {
      id: 'cal1',
      name: 'Event',
      backgroundColor: '#efb865',
    },
    {
      id: 'cal2',
      name: 'Event',
      backgroundColor: '#f28baf',
    },
    {
      id: 'cal3',
      name: 'Event',
      backgroundColor: '#bb6cf0',
    },
  ],
  month: {
    visibleWeeksCount: 2,
  },
}

interface Props {
  className?: string
}

const CalendarItem: FC<Props> = ({className}) => {
  const {isLoading, eventList} = useEvent()

  useEffect(() => {
    const events: EventObject = eventList?.map((event: Event, index) => ({
      id: event.id,
      calendarId: `cal${index % 4}`,
      title: event.title,
      start: event.start_dt,
      end: event.end_dt,
    }))

    const calendar = new Calendar('#calander', options)
    calendar.setTheme({
      common: {
        gridSelection: {
          backgroundColor: 'rgba(81, 230, 92, 0.05)',
          border: '1px dotted #515ce6',
        },
      },
    })

    calendar.setOptions({
      template: {
        popupDetailDate({start, end}) {
          return `${start.toString()} - ${end.toString()}`
        },
      },
      isReadOnly: true,
    })

    calendar.createEvents(events)
  }, [eventList])

  return (
    <div className={`card d-xxl-flex d-none ${className}`}>
      {isLoading ? (
        <div className='card-body'>
          <Empty>Loading...</Empty>
        </div>
      ) : (
        <div id='calander' className=' card-body' />
      )}
    </div>
  )
}

export {CalendarItem}
