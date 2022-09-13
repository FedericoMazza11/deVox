//SolidJS---------------------|
import { createSignal, createEffect } from "solid-js";
import toast, { Toaster } from 'solid-toast';

//Styles---------------------|
import '../assets/css/styles.css';

//Components---------------------|
import DarkModeModal from './darkModeModal.jsx'
import HiddenWordsModal from './hiddenWordsModal.jsx'
import HiddenCategoriesModal from './HiddenCategoriesModal.jsx'
import CreateVox from './createVox.jsx'

//Icons---------------------|
import { FiFileText, FiUserX, FiBox, FiEdit3, FiEyeOff, FiChevronsRight, FiUsers } from "solid-icons/fi";

function Sidebar() {

  //Variables---------------------|
  var user = JSON.parse(localStorage.getItem("user"));
  const [showOptions, setShowOptions] = createSignal(false);
  const [showWords, setShowWords] = createSignal(false);
  const [showCategories, setShowCategories] = createSignal(false);
  const [showVoxModal, setShowVoxModal] = createSignal(false);



  //Functions---------------------|
  const logOutFunc = async () => {
    await localStorage.removeItem("user");
    window.location.href = "/";
  }

  const tokenFunc = async () => {
    toast(
      'Token: ' + user.userData.userId + ' ||| Contraseña: ' + user.password,
  {
    duration: 1300,
    className: 'border-2 border-gray-600',
style: {
  background: '#1f2937',
  color: '#f3f4f6'
},
  }
)
    console.log(user.password);
    console.log(user.userData.userId);
  }

  return (
    <>
    <Toaster/>
    <div class="slideMenu unselect" id="slideMenu">
      <ul class="slideMenuOptions">

      {user ?
        <>
        <li class="optionsTitle">Sesion</li>
      <li onClick={tokenFunc}>
        <div class="optionIcon">
          <FiFileText/>
        </div>
        <div class="optionText">Ver token</div>
      </li>
      <li onClick={logOutFunc}>
        <div class="optionIcon">
          <FiUserX/>
        </div>
        <div class="optionText">Cerrar sesion</div>
      </li>
        <li class="optionsTitle">Voxs</li>
      <li onClick={(e) => setShowVoxModal(!showVoxModal())}>
        <div class="optionIcon">
          <FiBox/>
        </div>
        <div class="optionText">Iniciar vox</div>
      </li>
      <li class="optionsTitle">Plataforma</li>
      <li onClick={(e) => setShowWords(!showWords())}>
        <div class="optionIcon">
          <FiEdit3/>
        </div>
        <div class="optionText">Palabras ocultas</div>
      </li>
      <li onClick={(e) => setShowCategories(!showCategories())}>
        <div class="optionIcon">
          <FiEyeOff/>
        </div>
        <div class="optionText">Categorias ocultas</div>
      </li>
      <li onClick={(e) => setShowOptions(!showOptions())}>
        <div class="optionIcon">
          <FiChevronsRight/>
        </div>
        <div class="optionText" >Configuracion avanzada</div>
      </li>
      </>
      :
      <>
        <li class="optionsTitle">Ingreso</li>
        <li onClick={(e) => setShowVoxModal(!showVoxModal())}>
          <div class="optionIcon">
            <FiUsers/>
          </div>
          <div class="optionText">Iniciar sesion</div>
        </li>
        </>
      }

      {
        showOptions() ?
        <div className="">
          <div
            class="modalBg openModal"
            id="modalBg"
            onClick={(e) => setShowOptions(!showOptions())}
          ></div>
          <DarkModeModal/>
        </div>

        : ''
      }
      {
        showWords() ?
        <div className="">
          <div
            class="modalBg openModal"
            id="modalBg"
            onClick={(e) => setShowWords(!showWords())}
          ></div>
          <HiddenWordsModal/>
        </div>

        : ''
      }
      {
        showCategories() ?
        <div className="">
          <div
            class="modalBg openModal"
            id="modalBg"
            onClick={(e) => setShowCategories(!showCategories())}
          ></div>
          <HiddenCategoriesModal/>
        </div>

        : ''
      }
      {showVoxModal() ? (
        <div className="">
          <div
            class="modalBg openModal"
            id="modalBg"
            onClick={(e) => setShowVoxModal(!showVoxModal())}
          ></div>
          <CreateVox />
        </div>
      ) : (
        ""
      )}

      </ul>
    </div>

      </>
  );
}

export default Sidebar;
