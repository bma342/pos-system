import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { updateUserProfile, selectCurrentUser } from '../redux/slices/userSlice';

const ProfilePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userProfile = useSelector(selectCurrentUser);
  const [firstName, setFirstName] = useState(userProfile?.firstName || '');
  const [lastName, setLastName] = useState(userProfile?.lastName || '');
  const [email, setEmail] = useState(userProfile?.email || '');
  const [restaurantName, setRestaurantName] = useState(userProfile?.restaurantName || '');
  const [cuisineType, setCuisineType] = useState(userProfile?.cuisineType || '');
  const [phoneNumber, setPhoneNumber] = useState(userProfile?.phoneNumber || '');
  const [address, setAddress] = useState(userProfile?.address || '');
  const [timeZone, setTimeZone] = useState(userProfile?.timeZone || '');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (userProfile) {
      setFirstName(userProfile.firstName);
      setLastName(userProfile.lastName);
      setEmail(userProfile.email);
      setRestaurantName(userProfile.restaurantName || '');
      setCuisineType(userProfile.cuisineType || '');
      setPhoneNumber(userProfile.phoneNumber || '');
      setAddress(userProfile.address || '');
      setTimeZone(userProfile.timeZone || '');
    }
  }, [userProfile]);

  const handleUpdateProfile = async () => {
    try {
      await dispatch(updateUserProfile({
        firstName,
        lastName,
        email,
        restaurantName,
        cuisineType,
        phoneNumber,
        address,
        timeZone
      })).unwrap();
      setError(null);
    } catch (err) {
      setError('Failed to update profile. Please try again.');
    }
  };

  if (!userProfile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-page">
      <h2>Restaurant Profile</h2>
      {error && <div className="error">{error}</div>}
      <div>
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="restaurantName">Restaurant Name:</label>
        <input
          type="text"
          id="restaurantName"
          value={restaurantName}
          onChange={(e) => setRestaurantName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="cuisineType">Cuisine Type:</label>
        <input
          type="text"
          id="cuisineType"
          value={cuisineType}
          onChange={(e) => setCuisineType(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="phoneNumber">Phone Number:</label>
        <input
          type="tel"
          id="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="address">Address:</label>
        <input
          type="text"
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="timeZone">Time Zone:</label>
        <input
          type="text"
          id="timeZone"
          value={timeZone}
          onChange={(e) => setTimeZone(e.target.value)}
        />
      </div>
      <button onClick={handleUpdateProfile}>Update Profile</button>
    </div>
  );
};

export default ProfilePage;
