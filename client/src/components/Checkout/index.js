import React, { useEffect } from 'react';
import { useFormValidation } from "../../lib/hooks/useFormValidation";
import { setDelivery } from "../../lib/state/actions";
import { useDispatch, useSelector } from "react-redux";
import * as Input from '../Auth/Input'
import Payment from './Payment'
import DeliveryBox from './DeliveryBox'

const defaultValues = { 
	delivery: 'standard',
	address: ''
}

const options = ['France', 'Belgique', 'Suisse', 'Luxembourg'];
const Checkout = () => { 	
	const { user } = useSelector(state => state.user);
	const dispatch = useDispatch();
	const { first, last, email, city, country, gender } = user ?? {};
	const { formValues, validate, register, handleOnChange, isValid } = useFormValidation({ formName: "checkout" });
	useEffect(() => {
		register(defaultValues);
	}, []);
	const { delivery, address } = formValues["checkout"] ?? {};
	useEffect(() => {
		validate(formValues["checkout"] ?? {})
	}, [formValues]);
	const handleOnChangeDelivery = (e, value) => {
		handleOnChange(e, value);
		dispatch(setDelivery(value));
	}
	return (
	<>
	<section className="section-content padding-y" style={{ margin: '100px auto', maxWidth: '720px' }}>
		<div className="container" >

			<div className="card mb-4">
				<div className="card-body">
				<h4 className="card-title mb-3">Informations de livraison</h4>

				<div className="form-row">
					<div className="form-group col-sm-6">
						<DeliveryBox title="standard" value={delivery} message="Gratuite - 1 à 2 semaines" onChange={(e) => handleOnChangeDelivery(e, "standard")}/>
					</div>
					<div className="form-group col-sm-6">
						<DeliveryBox title="fast" value={delivery} message="Rapide - 20€ supplémentaires" onChange={(e) => handleOnChangeDelivery(e, "fast")}/>
					</div>
				</div>

				<div className="form-row">
					<Input.Text label="Prénom" name="first" value={first} onChange={handleOnChange} />
					<Input.Text label="Nom" name="last" value={last}  onChange={handleOnChange} />
				</div> 

				<div className="form-row">
					<Input.Email label="Email" value={email} onChange={handleOnChange} col="6" />	
				</div> 
				<div className="form-row">
					<Input.Select name='country' options={options}  label="Pays" col="6" value={country} onChange={handleOnChange}/>
					<Input.Text label="Ville" name='city' value={city} onChange={handleOnChange} />
				</div> 
					<Input.TextArea label="Adresse" name="address" onChange={handleOnChange}/> 
				</div> 
				<div className="form-row" style={{padding: '0 25px 30px'}}>
					<Payment isValid={!isValid} />	
				</div>
		</div> 
	</div>
</section>
</>
)}
export default Checkout