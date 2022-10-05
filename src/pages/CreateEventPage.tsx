import {FC, useState, useEffect} from 'react'
import {useRecoilValue} from 'recoil'
import Example from 'src/components/example/Example'
import {EventBasket} from 'src/components/list/EventBasket'
import {EventMenu} from 'src/components/list/EventMenu'
import {collectionState} from 'src/components/states/nftState'
import {KTSVG} from 'src/utils'

const CreateEventPage: FC = () => {
  const collections = useRecoilValue(collectionState)
  const [currentNFT, setCurrentNFT] = useState(collections[0].name)
  const [isReady, setIsReady] = useState(false)
  const [isContinue, setIsContinue] = useState(false)
  const [isAnimate, setIsAnimate] = useState(false)

  useEffect(() => {
    collections.length > 0 ? setIsReady(true) : setIsReady(false)
  }, [collections, setIsReady])

  const continueHandler = () => {
    setIsAnimate(true)
    setTimeout(() => {
      setIsContinue(true)
      setIsAnimate(false)
    }, 1000)
  }

  const backHandler = () => {
    setIsContinue(false)
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
                      onChange={(e) => setCurrentNFT(e.target.value)}
                      value={currentNFT}
                      className='cursor-pointer form-select'
                      aria-label='Select Option'
                    >
                      {collections.map((nft) => (
                        <option key={nft.contract} value={nft.name}>
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
            continueHandler={continueHandler}
            backHandler={backHandler}
          />
        </div>

        {isContinue && (
          <div className='col-5 mx-auto animate__animated animate__fadeIn animate__faster'>
            <Example nft={currentNFT} />
          </div>
        )}
      </div>
    </>
  )
}

export default CreateEventPage
