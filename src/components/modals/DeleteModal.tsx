import Button from '../UI/Button';

const DeleteModal = ({
	onCancel,
	onDelete,
}: {
	onCancel: () => void;
	onDelete: () => void;
}) => {
	return (
		<>
			<h2 className="mb-4 font-semibold text-lg" id="delete-modal-title">
				Remove log?
			</h2>
			<div
				className="flex justify-end gap-2"
				role="group"
				aria-labelledby="delete-modal-title"
			>
				<Button
					onClick={onCancel}
					className="bg-gray-200 hover:bg-gray-300"
					title="Cancel"
				>
					Cancel
				</Button>
				<Button
					onClick={onDelete}
					className="bg-red-500 hover:bg-red-600 text-white"
					title="Delete"
				>
					Delete
				</Button>
			</div>
		</>
	);
};

export default DeleteModal;
