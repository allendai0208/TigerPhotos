import React, { useEffect, useState } from 'react';
import { ProfileForm } from './ProfileForm';
import { Photographers } from './Photographers'
import { Container } from 'semantic-ui-react';
import {BrowseBar} from './BrowseBar'
import Grid from '@material-ui/core/Grid'
import Profiles from './Profiles'
import Profile from './Profile'
import Typography from '@material-ui/core/Typography'

class BrowsePage extends React.Component {
  state = {
    photographers: []
  }

  fetchPhotographers = () => {
    fetch('/api/browse')
    .then(response => response.json())
    .then(result => this.setState({
      photographers: result.photographers
    }))
    .catch(e => console.log(e))
  }

  componentDidMount() {
    this.fetchPhotographers()
  }

  render() {
    let recentPhotographersMarkup = this.state.photographers ? (
      this.state.photographers.map((photographer) => < Profiles photographer={photographer} /> )
    ) : (
      <p>Loading...</p>
    )

    return (
      <Grid container spacing={16}>
        <Grid item sm={4} xs={12}>
          <Typography variant="h5" gutterBottom>
            Photographers
          </Typography>
          {recentPhotographersMarkup}
        </Grid>
        <Grid item sm={8} xs={12}>
          
        </Grid>
      </Grid>
 
    )
  }

} 

/*function BrowsePage() {
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
        <BrowseBar photographers={photographers} />
      </Container>
    </div>
  );
} */

export default BrowsePage;