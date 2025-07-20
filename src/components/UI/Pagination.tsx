import Button from './Button';

// PaginationProps defines the props required for the Pagination component
interface PaginationProps {
	currentPage: number;
	totalPages: number;
	prevPage: () => void;
	nextPage: () => void;
}

// Pagination component renders navigation controls for paginated data
const Pagination = ({
	currentPage,
	totalPages,
	prevPage,
	nextPage,
}: PaginationProps) => {
	return (
		// Navigation container for pagination controls
		<nav
			className="flex justify-center items-center gap-2 mt-4"
			aria-label="Pagination"
		>
			<ul className="flex items-center gap-2">
				<li>
					{/* Button to go to the previous page, disabled on first page */}
					<Button
						onClick={prevPage}
						title="Previous page"
						disabled={currentPage === 1}
					>
						Prev
					</Button>
				</li>
				<li>
					{/* Display current page and total pages */}
					<span aria-current="page">
						Page {currentPage} of {totalPages}
					</span>
				</li>
				<li>
					{/* Button to go to the next page, disabled on last page */}
					<Button
						onClick={nextPage}
						title="Next page"
						disabled={currentPage === totalPages}
					>
						Next
					</Button>
				</li>
			</ul>
		</nav>
	);
};

export default Pagination;
