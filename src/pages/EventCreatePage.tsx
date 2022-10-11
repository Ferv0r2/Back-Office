import {FC, useState, useEffect} from 'react'
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil'
import {Example} from 'src/components/event/Example'
import {EventBasket} from 'src/components/list/EventBasket'
import {EventMenu} from 'src/components/list/EventMenu'
import {
  currentNFTIndexState,
  eventContentState,
  eventTitleState,
  resultState,
} from 'src/components/states/eventState'
import {collectionState} from 'src/components/states/nftState'
import {KTSVG} from 'src/utils'

const EventCreatePage: FC = () => {
  const collections = useRecoilValue(collectionState)
  const setResult = useSetRecoilState(resultState)
  const setEventTitle = useSetRecoilState(eventTitleState)
  const setEventContent = useSetRecoilState(eventContentState)
  const [currentNFTIndex, setCurrentNFTIndex] = useRecoilState(currentNFTIndexState)
  const [isReady, setIsReady] = useState(false)
  const [isContinue, setIsContinue] = useState(false)
  const [isAnimate, setIsAnimate] = useState(false)

  useEffect(() => {
    if (collections.length > 0) {
      setIsReady(true)
    } else {
      setIsReady(false)
    }
  }, [collections, setIsReady])

  const continueHandler = () => {
    setIsAnimate(true)
    setTimeout(() => {
      setIsContinue(true)
      setIsAnimate(false)
    }, 900)
  }

  const backHandler = () => {
    setIsContinue(false)
    setResult([])
    setEventTitle('')
    setEventContent('')
  }

  return (
    <>
      <div className='row g-8'>
        {!isContinue && (
          <>
            <div className={`col-4 ${isAnimate && 'animate__animated animate__fadeOutLeft'}`}>
              <div className='card pb-2 mb-5'>
                <div className='card-header border-0 pt-5'>
                  <h3 className='card-title align-items-start flex-column'>
                    <span className='card-label fw-bold text-dark'>Select NFT</span>
                    <span className='text-muted mt-1 fw-semibold fs-7'>Event to apply</span>
                  </h3>
                  <KTSVG
                    path='/media/icons/duotune/general/gen026.svg'
                    className='svg-icon-muted svg-icon-2hx'
                  />
                </div>
                <div className='card-body px-6 py-4'>
                  {isReady ? (
                    <select
                      onChange={(e) => setCurrentNFTIndex(Number(e.target.value))}
                      defaultValue={collections[Number(currentNFTIndex)].name}
                      className='cursor-pointer form-select'
                      aria-label='Select Option'
                    >
                      {collections.map((nft, index) => (
                        <option key={nft.contract} value={index}>
                          {nft.name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <div className='px-4 py-2'>NFT를 먼저 등록해 주세요.</div>
                  )}
                </div>
              </div>
              <EventMenu />
            </div>
            <div className={`col-1 mt-40 ${isAnimate && 'animate__animated animate__fadeOutLeft'}`}>
              <KTSVG
                path='/media/icons/duotune/arrows/arr001.svg'
                className='d-flex justify-content-center py-6 svg-icon-4x text-primary'
              />
              <KTSVG
                path='/media/icons/duotune/arrows/arr001.svg'
                className='d-flex justify-content-center py-6 svg-icon-4x text-primary'
              />
              <KTSVG
                path='/media/icons/duotune/arrows/arr001.svg'
                className='d-flex justify-content-center py-6 svg-icon-4x text-primary'
              />
            </div>
          </>
        )}

        <div className={`col-5 ${isAnimate && 'animate__animated animate__slideOutLeft'}`}>
          <EventBasket
            isReady={isReady}
            isContinue={isContinue}
            isAnimate={isAnimate}
            continueHandler={continueHandler}
            backHandler={backHandler}
          />
        </div>

        {isContinue && (
          <div className='col-5 mx-auto animate__animated animate__fadeIn animate__faster'>
            <Example nft={collections[currentNFTIndex]} />
          </div>
        )}
      </div>
    </>
  )
}

export default EventCreatePage
