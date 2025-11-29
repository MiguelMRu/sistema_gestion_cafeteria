export const useModal = (deleteProductRef) => {
    //Funcion para eliminar producto
    const handleDelete = (id) => async () => {
        try {
            await deleteProduct(id);
            navigate('/');
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    }

    //Abrir modal de eliminacion
    const openDeleteModal = () => {
        deleteProductRef.current.showModal();
    }

    //Cerrar modal de eliminacion
    const closeDeleteModal = () => {
        deleteProductRef.current.close();
    }

    return {
        handleDelete,
        openDeleteModal,
        closeDeleteModal
    }

}