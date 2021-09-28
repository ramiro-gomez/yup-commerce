import { Icon } from '@iconify/react';
import { FC } from 'react';
import { Product } from '../interfaces';
import { addToCart, removeFromCart } from '../store/reducers/cartReducer';
import { useAppDispatch } from '../store/store';
import CardQuantity from './CardQuantity';

interface Props {
	product: Product,
	quantity: number,
}

const CartCardBttom: FC<Props> = ({ product, quantity }) => {
	const dispatch = useAppDispatch();

	const increment = () => dispatch(addToCart({ product, quantity: 1 }));
	const decrement = () => dispatch(removeFromCart({ product, quantity: 1 }));
	const removeAllFromCart = () => dispatch(removeFromCart({ product, quantity }));

	return (
		<div className="d-flex align-items-center">
			<CardQuantity
				increment={increment}
				decrement={decrement}
				quantity={quantity}
			/>
			<button
				className="border-0 bg-transparent p-0 ms-auto"
				type="button"
				aria-label="remove"
				onClick={removeAllFromCart}
			>
				<Icon
					className="text-gray fs-1"
					icon="ant-design:close-outlined"
				/>
			</button>
		</div>
	);
};

export default CartCardBttom;
