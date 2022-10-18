import {FC, useState, useEffect} from 'react'
import {KTSVG} from 'src/utils'

/* Components */
import {EventBasket} from 'src/components/card/EventBasket'
import {EventMenu} from 'src/components/card/EventMenu'
import {Example} from 'src/components/item/Example'

/* State */
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil'
import {
  currentNFTIndexState,
  eventContentState,
  eventTitleState,
  resultState,
} from 'src/components/states/eventState'
import {collectionState} from 'src/components/states/nftState'

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
    if (window.innerWidth < 992) window.scrollTo(0, 0)
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
      <div className='row g-8 justify-lg-content-center'>
        {!isContinue && (
          <>
            <div
              className={`col-lg-4 col-11 mx-lg-0 mx-auto ${
                isAnimate && window.innerWidth >= 992 && 'animate__animated animate__fadeOutLeft'
              } ${isAnimate && window.innerWidth < 992 && 'animate__animated animate__fadeOutUp'}`}
            >
              <div className='card pb-2 mb-5'>
                <div className='card-header border-0 pt-5'>
                  <h3 className='card-title align-items-start flex-column'>
                    <span className='card-label fw-bold text-dark'>Select NFT</span>
                    <span className='text-muted mt-1 fw-semibold fs-7'>Event to apply</span>
                  </h3>
                  <KTSVG path='/media/icons/verified.svg' className='svg-icon-muted svg-icon-2hx' />
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
                    <div className='px-4 py-2'>Please register NFT first.</div>
                  )}
                </div>
              </div>
              <EventMenu />
            </div>
            <div
              className={`d-lg-block d-none col-1 mt-40 ${
                isAnimate && 'animate__animated animate__fadeOutLeft'
              }`}
            >
              <KTSVG
                path='/media/icons/arrow-right.svg'
                className='d-flex justify-content-center py-6 svg-icon-4x text-primary'
              />
              <KTSVG
                path='/media/icons/arrow-right.svg'
                className='d-flex justify-content-center py-6 svg-icon-4x text-primary'
              />
              <KTSVG
                path='/media/icons/arrow-right.svg'
                className='d-flex justify-content-center py-6 svg-icon-4x text-primary'
              />
            </div>
            <div
              className={`d-lg-none d-flex justify-content-center ${
                isAnimate && 'animate__animated animate__fadeOutLeft'
              }`}
            >
              <KTSVG
                path='/media/icons/arrow-bottom.svg'
                className='d-flex justify-content-center py-6 svg-icon-4x text-primary'
              />
              <KTSVG
                path='/media/icons/arrow-bottom.svg'
                className='d-flex justify-content-center py-6 svg-icon-4x text-primary'
              />
              <KTSVG
                path='/media/icons/arrow-bottom.svg'
                className='d-flex justify-content-center py-6 svg-icon-4x text-primary'
              />
            </div>
          </>
        )}

        <div
          className={`col-lg-5 col-11 mx-lg-0 mx-auto  ${
            isAnimate && window.innerWidth >= 992 && 'animate__animated animate__slideOutLeft'
          } ${isAnimate && window.innerWidth < 992 && 'animate__animated animate__fadeOutUp'}`}
        >
          <EventBasket
            isReady={isReady}
            isContinue={isContinue}
            isAnimate={isAnimate}
            continueHandler={continueHandler}
            backHandler={backHandler}
          />
        </div>

        {isContinue && (
          <div className='col-lg-5 col-11 mx-auto animate__animated animate__fadeIn animate__faster'>
            <Example nft={collections[currentNFTIndex]} />
          </div>
        )}
      </div>
    </>
  )
}

export default EventCreatePage
