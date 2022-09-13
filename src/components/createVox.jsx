//SolidJS---------------------|
import { createSignal, createEffect } from "solid-js";
import toast, { Toaster } from 'solid-toast';

//Icons---------------------|
import { FiBarChart2, FiPaperclip, FiLayers, FiX, FiPlus,  } from "solid-icons/fi";

//Styles---------------------|
import '../assets/css/styles.css';

//Services---------------------|
import VoxService from "../services/apiCall.jsx";
import CategoryServices from "../services/categoriesService.jsx";

function CreateVox() {
  //Variables---------------------|
  const [termAccepted, setTermAccepted] = createSignal(false);
  const [processedUser, setProcessedUser] = createSignal(false);
  const [errorVox, setErrorVox] = createSignal(null);
  const [voxDetails, setVoxDetails] = createSignal({
    voxCategory: "",
    voxTitle: "",
    voxDescription: "",
    voxImage: null,
    voxUrl: "",
    urlType: "",
    voxSource: null,
    preview: null,
    username: null
  });
  var user = JSON.parse(localStorage.getItem("user"));



  //State Functions---------------------|
  const termAcceptedFunc = async () => {
    setTermAccepted(!termAccepted())
    const data = await VoxService.postSession();
    if (data.data) {
      await localStorage.setItem("user", JSON.stringify(data.data));
      window.location.href = "/"
    }
    else {
      toast.error('Ocurrio un error por parte del servidor, proba de nuevo mas tarde', {
className: 'border-2 border-gray-600',
style: {
  background: '#1f2937',
  color: '#f3f4f6'
},

    });

    }

  };

  function extractVideoID(url) {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    if (match && match[7].length == 11) {
      return match[7];
    } else {
      return false
    }
  }

  const urlValidationFunc = (e) => {
    setVoxDetails({ ...voxDetails(), voxUrl: e.target.value })
    if (/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g.test(voxDetails().voxUrl)) {
       setVoxDetails({ ...voxDetails(), urlType: 'image'})
    } else if (/^(?:https?:)?(?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9\_-]{7,15})(?:[\?&][a-zA-Z0-9\_-]+=[a-zA-Z0-9\_-]+)*$/g.test(voxDetails().voxUrl)) {
      if (extractVideoID(voxDetails().voxUrl)) {
        setVoxDetails({ ...voxDetails(), voxUrl: extractVideoID(voxDetails().voxUrl) })
        setVoxDetails({ ...voxDetails(), urlType: 'youtube'})
      }
    }

  }

  const submitHandler = async (e) => {
    e.preventDefault();
    var errors = [];
    if (!voxDetails().voxSource) {
      errors.push('No se ingreso ninguna imagen o video')
    }
    if (voxDetails().voxSource === 'file') {
      var voxFormat = voxDetails().voxImage.name.split('.').pop().toLowerCase()
    }

    if ((voxDetails().voxSource === 'file') && (voxFormat != 'png') && (voxFormat != 'gif') && (voxFormat != 'jpg') && (voxFormat != 'jpeg')) {
      errors.push('El formato no esta sorportado')
    }

    if ((voxDetails().voxSource === 'url') && (voxDetails().urlType == '')) {
      errors.push('URL invalido')
    }

    if (!voxDetails().voxTitle || voxDetails().voxTitle > 120) {
      errors.push('Titulo invalido')
    }
    if (!voxDetails().voxDescription || voxDetails().voxDescription > 50000) {
      errors.push('Descripcion invalida')
    }
    if (!voxDetails().voxCategory || voxDetails().voxCategory > 39 || voxDetails().voxCategory < 1) {
      errors.push('Categoria invalida')
    }
    if (errors.length > 0) {
      errors.forEach((item, i) => {
        toast.error(item, {
  className: 'border-2 border-gray-600',
  style: {
    background: '#1f2937',
    color: '#f3f4f6'
  },

      });
    })
    } else {
       setVoxDetails({ ...voxDetails(), username: user.userData.userId})
          var data = await VoxService.postVox(
            voxDetails()
          )
          if (data.data && data.data.errors) {
            data.data.errors.forEach((item, i) => {
              toast.error(item, {
        className: 'border-2 border-gray-600',
        style: {
          background: '#1f2937',
          color: '#f3f4f6'
        },

            });
          })
          } else {
            window.location.href = "/" + CategoryServices.categoryFilter(data.data.category)[0] + "/" + data.data.filename
          }
    }
  };

  const uploadFiles = () => {
    document.getElementById('imgUpload').click()
  }

  return (
    <>
    <Toaster/>
      {user ? (
        <>
        <div >
        <form class="modalBox createVox openModal" id="verify" onSubmit={submitHandler}>
        {errorVox() ?
            <div>{errorVox()}</div>

          : ''}
          <select name="niche" onChange={(e) =>
            setVoxDetails({ ...voxDetails(), voxCategory: e.target.value })
          }>
            <option value="" selected="selected">
              Elige una categoría
            </option>
            <optgroup label="Ciencias e informatica">
            <option value="29">Ciencia</option>
            <option value="8">Descargas</option>
            <option value="28">Programacion</option>
            <option value="30">Tecnologia</option>
            </optgroup>
            <optgroup label="Humanidades">
            <option value="2">Arte</option>
            <option value="39">Humanidades</option>
            <option value="37">Literatura</option>
            <option value="38">Lugares</option>
            <option value="18">Historia</option>
            <option value="12">Gastronomia</option>
            </optgroup>
            <optgroup label="TV Y Series">
            <option value="1">Anime</option>
            <option value="6">Cine y TV</option>
            <option value="32">Youtube</option>
            </optgroup>
            <optgroup label="General">
            <option value="5">Consejos</option>
            <option value="13">General</option>
            <option value="17">Historias</option>
            <option value="27">Preguntas</option>
            <option value="25">Paranormal</option>
            </optgroup>
            <optgroup label="Politica">
            <option value="35">Noticias</option>
            <option value="26">Politica</option>
            <option value="9">Economia</option>
            </optgroup>
            <optgroup label="Varios">
            <option value="14">Juegos</option>
            <option value="34">Musica</option>
            <option value="20">Humor</option>
            </optgroup>
            <optgroup label="Deportes">
            <option value="3">Autos</option>
            <option value="7">Deportes</option>
            <option value="11">Fitness</option>
            <option value="16">Gimnasio</option>
            <option value="33">Salud</option>
            </optgroup>
            <optgroup label="Internacional">
            <option value="19">Internacional</option>
            <option value="4">Random Internacional</option>
            </optgroup>
            <optgroup label="Off Topic">
            <option value="24">Omniverso</option>
            <option value="10">Soy mujer</option>
            <option value="36">Normies</option>
            <option value="31">Random</option>
            </optgroup>
            <optgroup label="Pornografia y Gore">
            <option value="22">Pornografia</option>
            <option value="15">Gore</option>
            <option value="23">Fetiches</option>
            <option value="21">LGBT</option>
            </optgroup>
          </select>
          <input
            name="title"
            type="text"
            placeholder="Titulo"
            maxlength="120"
            onChange={(e) =>
            setVoxDetails({ ...voxDetails(), voxTitle: e.target.value })
          }
          ></input>
          <div class="selectAttach" id="voxAttachs">
            <div class={voxDetails().voxSource === 'file' ? "uploadFromLocalActive tooltip-bottom" :
          "uploadFromLocal tooltip-bottom"} onClick={uploadFiles}>
              <FiLayers/>
            </div>
            <input type="file" id="imgUpload" name="img" hidden accept="image/gif, image/jpeg, image/jpg, image/png"

            onChange={(e) =>
            setVoxDetails({ ...voxDetails(), voxImage: e.target.files[0], voxSource: 'file', preview: URL.createObjectURL(e.target.files[0]), voxUrl: '', urlType: '' })
          }/>
            <div class={voxDetails().voxSource === 'url' ? "uploadFromLocalActive tooltip-bottom" :
          "uploadFromLocal tooltip-bottom"} onclick={(e) => setVoxDetails({ ...voxDetails(), voxImage: null, voxSource: 'url', preview: null})}>
              <FiPaperclip/>
            </div>
          </div>

          {voxDetails().voxSource === 'file' ?
          <div div class="preview" id="previewInputVox">
            <div class="closePreview" onClick={(e) => setVoxDetails({ ...voxDetails(), voxImage: null, voxSource: null, preview: null})}>
              <FiX/>
            </div>
            <img
              src={voxDetails().preview}
              alt=""
            ></img>
          </div>
           :
        ''}


           {voxDetails().voxSource === 'url' ?
           <>
           <input
             name="url"
             type="url"
             placeholder="Actualmente se aceptan imagenes y videos de Youtube"
             maxlength="220"
             onChange={(e) =>
            urlValidationFunc(e)
           }
           ></input>
           <div div class="preview" id="previewInputVox">
           {voxDetails().urlType === 'image' ?
           <img src={voxDetails().voxUrl} alt=""></img>
            : ''}
            {voxDetails().urlType === 'youtube' ?
            <figure class="commentAttach">
            <iframe width="100%" src={"https://www.youtube.com/embed/" + voxDetails().voxUrl + "?autoplay=1"} frameborder="0" allow="accelerometer;  encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>
            </figure>

             : ''}
           </div>


           </>
            : ''}


          <textarea
            name="content"
            class="newVoxContent"
            id="voxTextarea"
            maxlength="5000"
            placeholder="Escribe el contenido del vox o pega una imagen..."
            onChange={(e) =>
            setVoxDetails({ ...voxDetails(), voxDescription: e.target.value })
          }
          ></textarea>
          <div class="subtitle pointer" data-toggle="polls">
            <span class="subtitleText">
              <FiBarChart2/>Encuesta
            </span>
            <span class="subtitleToggle">
              <FiPlus/>
            </span>
          </div>
          <div class="polls hide" id="polls">
            <input
              type="text"
              name="pollOne"
              maxlength="50"
              placeholder="Opcion 1"
            ></input>
            <input
              type="text"
              name="pollTwo"
              maxlength="50"
              placeholder="Opcion 2"
            ></input>
          </div>

          <button class="buttonPress" id="newVox" type="submit">
            <span>Iniciar vox</span>
          </button>
          </form>
        </div>
        </>
      ) : (
        <div class="modalBox verify openModal" id="verify">
          <h1>Reglas</h1>
          <p>
            Las condiciones de acceso y uso a Devox.eth se rige por las leyes
            del Estado de Israel. Los Usuarios se comprometen a hacer un uso
            legal y responsable de la plataforma y aceptar sus términos y
            condiciones. No se permiten conductas que vayan contra las leyes,
            los derechos e intereses de terceros. Devox.eth se reserva el
            derecho de hacer llegar a la justicia y/u organismo de seguridad
            todo aquel material de origen dudoso y/o sensible que considere
            contrario a derecho. Si no está de acuerdo podrá dejar de utilizar
            los servicios del sitio.
          </p>
          <li class="newVox padding20" onClick={termAcceptedFunc}>
            Aceptar y continuar
          </li>
          <span class="conditions">
            Al aceptar este mensaje te estas comprometiendo a respetar las
            normas del sitio y sus Terminos y Condiciones-
          </span>
        </div>
      )}
    </>
  );
}


export default CreateVox;
