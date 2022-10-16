import {FC, useEffect} from 'react'
import Calendar, {EventObject} from '@toast-ui/calendar'
import useEvent from 'src/hooks/useEvent'
import {Event} from '../states/eventState'
import {Empty} from '../empty/Empty'
import {useThemeMode} from '../partials'

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
          backgroundColor: '#50CD89',
        },
        {
          id: 'cal1',
          name: 'Event',
          backgroundColor: '#FFC700',
        },
        {
          id: 'cal2',
          name: 'Event',
          backgroundColor: '#009EF7',
        },
        {
          id: 'cal3',
          name: 'Event',
          backgroundColor: '#F1416C',
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
          <Empty>Loading...</Empty>
        </div>
      ) : (
        <div id='calander' className='card-body' />
      )}
    </div>
  )
}

export {CalendarItem}
