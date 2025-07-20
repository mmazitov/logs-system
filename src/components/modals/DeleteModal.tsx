import Button from '../UI/Button';

// DeleteModal component for confirming log deletion
const DeleteModal = ({
	onCancel,
	onDelete,
}: {
	onCancel: () => void;
	onDelete: () => void;
}) => {
	return (
		<>
			{/* Modal title */}
			<h2 className="mb-4 font-semibold text-lg" id="delete-modal-title">
				Remove log?
			</h2>
			<div
				className="flex justify-end gap-2"
				role="group"
				aria-labelledby="delete-modal-title"
			>
				{/* Cancel button */}
				<Button
					onClick={onCancel}
					className="bg-gray-200 hover:bg-gray-300"
					title="Cancel"
				>
					Cancel
				</Button>
				{/* Delete button */}
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
