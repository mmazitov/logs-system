import type { ReactNode } from 'react';

const Modal = ({ children }: { children: ReactNode }) => {
	return (
		<div
			className="z-50 fixed inset-0 flex justify-center items-center bg-[rgba(0,0,0,0.8)]"
			role="dialog"
			aria-modal="true"
		>
			<div className="bg-white shadow-lg p-6 rounded-lg min-w-[300px]">
				{children}
			</div>
		</div>
	);
};

export default Modal;
