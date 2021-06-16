import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as Input from '../Input';
import { useFormValidation } from "../../../lib/hooks/useFormValidation";
import useAuthentication from "../../../lib/hooks/useAuthentication";

const Alert = ({ isVisible }) => (
	isVisible &&
	<div className="alert alert-info mt-3">
		<p className="icontext"><i className="icon text-primary fa fa-thumbs-up"></i>Compte utilisateur crée avec succès !</p>
    </div>
)
const ErrorMessage = ({ error }) => (
	error && 
	<div className="alert alert-danger mt-3">
		<p className="icontext]" style={{ color: 'crimson' }}><i className="icon text-danger fas fa-exclamation-circle"></i> {' '}{error?.error}</p>
    </div>
)

const defaultValues = {
	first: 'John' ,
	last: 'Doe' ,
	email: 'john.doe@mail.com' ,
	gender: 'Homme' ,
	city: 'Ville' ,
	password: 'test12345' ,
	confirm_password: 'test12345' 
}
const options = ['France', 'Belgique', 'Suisse', 'Luxembourg']
const Register = ({history}) => { 
	const dispatch = useDispatch();
	const { user, error } = useSelector(state => state.user);
	const { handleUserRegistration } = useAuthentication(dispatch);
	const { formValues, validate, register, handleOnChange, isValid } = useFormValidation({ formName: "register" });
	const { first, last, email, city, country, gender, password, confirm_password } = formValues["register"] ?? {};
	useEffect(() => {
		register(defaultValues);
	}, []);
	useEffect(() => {
		validate(formValues["register"] ?? {})
	}, [formValues]);
	const handleOnSubmit = (e) => {
		e.preventDefault();
		const newUser = { first, last, email, city, country, gender, password, confirm_password };
		handleUserRegistration(newUser)
			.then((user) => {
			console.log(`user successfully registered ${user}`);
			user && setTimeout(() => history.push("/"), 2000);
		});
	}
	return (
	<>
    <div className="card mx-auto" style={{maxWidth:'520px', marginTop:'140px'}} >
      <article className="card-body">
			<header className="mb-4"><h4 className="card-title">S'inscrire</h4></header>
			{/* feedback et message d'erreurs */}
			<ErrorMessage error={error} />
			<Alert isVisible={!!user} />
 			<form name="register" onSubmit={handleOnSubmit}>
				<div className="form-row">
					<Input.Text label="Prénom" name='first' value={first} onChange={handleOnChange} />
					<Input.Text label="Nom" name='last' value={last} onChange={handleOnChange} /> 
				</div> 
				<div className="form-group">
					<Input.Email label="Email" value={email} style={{padding: 0}} onChange={handleOnChange}/>
				</div> 
				<div className="form-group">
					<Input.Radio name="gender" label="Homme" value={gender} onChange={handleOnChange} />
					<Input.Radio name="gender" label="Femme" value={gender} onChange={handleOnChange} />
				</div> 
				<div className="form-row">
					<Input.Text name='city' label="Ville" value={city} onChange={handleOnChange} col="6"  />
					<Input.Select name='country' options={options} label="Pays" value={country} col="6" onChange={handleOnChange}/>
				</div> 	
				
				<div className="form-row">	
					<Input.Password label="Créer mot de passe"  style={{padding: 0}} col="6" value={password} onChange={handleOnChange} />
					<Input.ConfirmPassword label="Confirmation mot de passe" style={{padding: 0}} col="6" value={confirm_password} onChange={handleOnChange} />
				</div>
				<div className="form-group">
					<Input.Submit classNames="btn-primary btn-block" title="S'inscrire" disabled={!isValid} /> 
			    </div>              
			</form>
		</article>
    </div>
    <p className="text-center mt-4">Vous avez déjà un compte ? <Link to='/login'>Se connecter</Link></p>
    <br /><br /><br />
</>
)}
export default Register