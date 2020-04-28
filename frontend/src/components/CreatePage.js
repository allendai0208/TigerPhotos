// This component is just the parent component to the ProfileForm component, wrapped in a Container to make it resizable
import React from 'react';
import  ProfileForm from './ProfileForm';
import { Container } from 'semantic-ui-react';


function CreatePage(props) {
  
  return (
    <div className="ProfilePage">
      <div style={{marginLeft:150, marginRight:150, marginTop: 40}}>
        <p className="CreateProfileText">My Profile</p>
        <ProfileForm netid = {props.netid} />
      </div>
    </div>
  );
}

export default CreatePage;