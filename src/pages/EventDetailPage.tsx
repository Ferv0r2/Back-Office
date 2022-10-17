import {FC, useEffect, useState} from 'react'
import {OverlayTrigger, Tooltip} from 'react-bootstrap'
import CopyToClipboard from 'react-copy-to-clipboard'
import {useLocation} from 'react-router-dom'
import {KTSVG} from 'src/utils'

/* Components */
import {EventUser} from 'src/components/item/EventUser'

const BASE_URL = 'https://metaoneer.club/user/event/'
const EventDetailPage: FC = () => {
  const {state}: any = useLocation()
  const [copied, setCopied] = useState(false)
  useEffect(() => {
    if (!copied) {
      return
    }

    setTimeout(() => {
      setCopied(false)
    }, 1500)
  }, [copied])

  return (
    <div className='row'>
      <div className='col-lg-5 col-10 mx-auto py-4'>
        <EventUser event={state.event} nft={state.nft} />
        <div className='card mt-8'>
          <div className='card-body w-100'>
            <div className='ms-2 mb-3 fw-bold'>Event URL</div>
            <div className='d-flex justify-content-between align-items-center bg-gray-100 rounded p-4'>
              <div className='text-truncate me-1'>{BASE_URL + state.event.id}</div>
              <OverlayTrigger
                key='copy-to-clipboard'
                placement='top'
                overlay={
                  <Tooltip id='tooltip-copy-to-clipboard'>
                    {!copied ? 'Copy URL' : 'Copied !'}
                  </Tooltip>
                }
              >
                <CopyToClipboard text={BASE_URL + state.event.id} onCopy={() => setCopied(true)}>
                  <div className='btn btn-icon btn-active-light-primary'>
                    <KTSVG
                      path={`/media/icons/clipboard-${!copied ? 'solid' : 'fill'}.svg`}
                      className='svg-icon-2x'
                    />
                  </div>
                </CopyToClipboard>
              </OverlayTrigger>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventDetailPage
