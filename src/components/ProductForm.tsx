import { Formik, FormikHelpers } from 'formik';
import { FC } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { Product } from '../interfaces';
import { createProduct, updateProduct } from '../store/reducers/productsReducer';
import { useAppDispatch, useAppSelector } from '../store/store';

export enum ProductFormAction {
	create,
	edit
}
interface ProductFormFields {
	productName: string,
	category: string,
	price: number
}
interface Props {
	action: ProductFormAction,
	productToEdit: Product | null,
	hideProductModal: () => void,
}
const ProductForm: FC<Props> = ({ action, productToEdit, hideProductModal }) => {
	const initialValues: ProductFormFields = {
		productName: productToEdit?.name || '',
		category: productToEdit?.category || '',
		price: productToEdit?.price || 0,
	};
	const user = useAppSelector((state) => state.user);
	const dispatch = useAppDispatch();

	const validate = ({ productName, category, price }: ProductFormFields) => {
		let errors = {};
		if (!productName) {
			errors = {
				...errors,
				productName: '*Product name is required',
			};
		} else if (!/^[a-zA-Z]/.test(productName)) {
			errors = {
				...errors,
				productName: '*Product name must start with a letter',
			};
		} else if (!/^[a-zA-Z\s-]+$/.test(productName)) {
			errors = {
				...errors,
				productName: '*Product name can only contain letters, hyphen minus and spaces',
			};
		}
		if (!category) {
			errors = {
				...errors,
				category: '*Category is required',
			};
		} else if (!/^[a-zA-Z]/.test(category)) {
			errors = {
				...errors,
				category: '*Category must start with a letter',
			};
		} else if (!/^[a-zA-Z\s-]+$/.test(category)) {
			errors = {
				...errors,
				category: '*Category can only contain letters, hyphen minus and spaces',
			};
		}
		if (typeof price === 'string') {
			errors = {
				...errors,
				price: '*Price is required',
			};
		} else if (price <= 0) {
			errors = {
				...errors,
				price: '*Price must be greather than 0',
			};
		}
		return errors;
	};
	const handleSaveProduct = async ({
		productName, category, price,
	}: ProductFormFields, { setSubmitting }: FormikHelpers<ProductFormFields>) => {
		if (user) {
			if (action === ProductFormAction.create) {
				const createdBy = user.uid;
				await dispatch(createProduct({
					name: productName,
					category,
					price,
					createdBy,
				}));
			} else if (action === ProductFormAction.edit && productToEdit) {
				await dispatch(updateProduct({
					...productToEdit,
					name: productName,
					category,
					price,
				}));
			}
			setSubmitting(false);
			hideProductModal();
		}
	};

	return (
		<Formik
			initialValues={initialValues}
			validate={validate}
			onSubmit={handleSaveProduct}
		>
			{({
				handleSubmit, getFieldProps, errors, isSubmitting, submitCount,
			}) => (
				<Form className="p-4" noValidate onSubmit={handleSubmit}>
					<Form.Group className="mb-3" controlId="productName">
						<Form.Label className="fw-semibold fs-lg-2">Product name</Form.Label>
						<Form.Control
							className="border-gray-40 fs-lg-2"
							type="text"
							{...getFieldProps('productName')}
							isValid={submitCount > 0 && !errors.productName}
							isInvalid={submitCount > 0 && !!errors.productName}
						/>
						<Form.Control.Feedback type="invalid">
							{errors.productName}
						</Form.Control.Feedback>
					</Form.Group>
					<Form.Group className="mb-3" controlId="category">
						<Form.Label className="fw-semibold fs-lg-2">Category</Form.Label>
						<Form.Control
							className="border-gray-40 fs-lg-2"
							type="text"
							{...getFieldProps('category')}
							isValid={submitCount > 0 && !errors.category}
							isInvalid={submitCount > 0 && !!errors.category}
						/>
						<Form.Control.Feedback type="invalid">
							{errors.category}
						</Form.Control.Feedback>
					</Form.Group>
					<Form.Group className="mb-4" controlId="price">
						<Form.Label className="fw-semibold fs-lg-2">Price</Form.Label>
						<InputGroup hasValidation>
							<InputGroup.Text>$</InputGroup.Text>
							<Form.Control
								className="border-gray-40 fs-lg-2"
								type="number"
								{...getFieldProps('price')}
								isValid={submitCount > 0 && !errors.price}
								isInvalid={submitCount > 0 && !!errors.price}
							/>
							<Form.Control.Feedback type="invalid">
								{errors.price}
							</Form.Control.Feedback>
						</InputGroup>
					</Form.Group>
					<Button
						className="w-100 fs-3"
						variant="primary"
						type="submit"
						disabled={isSubmitting}
					>
						Save product
					</Button>
				</Form>
			)}
		</Formik>
	);
};

export default ProductForm;
