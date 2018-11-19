import React, { Component } from 'react'
import { getMovies } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';
import MoviesTable from './common/moviesTable';
import ListGroup from './common/listGroup';
import Pagination from './common/Pagination';
import { paginate } from '../utils/paginate';
import _ from 'lodash';


class Movies extends Component {
	
  state = {  
	  movies: [],
	  genres: [],
	  pageSize: 4,
	  curPage: 1,
	  sortColumn: { path: 'title', order: 'asc'}
  };

componentDidMount() {
	const genres = [{ _id: '', name: 'All Genres'},...getGenres()]
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

handleSort = sortColumn => {
	this.setState({ sortColumn });
}
	
render() { 

	const { 
		length: count 
	} = this.state.movies;

	const { 
		pageSize, 
		curPage, 
        movies: allMovies,
		selectedGenre,
		sortColumn
	} = this.state;

if(count === 0) return <p>영화가 없습니다.</p>

	const filtered = 
	selectedGenre && selectedGenre._id
	? allMovies.filter(m =>  m.genre._id === selectedGenre._id) 
	: allMovies;

	const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

	const movies = 
	paginate(sorted, curPage, pageSize);
	
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
	<MoviesTable 
	  sortColumn={sortColumn}
		movies={movies} 
		onLike={this.handleLike} 
		onDelete={this.handleDelete}
		onSort={this.handleSort}
	  />
	<Pagination 
		itemsCount={filtered.length} 
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