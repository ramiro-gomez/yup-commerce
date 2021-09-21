import { FC } from 'react';
import { Button } from 'react-bootstrap';

const CardQuantity: FC = () => (
	<div className="d-flex">
		<div className="d-flex flex-column">
			<Button className="fm-body fs-5 fs-lg-3 px-2 py-1 lh-1 border-end-0 border-bottom-0 rounded-end-0 rounded-bottom-0" variant="outline-primary">+</Button>
			<Button className="fm-body fs-5 fs-lg-3 px-2 py-1 lh-1 border-end-0 rounded-end-0 rounded-top-0" variant="outline-primary">-</Button>
		</div>
		<div className="card-quantity-box d-flex align-items-center justify-content-center border border-primary">
			<p className="m-0 text-primary fs-5 fs-lg-3">1</p>
		</div>
	</div>
);

export default CardQuantity;
