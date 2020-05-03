import React from 'react';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent' 
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'

class ArchivedFeedPage extends React.Component {

    constructor() {
        super()
        this.state = {
            posts: [],
            filteredPosts: [],
            filter:"All",
        }
        this.handleFilterChange = this.handleFilterChange.bind(this)
    }

    fetchPosts = () => {
        fetch('/api/getArchivedPosts')
        .then(response => response.json())
        .then(result => this.setState({
          posts: result.posts,
          filteredPosts: result.posts
        }))
        .then(console.log(this.state.posts))
        .catch(e => console.log(e))
    }

    componentDidMount() {
        this.fetchPosts()
    }

    handleFilterChange(event) {   
        this.setState({filter:event.target.value})
 
        let filtered = []

        if (event.target.value === "All") {
          filtered = this.state.posts
        }
    
        else if (event.target.value === "photographers") {
            for (const post of this.state.posts) {
                if (post['specialty'] === "photographers")
                    filtered.push(post)
            }
        }

        else if (event.target.value === "videographers") {
            for (const post of this.state.posts) {
                if (post['specialty'] === "videographers")
                    filtered.push(post)
            }
        }
    
        else if (event.target.value === "editors") {
            for (const post of this.state.posts) {
                if (post['specialty'] === "editors")
                    filtered.push(post)
            }
        }

        this.setState({filteredPosts: filtered})
    }

    render() {
        return(
            <div>
                <div className="CreateProfileText" style={{marginTop: 40, marginBottom:15}}>
                    Archived Feed
                    <br/>
                    <br/>
                    <br/>
                    <FormControl style = {{minWidth: "75px"}}>
                        <InputLabel id="filter-label" >Filter By</InputLabel>
                        <Select
                            labelId="filter-label"
                            onChange = {this.handleFilterChange}
                            value = {this.state.filter}
                            >
                            <MenuItem value={"All"}> All </MenuItem>
                            <MenuItem value={"photographers"}> Photographers </MenuItem>
                            <MenuItem value={"videographers"}> Videographers </MenuItem> 
                            <MenuItem value={"editors"}> Editors </MenuItem>
                        </Select>
                    </FormControl>
                </div>
                
                <div style={{width: "65%", margin: 'auto', borderRadius:"0%"}}>
                    <a href="/feed">Click here to view current feed posts</a>
                </div>
                {this.state.filteredPosts.map(post => {
                    return (
                        <Card variant="outlined" style={{width: "65%", marginBottom: 10, margin: 'auto', borderRadius:"0%"}}>
                            <CardContent>
                                <Typography color="secondary">{post.netid}</Typography>
                                <Typography variant="h5" style={{whiteSpace: 'pre-line'}}>{post.subject_line}</Typography>
                                <br />
                                <Typography style={{whiteSpace: 'pre-line'}}>{post.description}</Typography>
                                <br />
                                <Typography color="secondary" style={{whiteSpace: 'pre-line'}}>Contact: {post.email}</Typography>
                                <Typography color="secondary" style={{whiteSpace: 'pre-line'}}>Looking for: {post.specialty}</Typography>
                                <Typography style={{textAlign: 'right'}} color="secondary">{post.timestamp}</Typography>

                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        )
    }
}

export default ArchivedFeedPage

