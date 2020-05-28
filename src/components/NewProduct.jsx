import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux'
//Actions de Redux
import {createNewProductAction} from '../actions/productAction'

const NewProduct = ({history}) => {

    //state del componente
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)

    //utilizar useDispatch y te crea una función
    const dispatch = useDispatch()

    //acceder al state del store
    const load = useSelector( state => state.products.loading)
    console.log(load)
    const error = useSelector(state => state.products.error)
    //mandar llamar el action de productAction
    const addProduct = product => dispatch( createNewProductAction(product) )

    
    //cuando el usuario haga submit
    const submitNewProduct = e => {
        e.preventDefault()

        //validar formulario
        if( name.trim() === '' || price <=0 ){
            return
        }

        //si no hay errores

        //crear el nuevo producto
        addProduct({
            name,
            price
        })

        //redireccionar
        history.push('/')
    }
    return ( 
        <div className = 'row justify-content-center'>
            <div className = 'col-md-8'>
                <div className='card'>
                    <div className='card-body'>
                        <h2 className = 'text-center mb-4 font-weight-bold'> Agregar Nuevo Producto </h2>
                        <form
                            onSubmit={submitNewProduct}
                        >
                            <div className = 'form-group'>
                                <label>Nombre Producto</label>
                                <input type="text" 
                                        className='form-control' 
                                        placeholder='Nombre Producto'
                                        name='nombre' 
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                />
                            </div>

                            <div className = 'form-group'>
                                <label>Precio Producto</label>
                                <input type="number"
                                        className='form-control' 
                                        placeholder='Precio Producto'
                                        name='precio'
                                        value={price}
                                        onChange={e => setPrice(Number(e.target.value))}
                                />
                            </div>
                            <button type='submit' className='btn btn-primary font-weight-bold text-uppercase d-block w-100'>
                                Agregar
                            </button>
                        </form>
                        {load ? <p>Cargando...</p> : null}
                        { error ? <p className = 'alert alert-danger p2 mt-4 text-center'>Hubo un error</p> : null }
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default NewProduct;