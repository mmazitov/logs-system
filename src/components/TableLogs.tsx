import { Suspense, lazy, useState } from 'react';
import { toast } from 'react-toastify';

import type { Log } from '../../shared/types';
import { deleteLog, editLog, getLogs } from '../api/logsApi';
import useFetch from '../hooks/useFetch';
import usePagination from '../hooks/usePagination';
import useWindowWidth from '../hooks/useWindowWidth';

const DesktopLayout = lazy(() => import('./logsLayout/DesktopLayout'));
const MobileLayout = lazy(() => import('./logsLayout/MobileLayout'));
const Modal = lazy(() => import('./Modal'));
const DeleteModal = lazy(() => import('./modals/DeleteModal'));
const Pagination = lazy(() => import('./UI/Pagination'));

const PAGE_SIZE = 10;

const TableLogs = () => {
	const { data, error, refetch } = useFetch<Log>(getLogs);

	const { currentPage, totalPages, nextPage, prevPage, paginatedData } =
		usePagination<Log>(data, PAGE_SIZE);

	const [editField, setEditField] = useState<{
		id: string | null;
		field: 'owner' | 'text' | null;
	}>({ id: null, field: null });
	const [editValues, setEditValues] = useState<{ owner: string; text: string }>(
		{
			owner: '',
			text: '',
		},
	);
	const [deleteModalOpen, setDeleteModalOpen] = useState(false);
	const [deleteId, setDeleteId] = useState<string | null>(null);

	const width = useWindowWidth();
	const isDesktop = width >= 640; // tailwind sm breakpoint

	const handleEditStart = (log: Log, field: 'owner' | 'text') => {
		setEditField({ id: log.id, field });
		setEditValues({ owner: log.owner, text: log.text });
	};

	const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setEditValues((prev) => ({ ...prev, [name]: value }));
	};

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
