import React from 'react';
import { Alert } from 'react-bootstrap';

interface MessageProps {
	variant?:
		| 'primary'
		| 'secondary'
		| 'success'
		| 'danger'
		| 'warning'
		| 'info'
		| 'light'
		| 'dark';
	children: React.ReactNode;
}

const Message: React.FC<MessageProps> = ({ variant, children }) => {
	return <Alert variant={variant}>{children}</Alert>;
};

Message.defaultProps = {
	variant: 'info',
};

export default Message;
