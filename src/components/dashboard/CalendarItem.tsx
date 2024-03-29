import {FC, useEffect} from 'react'
import Calendar, {EventObject} from '@toast-ui/calendar'

/* Compontents */
import {Empty} from '../empty/Empty'

/* Hooks */
import useEvent from 'src/hooks/useEvent'
import {useThemeMode} from 'src/components/theme-mode'

/* State */
import {Event} from '../states/eventState'

interface Props {
  className?: string
}

const CalendarItem: FC<Props> = ({className}) => {
  const {isLoading, eventList} = useEvent()
  const {mode} = useThemeMode()

  useEffect(() => {
    const events: EventObject = eventList?.map((event: Event, index) => ({
      id: event.id,
      calendarId: `cal${index % 4}`,
      title: event.title,
      start: event.start_dt,
      end: event.end_dt,
    }))

    const calendar = new Calendar('#calander', {
      defaultView: 'month',
      theme: {
        common: {
          backgroundColor: `${mode === 'light' ? 'white' : '#1E1E2D'}`,
          dayName: {
            color: `${mode === 'light' ? '#1E1E2D' : 'white'}`,
          },
          saturday: {
            color: '#009ef7',
          },
        },
      },
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
          backgroundColor: `${mode === 'light' ? '#50CD89' : '#40da8a'}`,
        },
        {
          id: 'cal1',
          name: 'Event',
          backgroundColor: `${mode === 'light' ? '#ffc700' : '#f1bc00'}`,
        },
        {
          id: 'cal2',
          name: 'Event',
          backgroundColor: `${mode === 'light' ? '#009ef7' : '#0095e8'}`,
        },
        {
          id: 'cal3',
          name: 'Event',
          backgroundColor: `${mode === 'light' ? '#f1416c' : '#d9214e'}`,
        },
      ],
      month: {
        visibleWeeksCount: 2,
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

    calendar.render()
  }, [eventList, mode])

  return (
    <div className={`card d-xxl-flex d-none ${className}`}>
      {isLoading ? (
        <div className='card-body'>
          <div className='col-4'>
            <Empty>Loading...</Empty>
          </div>
        </div>
      ) : (
        <div id='calander' className='card-body' />
      )}
    </div>
  )
}

export {CalendarItem}
