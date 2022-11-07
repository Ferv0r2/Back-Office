import {FC, useState, useEffect} from 'react'
import {KTSVG} from 'src/utils'

/* Components */
import {EventBasket} from 'src/components/card/EventBasket'
import {EventMenu} from 'src/components/card/EventMenu'
import {Example} from 'src/components/item/Example'
import {TutorialToast} from 'src/components/toast/TutorialToast'
import {InfoToast} from 'src/components/toast/InfoToast'

/* State */
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil'
import {
  currentNFTIndexState,
  eventContentState,
  eventTitleState,
  inputState,
  resultState,
} from 'src/components/states/eventState'
import {collectionState} from 'src/components/states/nftState'
import {Empty} from 'src/components/empty/Empty'

const EventCreatePage: FC = () => {
  const collections = useRecoilValue(collectionState)
  const setResult = useSetRecoilState(resultState)
  const setIsInput = useSetRecoilState(inputState)
  const setEventTitle = useSetRecoilState(eventTitleState)
  const setEventContent = useSetRecoilState(eventContentState)
  const [currentNFTIndex, setCurrentNFTIndex] = useRecoilState(currentNFTIndexState)
  const [isReady, setIsReady] = useState(false)
  const [isContinue, setIsContinue] = useState(false)
  const [isAnimate, setIsAnimate] = useState(false)
  const [isTutorial, setIsTutorial] = useState(false)
  const [tutorialIndex, setTutorialIndex] = useState(0)

  useEffect(() => {
    localStorage.getItem('Tutorial') || window.innerWidth < 1440
      ? setIsTutorial(false)
      : setIsTutorial(true)
  }, [])

  useEffect(() => {
    if (collections.length > 0) {
      setIsReady(true)
    } else {
      setIsReady(false)
    }
  }, [collections, setIsReady])

  const continueHandler = () => {
    setTutorialIndex(0)
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
    setIsInput(new Map())
    setEventTitle('')
    setEventContent('')
  }

  const tutorialSkipHandler = () => {
    localStorage.setItem('Tutorial', 'Done')
    setIsTutorial(false)
    setTutorialIndex(0)
  }

  return (
    <>
      {isTutorial && (
        <>
          <div className='modal-backdrop bg-dark bg-opacity-50' />
          {tutorialIndex === 0 && (
            <TutorialToast onCancel={tutorialSkipHandler} onTutorial={() => setTutorialIndex(1)} />
          )}
        </>
      )}
      <div className='row g-8 justify-lg-content-center'>
        {!isContinue && (
          <>
            <div
              className={`position-relative col-lg-4 col-11 mx-lg-0 mx-auto ${
                isAnimate && window.innerWidth >= 992 && 'animate__animated animate__fadeOutLeft'
              } ${isAnimate && window.innerWidth < 992 && 'animate__animated animate__fadeOutUp'}`}
            >
              {/* begin::Tutorial Info */}
              {isTutorial && tutorialIndex === 1 && (
                <InfoToast
                  index={1}
                  title='Select your NFT'
                  position='bottom-50'
                  onPrev={() => setTutorialIndex(0)}
                  onNext={() => setTutorialIndex(2)}
                />
              )}
              {isTutorial && tutorialIndex === 2 && (
                <InfoToast
                  index={2}
                  title='Select the item items of the event participation conditions'
                  position='top-0'
                  onPrev={() => setTutorialIndex(1)}
                  onNext={() => setTutorialIndex(3)}
                />
              )}
              {isTutorial && tutorialIndex === 3 && (
                <InfoToast
                  index={3}
                  title='Select item & Press the "Continue" button and Let`s create an event'
                  position='top-0'
                  onPrev={() => setTutorialIndex(2)}
                  onDone={tutorialSkipHandler}
                />
              )}
              {/* end::Tutorial Info */}

              {/* begin::Select NFT */}
              <div
                className='card pb-2 mb-5'
                style={{
                  zIndex: tutorialIndex === 1 ? 1100 : 'initial',
                }}
              >
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
                          {nft.name} ({nft.contract.replace(nft.contract.substring(6, 36), '...')})
                        </option>
                      ))}
                    </select>
                  ) : (
                    <Empty>Please register NFT first.</Empty>
                  )}
                </div>
              </div>
              {/* end::Select NFT */}
              <EventMenu
                style={{
                  zIndex: tutorialIndex === 2 ? 1100 : 'initial',
                }}
              />
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
          style={{
            zIndex: tutorialIndex === 3 ? 1100 : 'initial',
          }}
        >
          <EventBasket
            nft={collections[Number(currentNFTIndex)]}
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
