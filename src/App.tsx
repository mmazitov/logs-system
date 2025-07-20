import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TableLogs from './components/TableLogs';

const App = () => {
	return (
		<>
			<TableLogs />
			<ToastContainer />
		</>
	);
};

export default App;
