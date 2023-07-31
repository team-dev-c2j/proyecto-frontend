import { useForm } from "react-hook-form";
import "../../styles/contacto.css";
import { contactoRequest } from "../api/contacto";

const Contacto = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset, // Agrega el método reset
  } = useForm();

  const onSubmit = handleSubmit(async (values) => {
    contactoRequest(values);
    alert("Mensaje enviado con éxito");
    reset(); // Resetea el formulario después del envío exitoso
  });

  return (
    <div className="contactoForm">
      <h2>Contacto</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="user">User</label>
          <br />
          <input type="text" {...register("name", { required: true })} />
          {errors.username && <p className="error">Ingresar un nombre</p>}
        </div>
        <div>
        <label htmlFor="telefono">Telefono</label><br/>
        <input
            type="text" // Usamos "text" en lugar de "number"
            inputMode="numeric" // Añadimos el atributo inputMode para indicar que es un campo numérico
            pattern="[0-9]*" // Añadimos un patrón para permitir solo caracteres numéricos
            {...register("telefono", { required: true })}
        />
        {errors.telefono && <p className="error">Ingresar un telefono</p>}
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <br />
          <input type="email" {...register("email", { required: true })} />
          {errors.password && <p className="error">Ingresar un email</p>}
        </div>

        <div>
          <label htmlFor="mensaje">Mensaje</label>
          <br />
          <textarea
            className="mensajeInput"
            {...register("mensaje", { required: true })}
            rows="4"
            cols="50"
          />
          {errors.mensaje && <p className="error">Ingresar un mensaje</p>}
        </div>
        <button type="submit" className="btn btn-outline-info">
          Ingresar
        </button>
      </form>
    </div>
  );
};

export default Contacto;
