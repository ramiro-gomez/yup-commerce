import { FC } from 'react';
import { Button, Card } from 'react-bootstrap';

interface Props {
	productData: {
		name: string,
		category: string,
		price: number
	}
}
const ProductCard: FC<Props> = ({ productData: { name, price, category } }) => (
	<Card className="shadow-md">
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
			<div className="d-flex mx-auto">
				<div className="d-flex flex-column">
					<Button className="fm-body fs-5 fs-lg-3 px-2 py-1 lh-1 border-end-0 border-bottom-0 rounded-end-0 rounded-bottom-0" variant="outline-primary">+</Button>
					<Button className="fm-body fs-5 fs-lg-3 px-2 py-1 lh-1 border-end-0 rounded-end-0 rounded-top-0" variant="outline-primary">-</Button>
				</div>
				<div className="card-quantity-box d-flex align-items-center justify-content-center border border-primary">
					<p className="m-0 text-primary fs-5 fs-lg-3">1</p>
				</div>
				<Button className="fm-body fs-5 fs-lg-3 fw-semibold border-start-0 rounded-start-0" variant="outline-primary">Add to cart</Button>
			</div>
		</Card.Body>
	</Card>
);

export default ProductCard;
