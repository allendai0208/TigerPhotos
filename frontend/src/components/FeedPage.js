import React from 'react';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent' 

class FeedPage extends React.Component {
    state = {
        posts: []
    }

    fetchPosts = () => {
        fetch('/api/getPosts')
        .then(response => response.json())
        .then(result => this.setState({
          posts: result.posts
        }))
        .then(console.log(this.state.posts))
        .catch(e => console.log(e))
    }

    componentDidMount() {
        this.fetchPosts()
    }

    render() {
        return(
            <div>
                <p className="CreateProfileText" style={{marginTop: 40}}>Feed</p>
                {this.state.posts.map(post => {
                    return (
                        <Card variant="outlined" style={{width: "75%", marginBottom: 10}}>
                            <CardContent>
                                <Typography  color="secondary">{post.netid}</Typography>
                                <Typography style={{whiteSpace: 'pre-line'}}>{post.subject_line}</Typography>
                                <Typography style={{whiteSpace: 'pre-line'}}>{post.description}</Typography>
                                <Typography style={{textAlign: 'right'}} color="secondary">{post.timestamp}</Typography>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        )
    }
}

export default FeedPage