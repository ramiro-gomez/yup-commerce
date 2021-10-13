import { FC, ReactNode } from 'react';
import { Card } from 'react-bootstrap';
import { Product } from '../interfaces';

interface Props {
	product: Product,
	cardTop?: ReactNode,
	cardBottom: ReactNode
}
const defaultProps = {
	cardTop: <></>,
};
const ProductCard: FC<Props> = ({
	product: { name, price, category }, cardTop, cardBottom,
}) => (
	<Card className="shadow-md border-0">
		{cardTop}
		<Card.Body className="d-flex flex-column py-lg-4">
			<div className="w-100 mb-3 mb-lg-4">
				<div className="d-flex flex-wrap mb-2">
					<h5 className="text-gray fw-bold fs-3 fs-lg-1">{name}</h5>
					<h5 className="text-gray fw-bold fs-3 fs-lg-1 ms-auto">
						$
						{price}
					</h5>
				</div>
				<h6 className="text-gray fw-semibold fs-5 fs-lg-3">{category}</h6>
			</div>
			{cardBottom}
		</Card.Body>
	</Card>
);
ProductCard.defaultProps = defaultProps;

export default ProductCard;
