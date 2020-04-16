import React, { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import ProfileCard from './ProfileCard'
import ActiveProfile from './ActiveProfile.js'
import TextField from '@material-ui/core/TextField'
import SearchIcon from '@material-ui/icons/Search';
import Grid from '@material-ui/core/Grid'

class BrowsePage extends React.Component {

  constructor(props) {
    super(props)
    this.handler = this.handler.bind(this)
  }

  state = {
    photographers: [],
    selectedPhotographer: [],
    profileHasBeenClicked: false
  }

  //Get all pertinent fields regarding all photographers
  //This will get a list of photographers, each photographer in the list is a dict
  //containing their netid (photographer_netid), first name  (first_name),
  //last name (last_name), email (email), description (description), profile picture (profile_pic)
  //urls of portfolio photos (urls)
  fetchPhotographers = () => {
    fetch('/api/browse')
    .then(response => response.json())
    .then(result => this.setState({
      photographers: result.photographers
    })).then(console.log(this.state.photographers))
    .catch(e => console.log(e))
  }

  componentDidMount() {
    this.fetchPhotographers()
  }

  handler(arg1, arg2) {
    this.setState({
      selectedPhotographer:arg1,
      profileHasBeenClicked:arg2
    })
  }

  render() {
    let recentPhotographersMarkup = this.state.photographers ? (
      this.state.photographers.map((photographer) => < ProfileCard photographer={photographer} handler = {this.handler}/> )
    ) : (
      <p>Loading...</p>
    )

    return (
      <Container fluid>
        <Row >
          <Col xs = {4} className="column1">
            <div className="search">
              <Grid container className="grid" spacing={1} alignItems="flex-end">
                <Grid item>
                  <SearchIcon />
                </Grid>
                <Grid item>
                  <TextField id="input-with-icon-grid" label="Search by Name" />
                </Grid>
              </Grid>
            </div>
            {recentPhotographersMarkup}
          </Col>
          <Col>
            <Container>
              {this.state.profileHasBeenClicked ? <ActiveProfile selectedPhotographer = {this.state.selectedPhotographer}/> : null}
            </Container>
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