import {
    ADD_PRODUCT,
    ADD_PRODUCT_SUCCESS,
    ADD_PRODUCT_ERROR,
    START_DOWNLOAD_PRODUCTS,
    DOWNLOAD_PRODUCTS_SUCCESS,
    DOWNLOAD_PRODUCTS_ERROR,
    GET_PRODUCT_DELETE,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_ERROR,
    GET_PRODUCT_EDIT,
    START_EDIT_PRODUCT,
    PRODUCT_EDIT_SUCCESS,
    PRODUCT_EDIT_ERROR
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

//función que descarga los productos de la base de datos
export function getProductsAction() {
    return async (dispatch) => {
        dispatch(downloadProducts())

        try{

            const answer = await clientAxios.get('/products')
            dispatch(downloadProductsSuccess(answer.data))
        }catch(error){
            dispatch(downloadProductsError())
        }
    }  
}

const downloadProducts = () => ({
    type: START_DOWNLOAD_PRODUCTS,
    payload: true
})

const downloadProductsSuccess = products => ({
    type: DOWNLOAD_PRODUCTS_SUCCESS,
    payload: products
})

const downloadProductsError = () => ({
    type: DOWNLOAD_PRODUCTS_ERROR,
    payload: true

})

//selecciona y elimina el producto
export function deleteProductAction(id){
    return async (dispatch) => {
        dispatch(getProductDelete(id))
        
        try{
            await clientAxios.delete(`/products/${id}`)
            dispatch(deleteProductSuccess())

        //Si se elimina, mostrar alerta
        Swal.fire(
            'Eliminado!',
            'Tu archivo ha sido eliminado.',
            'success'
        )
        }catch(error){
            console.log(error)
            dispatch(deleteProductError())
        }
    }
}

const getProductDelete = id => ({
    type: GET_PRODUCT_DELETE,
    payload: id,
})

const deleteProductSuccess = () => ({
    type: PRODUCT_DELETE_SUCCESS
})

const deleteProductError = () => ({
    type: PRODUCT_DELETE_ERROR,
    payload: true
})

//colocar producto en edición
export function getProductEdit(product){
    return(dispatch) => {
        dispatch(getProductEditAction(product))
    }
}

const getProductEditAction = product => ({
    type: GET_PRODUCT_EDIT,
    payload: product,
})

//edita un registro en la api y state
export function editProductAction(product){
    return async (dispatch) => {
        dispatch( editProduct() )

        try{
            await clientAxios.put(`/products/${product.id}`, product)

            dispatch(editProductSuccess(product))

        }catch(error){

            dispatch(editProductError())
        }
    }
}
const editProduct = () => ({

    type: START_EDIT_PRODUCT
})

const editProductSuccess = product => ({
    type: PRODUCT_EDIT_SUCCESS,
    payload:product
})

const editProductError = () => ({
    type: PRODUCT_EDIT_ERROR,
    payload: true
})