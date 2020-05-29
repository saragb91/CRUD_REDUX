import React from 'react'
import { useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'
//REDUX
import { useDispatch } from 'react-redux'
import { deleteProductAction, getProductEdit } from '../actions/productAction'

const Product = ({product}) => {
    
    const { name, price, id } = product

    const dispatch = useDispatch()
    const history = useHistory() //habilitar history para redirección

    //confirmar si desea eliminarlo
    const confirmDeleteProduct = id => {

    //preguntar al usuario

    Swal.fire({
        title: 'Estás seguro?',
        text: "Un producto que se elimina, no se puede recuperar",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar!',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.value) {

            //pasarlo al action
            dispatch(deleteProductAction(id))
        }
      })

    }
    //función que redirige de forma programada
    const redirectionEdition = product => {
        dispatch( getProductEdit(product))
        history.push(`/products/edit/${product.id}`)
    }

    
    
    return ( 
        <tr>
            <td>{ name }</td>
            <td><span className='font-weigth-bold'></span>${ price }</td>
            <td className='acciones'>
                <button type="button" onClick={()=> redirectionEdition(product)} className='btn btn-primary mr-2'>
                    Editar
                </button>
                <button
                    type='button'
                    className='btn btn-danger'
                    onClick={() => confirmDeleteProduct(id)}
                >
                        Eliminar
                    </button>
            </td>
        </tr>
     );
}
 
export default Product;