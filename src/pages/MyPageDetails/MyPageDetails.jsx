import { useState, useEffect } from 'react' 
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import BoozyTuneCard from '../../components/BoozyTuneCard/BoozyTuneCard'
import * as boozyTuneService from '../../services/boozyTuneService'
import styles from './MyPageDetails.module.css'

const MyPageDetails = (props) => {
  const location = useLocation()
  const [profile, setProfile] = useState(location.state)
  const [boozyTunes, setBoozyTunes] = useState([])

  useEffect(() => {
    const fetchAllBoozyTunes = async () => {
      const boozyData = await boozyTuneService.getAllBoozyTunes(profile._id)
      setBoozyTunes(boozyData)
    }
    fetchAllBoozyTunes()
  }, [profile._id])

  const handleDeleteBzyTn = async (id) => {
    const deletedBzyTn = await boozyTuneService.deleteBoozyTune(id)
    setBoozyTunes(boozyTunes.filter(boozyTune => boozyTune._id !== deletedBzyTn._id))
  }

  return ( 
    profile &&
    <div>
      <div className={styles.profilePhoto}>
        <img src={profile.photo}
            alt={profile.name}
            className={styles.profilePhoto}
            style={{width:"270px", height:"270px"}}
          />
      </div>
      <h1>{profile.name}</h1>
      <div className={styles.buttonContainer}>
        <Link
          to='/edit-profile'
          state={{profile}}
        >
          <button className={styles.buttons}>
            Edit
          </button>
        </Link>
        <Link 
          to="/changePassword"
          >
          <button className={styles.buttons}>
            Change Password
          </button>
        </Link>
      </div>
      <p className={styles.favorites}>
        {profile.favoriteSong
          ? `Favorite Song: ${profile.favoriteSong?.name} by ${profile.favoriteSong?.artist}`
          : 'Add your favorite song by clicking edit!'  
        }
      </p>
      <p className={styles.favorites}>
        {profile.favoriteDrink
          ? `Favorite Drink: ${profile.favoriteDrink?.name} ${profile.favoriteDrink?.category}`
          : 'Add your favorite drink by clicking edit!'  
        }
      </p>
      <h2>My Boozy Tunes</h2>
      <div className={styles.boozyContainer}>
        {boozyTunes?.map((boozyTune, idx) =>
          <BoozyTuneCard boozyTune={boozyTune} key={idx} profile={profile} user={props.user} handleDeleteBzyTn={handleDeleteBzyTn}/>
        )}
      </div>
      
    </div>
  );
}

export default MyPageDetails;