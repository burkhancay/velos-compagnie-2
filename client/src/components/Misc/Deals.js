import React from 'react';
import { data } from '../../data/products';
import { addToCart } from "../../lib/state/actions";
import { useDispatch } from "react-redux";


const ProductScreen = (props) => {
    //Récuperation des donnees 
    const dispatch = useDispatch();
    const addToCartAction = () => dispatch(addToCart(props));

// id du produit
    const idP = parseInt(props.match.params.id);
    const product = Object.values(data).find(x => x.id === idP);
 

    const styles = {
        width: '30%',
        margin: "100px 400px"
    };

    return (
        <>

            <div className="container" >
                <div className="align-self-center" >

                    <img src={`/images/items/${product.id}.jpg`} style={styles} />

                    <figcaption className="info-wrap">
                        <ul className="rating-stars mb-1">

                            {console.log(props)}
                            <li style={{
                                width: '80%',
                                listStyleType: 'none'
                            }} className="stars-active">
                                <img src="/images/icons/stars-active.svg" alt="" />
                            </li>

                        </ul>

                    </figcaption>
                    <table className="table" >
                        <thead>
                            <tr>
                                <th scope="col">Réference</th>
                                <th scope="col">{product.id}</th>

                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">Nom</th>
                                <td>{product.name}</td>

                            </tr>
                            <tr>
                                <th scope="row">Marque</th>
                                <td>{product.brand}</td>

                            </tr>
                            <tr>
                                <th scope="row">Prix</th>
                                <td colspan="2">{product.price}€</td>

                            </tr>
                            <tr>
                                <th scope="row">Categorie</th>
                                <td colspan="2">{product.category}</td>

                            </tr>
                        </tbody>
                    </table>
                    <div className="btn-group btn-group-toggle float-right" data-toggle="buttons">
                        <label className="btn btn-warning active">
                            <input type="radio" name="options" id="option1" checked /><i className="fas fa-heart"></i>
                        </label>


                        <label className="btn btn-success">
                            <input onClick={addToCartAction} type="radio" name="options" id="option3" /><i className="fas fa-shopping-cart"></i>
                        </label>
                    </div>

                </div></div>




        </>
    )
}

export default ProductScreen