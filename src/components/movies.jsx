import React, { Component } from 'react'
import { getMovies } from '../services/fakeMovieService'
import Like from './common/Like';
import Pagination from './common/Pagination'

class Movies extends Component {
	
  state = {  
	movies: getMovies(),
	pageSize: 4,
	curPage: 1
  };

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

	
render() { 
const { pageSize, curPage } = this.state;
const { length: count } = this.state.movies;
if(count === 0) return <p>영화가 없습니다.</p>
return ( 
<React.Fragment>
	<p>현재 {count} 개의 대여 가능한 영화가 있습니다.</p>
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
{this.state.movies.map(movie =>(
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
	<Pagination itemsCount={count} 
				pageSize={pageSize}
				curPage = {curPage}
				onPageChange={this.handlePageChange}
				/>
</React.Fragment>
		);
	}
}
 
export default Movies;