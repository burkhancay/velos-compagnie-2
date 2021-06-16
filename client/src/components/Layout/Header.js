import React from 'react'; 
import { useSelector } from "react-redux"; 
import { Link } from "react-router-dom";
import useAuthentication from "../../lib/hooks/useAuthentication";

const UserLogin = ({ user  }) => { 
	const { handleUserLogout } = useAuthentication();
	console.dir(user);
	const logout = () => {
		handleUserLogout()
		setTimeout(() => window.location.reload(), 1000);
		
	};
	return (
		<>
			<li><span className="nav-link">
				{!!user ?
					<>
						<button className="btn btn-danger btn-sm" onClick={logout}>Déconnexion</button>{" "}
						<span><b>Bonjour, {user?.first}</b></span>
					</> :
					<span>
						<Link to={'/login'}>Connexion</Link> ou <Link to={'/register'}>Inscription</Link>
					</span>
				}
				</span>
			</li>
		</>
	)
}

const Header = () => {
	const { items } = useSelector((state) => ({ ...state.cart }));
	const { user } = useSelector((state) => state.user);
	const quantity = items.length > 0 ? items.length : "";
	return(<nav className="navbar d-flex p-md-0 navbar-expand-lg navbar-light bg-light border-bottom">
			<div className="container-fluid">
			<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTop4" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
				<span className="navbar-toggler-icon"></span>
			</button>
			<div className="collapse navbar-collapse" id="navbarTop4">
					<ul className="navbar-nav mr-auto">
					<UserLogin user={user} />
					<li><a href="#" className="nav-link" disabled={true}> Promos </a></li>
					<li><Link className="nav-link" to={'/help'}>Aide</Link></li>
				</ul>
				<ul className="navbar-nav">
					<li><a href="#" className="nav-link"> Livraison <img src="images/icons/flags/fr.png" height="16" /> </a></li>
					<li className="nav-item dropdown">
						<a href="#" className="nav-link" data-toggle="dropdown">Ma liste d'envies</a>
					</li>
					<li><a href="#" className="nav-link" disabled={true}>Mes commandes</a></li>
					<li><a href="#" className="nav-link"> <i className="fas fa-bell"></i></a></li>
					<li><Link to={'/cart'} className="nav-link"><i className="fas fa-shopping-cart"></i></Link></li><li> {' '}<span className="badge badge-primary">{quantity}</span></li>
				</ul> 
			</div> 
			</div> 
    </nav>)
}
export default Header;
