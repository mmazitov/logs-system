import { CiEdit } from 'react-icons/ci';
import { FaSave } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

import type { Log } from '../../../shared/types';
import { formatDate } from '../../utils/helpers/formatDate';
import Button from '../UI/Button';
import Input from '../UI/Input';

interface MobileLayoutProps {
	paginatedData: Log[];
	editField: { id: string | null; field: 'owner' | 'text' | null };
	editValues: { owner: string; text: string };
	handleEditStart: (log: Log, field: 'owner' | 'text') => void;
	handleEditChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleSave: (id: string, field: 'owner' | 'text') => void;
	setDeleteId: (id: string) => void;
	setDeleteModalOpen: (open: boolean) => void;
}

const MobileLayout = ({
	paginatedData,
	editField,
	editValues,
	handleEditStart,
	handleEditChange,
	handleSave,
	setDeleteId,
	setDeleteModalOpen,
}: MobileLayoutProps) => {
	return (
		<div className="sm:hidden flex flex-col gap-4">
			{paginatedData.map((log) => (
				<div
					key={log.id}
					className="flex flex-col gap-2 bg-white shadow-sm p-4 border border-gray-200 rounded-lg"
				>
					<div className="flex justify-between items-start gap-2">
						<span className="font-semibold text-gray-700">Owner:</span>
						<div>
							{editField.id === log.id && editField.field === 'owner' ? (
								<div className="flex justify-between items-start gap-2">
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
								<div className="flex justify-between items-start gap-2">
									{log.owner}
									<Button
										onClick={() => handleEditStart(log, 'owner')}
										title="Edit"
									>
										<CiEdit />
									</Button>
								</div>
							)}
						</div>
					</div>
					<div className="flex justify-between items-start gap-2">
						<span className="font-semibold text-gray-700">Created:</span>
						<span className="text-gray-500 text-xs">
							{formatDate(log.createdAt)}
						</span>
					</div>
					<div className="flex justify-between items-start gap-2">
						<span className="font-semibold text-gray-700">Updated:</span>
						<span className="text-gray-500 text-xs">
							{formatDate(log.updatedAt)}
						</span>
					</div>
					<div className="flex justify-between items-start gap-2">
						<span className="font-semibold text-gray-700">Text:</span>
						<div>
							{editField.id === log.id && editField.field === 'text' ? (
								<div className="flex justify-between items-start gap-2">
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
								<div className="flex justify-between items-start gap-2">
									{log.text}
									<Button
										onClick={() => handleEditStart(log, 'text')}
										title="Edit"
									>
										<CiEdit />
									</Button>
								</div>
							)}
						</div>
					</div>
					<div className="flex justify-end">
						<Button
							onClick={() => {
								setDeleteId(log.id);
								setDeleteModalOpen(true);
							}}
							className="flex items-center gap-2 hover:text-red-600"
							title="Delete"
						>
							Delete
							<MdDelete />
						</Button>
					</div>
				</div>
			))}
		</div>
	);
};

export default MobileLayout;
