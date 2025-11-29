import styles from "../styles/delete_product.module.css";

export function DeleteProduct({ deleteProductRef, handleDelete, closeDeleteModal, product }) {

  return (
    <dialog ref={deleteProductRef} className={styles['delete-modal']}>
      <h2>¿Estás seguro de que deseas eliminar este producto?</h2>
      <div className={styles['delete-modal-buttons']}>
        <button className={`${styles.button} ${styles['confirm-button']}`} onClick={handleDelete(product.id)}>Sí, eliminar</button>
        <button className={`${styles.button} ${styles['cancel-button']}`} onClick={closeDeleteModal}>Cancelar</button>
      </div>
    </dialog>
  )
}