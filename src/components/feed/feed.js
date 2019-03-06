import React, { Component } from 'react';
import axios from 'axios';
import env from '../../env';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class Feed extends Component {
    constructor(props) {
        super(props);
        this.state = {posts: [], url: env.url + 'getPosts', postUrl: env.url + 'post/', title: '', file: null };

        this.createPost = this.createPost.bind(this); 
        this.getPosts = this.getPosts.bind(this); 
        this.handleChange = this.handleChange.bind(this); 
        this.handleUpload = this.handleUpload.bind(this); 

    }

    createPost(event) {
        event.preventDefault();

        const data = new FormData(),
            user = localStorage.getItem('user'),
            userData = JSON.parse(user);
        if (!userData)
            return;

        data.append('file', this.state.file, this.state.title);
        data.append('title', this.state.title);
        data.append('userId', userData.data._id);

        axios.post(this.state.postUrl, data)
            .then(() => {
                this.getPosts();
            })
    }

    handleChange(e) {
        this.setState({ [e.target.name] : e.target.value });
    }

    getPosts() {
        axios(this.state.url)
            .then(posts => {
                this.setState({posts: posts.data})
            })
    }

    handleUpload = event => {
        this.setState({
          file: event.target.files[0]
        })
    }

    componentDidMount() {
        this.getPosts();
    }

    render() {
        return (
            <div>
                <h1>Feed Page</h1>
                <form onSubmit={this.createPost} noValidate autoComplete="off">
                    <TextField
                        id="standard-name"
                        label="Nome"
                        name="title"
                        onChange={this.handleChange}
                        value={this.state.title}
                        margin="normal"
                    />
                    <input
                        accept="image/*"
                        id="contained-button-file"
                        multiple
                        className={{display: 'none'}}
                        onChange={this.handleUpload}
                        onClick={this.handleUpload}
                        type="file"
                    />
                    <label htmlFor="contained-button-file">
                        <Button variant="contained" component="span">
                        Imagem
                        </Button>
                    </label>
                    <Button variant="contained" onClick={this.createPost} color="primary">
                        Enviar
                    </Button>
                </form>

                {this.state.posts.map(post => 
                (   
                    <div>
                        <h2>{post.title}</h2>
                        <h4>Autor: {post.user}</h4>
                        <img alt={post.title} src={"data:image/jpeg;base64," + post.photoPath}/>
                    </div>
                )
                )}
            </div>
        )
    }
}

export default Feed