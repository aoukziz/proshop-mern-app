import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

const SearchBox = () => {
	const [keyword, setKeyword] = useState('');
	const history = useHistory();
	const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (keyword.trim()) {
			history.push(`/search/${keyword}`);
			setKeyword('');
		} else {
			history.push('/');
		}
	};
	return (
		<Form onSubmit={submitHandler} inline className='d-flex'>
			<Form.Control
				type='text'
				name='q'
				value={keyword}
				onChange={(e) => setKeyword(e.target.value)}
				placeholder='Search Products...'
				className='mr-sm-2 ml-sm-5'></Form.Control>
			<Button type='Submit' variant='outline-success' className='p-2 mx-2'>
				Search
			</Button>
		</Form>
	);
};

export default SearchBox;
