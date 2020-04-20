// This component is just the parent component to the ProfileForm component, wrapped in a Container to make it resizable
import React, { useEffect, useState } from 'react';
import  ProfileForm from './ProfileForm';
import { Container } from 'semantic-ui-react';


function CreatePage(props) {

  //Whoever wrote this please fix it so that photographers doesn't give us an error about not being used. - Keith
  const [photographers, setPhotographers] = useState([]);

  useEffect(() => {
    fetch("/api/browse").then(response => 
      response.json().then(data => {
        setPhotographers(data.photographers);
      })
    );
  }, []);
  
  return (
    <div className="ProfilePage">
      <Container style={{marginTop: 40}}>
        <p className="CreateProfileText">My Profile</p>
        <ProfileForm netid = {props.netid} onNewProfile={photographer => 
          setPhotographers(currentPhotographers => [...currentPhotographers, photographer])
          }/>
      </Container>
    </div>
  );
}

export default CreatePage;