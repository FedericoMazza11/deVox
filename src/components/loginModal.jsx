//SolidJS---------------------|
import { createSignal } from "solid-js";
//Styles---------------------|
import '../assets/css/styles.css';

//Services---------------------|
import VoxService from "../services/apiCall.jsx";


function LoginModal() {
  const [userDetails, setUserDetails] = createSignal({
    userName: "",
    userPassword: "",
  });
  const loginFunc = async (e) => {
    e.preventDefault();
    if (userDetails().userName.length === 36 && userDetails().userPassword.length === 36) {
      const data = await VoxService.getSession(userDetails());
      if(data.data.userId) {
        await localStorage.setItem("user", JSON.stringify(data.data));
        window.location.href = "/";
      } else {
        swal({
          title: data.data,
          icon: 'error',
          timer: 1500,
        })
      }
    } else {
      swal({
        title: 'Token invalido o contraseña incorrecta',
        icon: 'error',
        timer: 1500,
      })
    }


  };

  return (
    <div class="modalBox accountModal openModal" id="accountModal">
        <div class="modalSelector">
            <div class="selectorOption unselect selectedOption" data-selector="login">Iniciar Sesion</div>
        </div>
        <form class="modalSection login" id="login" onSubmit={loginFunc}>


            <input type="text" name="username" placeholder="Token de usuario"
            onChange={(e) =>
              setUserDetails({ ...userDetails(), userName: e.target.value })
            }></input>


            <input type="password" name="password" placeholder="Contraseña"
            onChange={(e) =>
              setUserDetails({ ...userDetails(), userPassword: e.target.value })
            }> </input>
            <button type="submit" class="buttonPress">Entrar</button>
        </form>
    </div>
  );
}

export default LoginModal;
