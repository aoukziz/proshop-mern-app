interface RatingProps {
	value: number;
	text?: string;
	color?: string;
}

const Rating: React.FC<RatingProps> = ({ value, text, color }) => {
	return (
		<div className='rating'>
			<span>
				{[1, 2, 3, 4, 5].map((index) => (
					<i
						key={index}
						style={{ color }}
						className={
							value >= index
								? 'fas fa-star'
								: value >= index - 0.5
								? 'fas fa-star-half-alt'
								: 'far fa-star'
						}></i>
				))}
			</span>
			<span>{text && text}</span>
		</div>
	);
};

Rating.defaultProps = {
	color: '#f8e825',
};

export default Rating;
