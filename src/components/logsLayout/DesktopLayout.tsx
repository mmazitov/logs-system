import { useMemo } from 'react';
import { CiEdit } from 'react-icons/ci';
import { FaSave } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

import { logsHeading } from '../../../shared/constants/tableHeading';
import type { Log } from '../../../shared/types';
import { formatDate } from '../../utils/helpers/formatDate';
import Button from '../UI/Button';
import Input from '../UI/Input';

interface DesktopLayoutProps {
	paginatedData: Log[];
	editField: { id: string | null; field: 'owner' | 'text' | null };
	editValues: { owner: string; text: string };
	handleEditStart: (log: Log, field: 'owner' | 'text') => void;
	handleEditChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleSave: (id: string, field: 'owner' | 'text') => void;
	setDeleteId: (id: string) => void;
	setDeleteModalOpen: (open: boolean) => void;
}

const colsWidths = [
	'w-32',
	'w-40',
	'w-40',
	'w-64',
	'w-24', // actions
];
const colsClass = 'px-4 py-2 border-gray-100 border-b';

const DesktopLayout = ({
	paginatedData,
	editField,
	editValues,
	handleEditStart,
	handleEditChange,
	handleSave,
	setDeleteId,
	setDeleteModalOpen,
}: DesktopLayoutProps) => {
	const memoizedColsWidths = useMemo(() => colsWidths, []);
	const memoizedColsClass = useMemo(() => colsClass, []);
	return (
		<div className="hidden sm:block overflow-x-auto">
			<table className="bg-white shadow-sm border border-gray-200 rounded-lg w-full min-w-full table-fixed">
				<thead>
					<tr className="bg-gray-100">
						{logsHeading.map((heading, key: number) => (
							<th
								key={key}
								className={`px-4 py-2 border-gray-200 border-b font-semibold text-gray-700 text-sm text-left ${memoizedColsWidths[key]}`}
							>
								{heading.text}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{paginatedData.map((log, idx) => (
						<tr
							key={log.id}
							className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
						>
							<td className={`${memoizedColsClass} ${memoizedColsWidths[0]}`}>
								{editField.id === log.id && editField.field === 'owner' ? (
									<div className="flex justify-between items-center gap-2">
										<Input
											name="owner"
											value={editValues.owner}
											onChange={handleEditChange}
											required
										/>
										<Button
											onClick={() => handleSave(log.id, 'owner')}
											className="hover:text-green-600"
											title="Save"
										>
											<FaSave />
										</Button>
									</div>
								) : (
									<div className="flex justify-between items-center gap-2 break-all">
										{log.owner}
										<Button
											onClick={() => handleEditStart(log, 'owner')}
											title="Edit"
										>
											<CiEdit />
										</Button>
									</div>
								)}
							</td>
							<td
								className={`${memoizedColsClass} ${memoizedColsWidths[1]} text-gray-500 text-xs`}
							>
								{formatDate(log.createdAt)}
							</td>
							<td
								className={`${memoizedColsClass} ${memoizedColsWidths[2]} text-gray-500 text-xs`}
							>
								{formatDate(log.updatedAt)}
							</td>
							<td className={`${memoizedColsClass} ${memoizedColsWidths[3]}`}>
								{editField.id === log.id && editField.field === 'text' ? (
									<div className="flex justify-between items-center gap-2">
										<Input
											name="text"
											value={editValues.text}
											onChange={handleEditChange}
											required
										/>
										<Button
											onClick={() => handleSave(log.id, 'text')}
											className="hover:text-green-600"
											title="Save"
										>
											<FaSave />
										</Button>
									</div>
								) : (
									<div className="flex justify-between items-center gap-2 break-all">
										{log.text}
										<Button
											onClick={() => handleEditStart(log, 'text')}
											title="Edit"
										>
											<CiEdit />
										</Button>
									</div>
								)}
							</td>
							<td
								className={`${memoizedColsClass} ${memoizedColsWidths[4]} flex gap-2`}
							>
								<Button
									onClick={() => {
										setDeleteId(log.id);
										setDeleteModalOpen(true);
									}}
									className="hover:text-red-600"
									title="Delete"
								>
									<MdDelete />
								</Button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default DesktopLayout;
