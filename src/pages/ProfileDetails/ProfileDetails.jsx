import { useEffect, useState } from 'react' 
import { useLocation } from 'react-router-dom'
import BoozyTuneCard from '../../components/BoozyTuneCard/BoozyTuneCard'
import * as boozyTuneService from '../../services/boozyTuneService'
import styles from './ProfileDetails.module.css'

const ProfileDetails = ({user}) => {
  const location = useLocation()
  const [profile, setProfile] = useState(location.state.profile)
  const [boozyTunes, setBoozyTunes] = useState([])

  useEffect(() => {
    const fetchAllBoozyTunes = async () => {
      const boozyData = await boozyTuneService.getAllBoozyTunes(profile._id)
      setBoozyTunes(boozyData)
    }
    fetchAllBoozyTunes()
  }, [profile._id])

  return (
    <>
      <div className={styles.profilePhoto}>
        <img src={profile.photo}
          alt={profile.name}
          style={{width:"300px"}}
        />
      </div>
      <h1>{profile.name}</h1> 
      <p className={styles.favorites}>
        {profile.favoriteSong
          ? `Favorite Song: ${profile.favoriteSong?.name} by ${profile.favoriteSong?.artist}`
          : `${profile.name} did not add favorite song`  
        }
      </p>
      <p className={styles.favorites}>
        {profile.favoriteDrink
          ? `Favorite Drink: ${profile.favoriteDrink?.name} ${profile.favoriteDrink?.category}`
          : `${profile.name} did not add favorite drink`    
        }
      </p>
      <h2>{profile.name}'s Boozy Tunes</h2>
      <div className={styles.boozyContainer}>
        {boozyTunes?.map((boozyTune, idx) =>
          <BoozyTuneCard boozyTune={boozyTune} key={idx} profile={profile} user={user}/>
        )}
      </div>
    </>
  )
}

export default ProfileDetails