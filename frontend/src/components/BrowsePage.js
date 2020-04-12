import React, { useEffect, useState } from 'react';
import { ProfileForm } from './ProfileForm';
import { Photographers } from './Photographers'
import {BrowseBar} from './BrowseBar'
import Grid from '@material-ui/core/Grid'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
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
      <Container fluid>
        <Row>
          <Col>
          <Typography variant="h5" gutterBottom>
            Photographers
          </Typography>
          </Col>
        </Row>
        <Row>
          <Col xs = {4}>
            {recentPhotographersMarkup}
          </Col>
          <Col>
            <p>asdf</p>
          </Col>
        </Row>
      </Container>
 
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