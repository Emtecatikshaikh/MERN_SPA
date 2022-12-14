import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import { useHttpClient } from '../../shared/hooks/http-hook'
import PlaceList from '../components/PlaceList'

// const DUMMY_PLACES = [
//     {
//         id: 'p1',
//         title: 'Empire State Building',
//         description: 'One of the most famous skyscrapers in the world',
//         imageUrl: 'https://newyorkyimby.com/wp-content/uploads/2020/09/DSCN0762.jpg',
//         address: '20 W 34th St., New York, NY 10001, United States',
//         location: {
//             lat: 40.7484405 ,
//             lng: -73.9856644
//         },
//         creator: 'u1'
//     },
//     {
//         id: 'p2',
//         title: 'Emp. State Building',
//         description: 'One of the most famous skyscrapers in the world',
//         imageUrl: 'https://newyorkyimby.com/wp-content/uploads/2020/09/DSCN0762.jpg',
//         address: '20 W 34th St., New York, NY 10001, United States',
//         location: {
//             lat: 40.7484405 ,
//             lng: -73.9856644
//         },
//         creator: 'u2'
//     }
// ]



const UserPlaces = () => {
    const [loadedPlaces,setLoadedPlaces] = useState()    
    const { isLoading, error, sendRequest, clearError } = useHttpClient()

    const userId = useParams().userId 
    useEffect(() => {
        const fetchPlaces = async () => {
            try{
                const responseData = await sendRequest(
                    process.env.REACT_APP_BACKEND_URL +`/places/user/${userId}`
                )
                setLoadedPlaces(responseData.places)

            }catch(err){}
            
        }
        fetchPlaces()
    },[sendRequest, userId])


    // const loadedPlaces = DUMMY_PLACES.filter(place => place.creator === userId)

    const placeDeletedHandler = (deletedPlaceId) => {
        setLoadedPlaces(
            prevPlaces => prevPlaces.filter(place => place.id !== deletedPlaceId)
            )
    }

  return (
    <React.Fragment>
        <ErrorModal error={error} onClear={clearError} />
        { 
        isLoading && (
            <div className="center">
                <LoadingSpinner />
            </div>
        )}

        { !isLoading && loadedPlaces && <PlaceList items={loadedPlaces} onDeletePlace={placeDeletedHandler} />}
    </React.Fragment>
  )
}

export default UserPlaces