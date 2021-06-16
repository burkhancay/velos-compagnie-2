import React from 'react';  
import { Link } from "react-router-dom";

const Nav = () => {
  const links = ["Accueil", "Qui sommes-nous ?"]
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
    <Link className="navbar-brand" to={'/'}><b>Vélos Compagnie</b></Link> 

  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse " id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto menu">
      {links.map(link => {
        return (<li className='mr-4' key={link} onClick={() => { }}><Link to={`/${link == "Accueil" ? "" : link }`}>{link}</Link></li>)
        })
      }
    </ul>
    <form className="form-inline my-2 my-lg-0">
      <input className="form-control mr-sm-2" type="search" placeholder="Rechercher un produit" aria-label="Search" />
      <button className="btn btn-outline-light my-2 my-sm-0" type="submit">Rechercher</button>
    </form>
  </div>
</nav>)
}
export default Nav
