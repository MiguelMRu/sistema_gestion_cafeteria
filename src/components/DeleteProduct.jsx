import "../styles/delete_product.css";
export function DeleteProduct({deleteProductRef, handleDelete, closeDeleteModal, product}) {
    
    return (
        <dialog ref={deleteProductRef} className='delete-modal'>
            <h2>¿Estás seguro de que deseas eliminar este producto?</h2>
            <div className='delete-modal-buttons'>
              <button onClick={handleDelete(product.id)}>Sí, eliminar</button>
              <button onClick={closeDeleteModal}>Cancelar</button>
            </div>
          </dialog>
    )
}