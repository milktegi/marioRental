import React from "react";
import _ from 'lodash';

const Pagination = props => {

	const { itemsCount, pageSize, curPage } = props;
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
					onClick={()=> props.onPageChange(page)}
				>{page}</a>
			</li>
			))}
		</ul>
	</nav>
	);
}

export default Pagination;