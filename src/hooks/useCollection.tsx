import {useEffect} from 'react'
import {useQuery} from 'react-query'
import {useRecoilState} from 'recoil'
import {NFTListAPI} from 'src/api'
import {collectionState} from 'src/components/states/nftState'

const useCollection = () => {
  const {isLoading, data, refetch} = useQuery(['NFTList'], async () => {
    const res = await NFTListAPI()
    return res
  })
  const [collections, setCollections] = useRecoilState(collectionState)

  useEffect(() => {
    setCollections(data)
  }, [data, setCollections])

  return {isLoading, collections, refetch}
}

export default useCollection
