import React, { Component } from 'react'
import { getMovies } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';
import Like from './common/Like';
import ListGroup from './common/listGroup';
import Pagination from './common/Pagination';
import { paginate } from '../utils/paginate';


class Movies extends Component {
	
  state = {  
	movies: [],
	genres: [],
	pageSize: 4,
	curPage: 1
  };

componentDidMount() {
	const genres = [{ name: 'All Genres'},...getGenres()]
	this.setState({ 
		movies: getMovies(), 
		genres 
	});
}



handleDelete = movies => {
  const m = this.state.movies.filter(movie => {
    return movies._id !== movie._id
  });
  this.setState({movies: m})
};

handleLike = (movie) => {
	const movieObj = [...this.state.movies];
	const index = movieObj.indexOf(movie);
	movieObj[index] = {...movieObj[index]};
	movieObj[index].liked = !movieObj[index].liked; 
	this.setState({ movies: movieObj })
};

handlePageChange = (pageNum) => {
	
	console.log(pageNum);
	this.setState({ curPage : pageNum })

};

handleGenreSelect = (genre) => {
	this.setState({ selectedGenre: genre, curPage : 1 });
}

	
render() { 

	const { 
		length: count 
	} = this.state.movies;

	const { 
		pageSize, 
		curPage, 
        movies: allMovies,
		selectedGenre
	} = this.state;

if(count === 0) return <p>영화가 없습니다.</p>

	const filtered = 
	selectedGenre && selectedGenre._id
	? allMovies.filter(m =>  m.genre._id === selectedGenre._id) 
	: allMovies;

	const movies = 
	paginate(filtered, curPage, pageSize);
	
	return ( 

<div className="row">
	<div className="col-3">
		<ListGroup 
		selectedItem={this.state.selectedGenre}
		items={this.state.genres} 
		onItemSelect={this.handleGenreSelect}/>
	</div>
	<div className="col">
	<p>현재 {filtered.length} 개의 대여 가능한 영화가 있습니다.</p>
		<table className="table">
			<thead>
				<tr>
				<th>Title</th>
				<th>Genre</th>
				<th>Stock</th>
				<th>Rate</th>
				<th></th>
				<th></th>
			</tr>
		</thead>
	<tbody>
{movies.map(movie =>(
	<tr key={movie._id}>
		<td>{movie.title}</td>
		<td>{movie.genre.name}</td>
		<td>{movie.numberInStock}</td>
		<td>{movie.dailyRentalRate}</td>
		<td>
			<Like liked={movie.liked}
				  onClick={() => this.handleLike(movie)}/>
		</td>
		<td>
			<button onClick={()=> this.handleDelete(movie)}
					className="btn btn-danger btn-sm">
					삭제
			</button>
		</td>
	</tr>
))}

	</tbody>
	</table>
	<Pagination itemsCount={filtered.length} 
				pageSize={pageSize}
				curPage = {curPage}
				onPageChange={this.handlePageChange}
			  />
		</div>
    </div>
		);
	}
}
 
export default Movies;