import React from "react";
import PropTypes from 'prop-types';
import _ from 'lodash';

const Pagination = props => {

	const { itemsCount, pageSize, curPage, onPageChange } = props;
	console.log(curPage);

	const pageCount = Math.ceil(itemsCount / pageSize);
	console.log(pageCount);
	// [1...pagesCount].map()
	if(pageCount === 1) return null;
	const pages = _.range(1, pageCount + 1)
	console.log(pages);


	return ( 
	<nav>
		<ul className="pagination">
			{ pages.map(page => (
			<li key={page} className="page-item">
				<a className="page-link"
					onClick={()=> onPageChange(page)}
				>{page}</a>
			</li>
			))}
		</ul>
	</nav>
	);
}

Pagination.PropTypes = {
	itemsCount: PropTypes.number.isRequired, 
	pageSize: PropTypes.number.isRequired,
	curPage: PropTypes.number.isRequired,
	onPageChange: PropTypes.func.isRequired
};

export default Pagination;