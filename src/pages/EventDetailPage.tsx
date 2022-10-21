import {FC, useEffect, useState} from 'react'
import {OverlayTrigger, Tooltip} from 'react-bootstrap'
import CopyToClipboard from 'react-copy-to-clipboard'
import {useParams} from 'react-router-dom'
import {KTSVG} from 'src/utils'

/* Components */
import {EventUser} from 'src/components/item/EventUser'
import {EventStatusAPI, UserEventDetailAPI} from 'src/api'
import {useQuery} from 'react-query'
import {Empty} from 'src/components/empty/Empty'
import {UserTable} from 'src/components/table/UserTable'

const BASE_URL = 'http://metaoneerkgf2.s3-website.ap-northeast-2.amazonaws.com/user/'
const EventDetailPage: FC = () => {
  const params = useParams()
  const {isLoading, data} = useQuery(['UserEvent'], async () => {
    const res = await UserEventDetailAPI(Number(params.eid))
    return res
  })
  const [userArray, setUserArray] = useState([])
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!isLoading) {
      const getData = async () => {
        const res = await EventStatusAPI({
          pid: data.project_id,
          eid: data.id,
        })
        const tmp = res.sort((a: any, b: any) => b.point - a.point)
        setUserArray(tmp)
      }
      getData()
    }
  }, [data, isLoading])

  useEffect(() => {
    if (!copied) {
      return
    }

    setTimeout(() => {
      setCopied(false)
    }, 1500)
  }, [copied])

  if (isLoading) return <Empty>Loading...</Empty>

  return (
    <div className='row py-4'>
      <div className='col-lg-6 col-11 mx-lg-0 mx-auto'>
        <div className='table-responsive rounded shadow bg-semiwhite min-h-400px'>
          <div className='px-8 pt-8 fs-2 fw-bold'>Event Participants</div>
          <div className='separator my-8' />
          <UserTable list={userArray} total_point={data.total_point} />
        </div>
      </div>
      <div className='col-lg-5 col-11 mx-auto'>
        <EventUser event={data} />
        <div className='card mt-8'>
          <div className='card-body w-100'>
            <div className='ms-2 mb-3 fw-bold'>Event URL</div>
            <div className='d-flex justify-content-between align-items-center bg-gray-100 rounded p-4'>
              <div className='text-truncate me-1'>{BASE_URL + data.id}</div>
              <OverlayTrigger
                key='copy-to-clipboard'
                placement='top'
                overlay={
                  <Tooltip id='tooltip-copy-to-clipboard'>
                    {!copied ? 'Copy URL' : 'Copied !'}
                  </Tooltip>
                }
              >
                <CopyToClipboard text={BASE_URL + data.id} onCopy={() => setCopied(true)}>
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
