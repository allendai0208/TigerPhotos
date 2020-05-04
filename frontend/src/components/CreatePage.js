// This component is just the parent component to the ProfileForm component, wrapped in a Container to make it resizable
import React from 'react';
import  ProfileForm from './ProfileForm';


function CreatePage(props) {
  
    return (
        <div className="ProfilePage">
            <div style={{width: "70%", margin: 'auto', borderRadius:"0%"}}>
                <p className="CreateProfileText">My Profile</p>
                <ProfileForm netid = {props.netid} />
            </div>
        </div>
    );
}

export default CreatePage;