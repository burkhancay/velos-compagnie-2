
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";


const styles = {
  height: '100vh',
  fontSize: 20
}
function Success({ history }) {
  useEffect(() => {
    redirectHome();
  }, []);
  const redirectHome = () => {
    setTimeout(() => history.push("/"), 4000);
  }
  return (
    <>
    <div style={styles} className='d-flex justify-content-center align-items-center'>
        <div className="alert alert-success mt-3 mb-3">
          <p className="icontext"><i className="icon text-success fa fa-thumbs-up"></i>Nous vous remercions pour votre commande.</p>
      </div>
    </div>
    </>
  );
}
export default Success