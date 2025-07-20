import Button from './Button';

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	prevPage: () => void;
	nextPage: () => void;
}

const Pagination = ({
	currentPage,
	totalPages,
	prevPage,
	nextPage,
}: PaginationProps) => {
	return (
		<nav
			className="flex justify-center items-center gap-2 mt-4"
			aria-label="Pagination"
		>
			<ul className="flex items-center gap-2">
				<li>
					<Button
						onClick={prevPage}
						title="Previous page"
						disabled={currentPage === 1}
					>
						Prev
					</Button>
				</li>
				<li>
					<span aria-current="page">
						Page {currentPage} of {totalPages}
					</span>
				</li>
				<li>
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
