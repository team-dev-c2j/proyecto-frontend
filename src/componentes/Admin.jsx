function Admin () {
    return (
        <div>
            <h1>Formulario de administración</h1>
            <form action="/admin" method="post">
            <div>
                <label for="title">Título:</label>
                <input type="text" id="title" name="title" required />
            </div>
            <div>
                <label for="nameProd">Nombre del producto:</label>
                <input type="text" id="nameProd" name="nameProd" required />
            </div>
            <div>
                <label for="size">Tamaño:</label>
                <input type="text" id="size" name="size" required />
            </div>
            <div>
                <label for="stock">Stock:</label>
                <input type="number" id="stock" name="stock" required />
            </div>
            <div>
                <button type="submit">Enviar</button>
            </div>
            </form>
        </div>

    )
}

export default Admin;