import React, { Component } from 'react';
import Movie from './Movie';
import './App.css';


//render : ComponentWillMount()  => render() => ComponentDidMount()
//update : ComponentWillReceiveProps() => shouldComponentUpdate() => componentWillUpdate() => render() 
// state 가 변경될 때 마다 render()가 다시 실행된다.

class App extends Component {

  state ={}
  
  componentDidMount() {
    this._getMovies();
  }

_renderMovie = () => {
  const movies = this.state.movies.map((movie => {
    console.log(movie);
    return <Movie 
    title ={movie.title_english} 
    poster ={movie.medium_cover_image} 
    genres ={movie.genres} 
    key ={movie.id} 
    synopsis ={movie.synopsis}
    />
  }))
  return movies
}

 _getMovies = async () => {
  const movies = await this._callApi();  // callApi가 완료되기를 기다린다.
  this.setState({
    movies
  })
}

_callApi = () => {
  return fetch('https://yts.am/api/v2/list_movies.json?sort_by=rating')
    .then(response => response.json())
    .then(json => json.data.movies )
    .catch(err => console.log(err))
}


  render() {
    console.log('Did render');
    return (
      <div className="App">
        {this.state.movies ? this._renderMovie() : 'Loading'}
      </div>
    );
  }
}

export default App;
