import {
    ADD_PRODUCT,
    ADD_PRODUCT_SUCCESS,
    ADD_PRODUCT_ERROR
} from '../types'
import clientAxios from '../config/axios'
import Swal from 'sweetalert2'


//Crear nuevos 
export function createNewProductAction(product) {
    return async (dispatch) => {
        dispatch( addProduct() )

        try {
            //insert en la API
            await clientAxios.post('/products', product)
            //si todo sale bien, actualiza el state
            dispatch( addProductSuccess(product) )
            //alerta
            Swal.fire(
                'Correcto',
                'El producto se agregó correctamente',
                'success'
            )

        } catch(error) {
            console.log(error)
            //si hay un error, cambiar el state
            dispatch(addProductError(true))

            //alerta de error
            Swal.fire({
                icon: 'error',
                title: 'Hubo un error',
                text: 'Hubo un error, inténtelo de nuevo'
            })
        }
    }
}

const addProduct = () => ({
    type: ADD_PRODUCT,
    payload: true
})

//si el producto se guarda en la BBDD
const addProductSuccess = product => ({
    type: ADD_PRODUCT_SUCCESS,
    //como modificamos el state, pasaremos un payload
    payload: product
})

//si hubo un error
const addProductError = (stateError) => ({
    type: ADD_PRODUCT_ERROR,
    payload: stateError
})