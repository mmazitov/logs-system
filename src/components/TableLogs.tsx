import { Suspense, lazy, useState } from 'react';
import { toast } from 'react-toastify';

import type { Log } from '../../shared/types';
import { deleteLog, editLog, getLogs } from '../api/logsApi';
import useFetch from '../hooks/useFetch';
import usePagination from '../hooks/usePagination';
import useWindowWidth from '../hooks/useWindowWidth';

// Lazy load layout and modal components for code splitting
const DesktopLayout = lazy(() => import('./logsLayout/DesktopLayout'));
const MobileLayout = lazy(() => import('./logsLayout/MobileLayout'));
const Modal = lazy(() => import('./Modal'));
const DeleteModal = lazy(() => import('./modals/DeleteModal'));
const Pagination = lazy(() => import('./UI/Pagination'));

const PAGE_SIZE = 10;

// TableLogs component manages log data, editing, deleting, and pagination
const TableLogs = () => {
	// Fetch logs data from API
	const { data, error, refetch } = useFetch<Log>(getLogs);

	// Use pagination hook to manage current page and paginated data
	const { currentPage, totalPages, nextPage, prevPage, paginatedData } =
		usePagination<Log>(data, PAGE_SIZE);

	// State for tracking which field is being edited
	const [editField, setEditField] = useState<{
		id: string | null;
		field: 'owner' | 'text' | null;
	}>({ id: null, field: null });

	// State for storing current edit values
	const [editValues, setEditValues] = useState<{ owner: string; text: string }>(
		{
			owner: '',
			text: '',
		},
	);

	// State for delete modal visibility and selected log id
	const [deleteModalOpen, setDeleteModalOpen] = useState(false);
	const [deleteId, setDeleteId] = useState<string | null>(null);

	// Get current window width to determine layout
	const width = useWindowWidth();
	const isDesktop = width >= 640; // tailwind sm breakpoint

	// Start editing a field for a specific log
	const handleEditStart = (log: Log, field: 'owner' | 'text') => {
		setEditField({ id: log.id, field });
		setEditValues({ owner: log.owner, text: log.text });
	};

	// Handle changes to the edit input fields
	const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setEditValues((prev) => ({ ...prev, [name]: value }));
	};

	// Save the edited log field, validate input, and show notifications
	const handleSave = async (id: string, field: 'owner' | 'text') => {
		if (
			(editValues.owner.trim() === '' && field === 'owner') ||
			(editValues.text.trim() === '' && field === 'text')
		) {
			toast.error('Field cannot be empty!', {
				position: 'bottom-right',
				autoClose: 3000,
				pauseOnHover: false,
			});
			return;
		}
		await editLog(id, { ...editValues });
		setEditField({ id: null, field: null });
		refetch();
		toast.success('Save successfully!', {
			position: 'bottom-right',
			autoClose: 3000,
			pauseOnHover: false,
		});
	};

	// Delete a log entry and show notifications
	const handleDelete = async () => {
		if (!deleteId) return;
		await deleteLog(deleteId);
		setDeleteModalOpen(false);
		setDeleteId(null);
		refetch();
		toast.success('Remove successfully!', {
			position: 'bottom-right',
			autoClose: 3000,
			pauseOnHover: false,
		});
	};

	// Show error notification if fetching logs fails
	if (error) {
		toast.error('Error fetching logs', {
			position: 'bottom-right',
			autoClose: 3000,
			pauseOnHover: false,
		});
	}

	return (
		<div className="p-4">
			<Suspense fallback={null}>
				{/* Delete confirmation modal */}
				{deleteModalOpen && (
					<Modal>
						<DeleteModal
							onCancel={() => {
								setDeleteModalOpen(false);
								setDeleteId(null);
							}}
							onDelete={handleDelete}
						/>
					</Modal>
				)}
			</Suspense>
			<Suspense fallback={null}>
				{/* Render desktop or mobile layout based on screen width */}
				{isDesktop ? (
					<DesktopLayout
						paginatedData={paginatedData}
						editField={editField}
						editValues={editValues}
						handleEditStart={handleEditStart}
						handleEditChange={handleEditChange}
						handleSave={handleSave}
						setDeleteId={setDeleteId}
						setDeleteModalOpen={setDeleteModalOpen}
					/>
				) : (
					<MobileLayout
						paginatedData={paginatedData}
						editField={editField}
						editValues={editValues}
						handleEditStart={handleEditStart}
						handleEditChange={handleEditChange}
						handleSave={handleSave}
						setDeleteId={setDeleteId}
						setDeleteModalOpen={setDeleteModalOpen}
					/>
				)}
			</Suspense>
			{/* Show pagination controls if there are multiple pages */}
			{totalPages > 1 && (
				<Suspense fallback={null}>
					<Pagination
						currentPage={currentPage}
						totalPages={totalPages}
						nextPage={nextPage}
						prevPage={prevPage}
					/>
				</Suspense>
			)}
		</div>
	);
};

export default TableLogs;
