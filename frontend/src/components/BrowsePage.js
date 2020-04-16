import React, { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import ProfileCard from './ProfileCard'
import Typography from '@material-ui/core/Typography'
import ActiveProfile from './ActiveProfile.js'
import TextField from '@material-ui/core/TextField'
import SearchIcon from '@material-ui/icons/Search';
import Grid from '@material-ui/core/Grid'
import GridList from '@material-ui/core/GridList'
import Paper from '@material-ui/core/Paper'

const styles = {
  main: { 
    display: 'inline-block',
    height: "inherit"
  }
}

class BrowsePage extends React.Component {

  constructor(props) {
    super(props)
    this.handler = this.handler.bind(this)
  }

  state = {
    photographers: [],
    selectedPhotographer: []
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

  handler(arg1) {
    console.log(arg1)
    this.setState({
      selectedPhotographer:arg1
    })
  }

  render() {
    let recentPhotographersMarkup = this.state.photographers ? (
      this.state.photographers.map((photographer) => < ProfileCard photographer={photographer} handler = {this.handler} /> )
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
            <ActiveProfile selectedPhotographer = {this.state.selectedPhotographer}/>
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

/*       <Container fluid>
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
              <ActiveProfile selectedPhotographer = {this.state.selectedPhotographer}/>
            </Container>
          </Col>
        </Row>
      </Container> */ 

export default BrowsePage;