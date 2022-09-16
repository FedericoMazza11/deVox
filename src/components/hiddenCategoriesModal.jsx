import { createSignal, createEffect } from "solid-js";
import '../assets/css/styles.css';
import VoxService from "../services/apiCall.jsx";
const [words, setWords] = createSignal('');
const [user, setUser] = createSignal(JSON.parse(localStorage.getItem("user")));
const [categ, setCateg] = createSignal(JSON.parse(localStorage.getItem("hiddenCategories")));
import toast, { Toaster } from 'solid-toast';

function HiddenCategoriesModal() {

  const saveFunc = () => {
    VoxService.postHiddenCategories({words: words().split(','), user: user(), word: words()})
      .then((res) => {
        if (res.data.errors) {
          res.data.errors.forEach((item, i) => {
            toast.error(item, {
      className: 'border-2 border-gray-600',
      style: {
        background: '#1f2937',
        color: '#f3f4f6'
      }})}) } else {
        localStorage.setItem('hiddenCategories', JSON.stringify(words()))
        window.location.reload()


      }
      }).catch((e) => {});

  }


  return (
    <>
    <Toaster/>
    <div class="modalBox modalConfig openModal" id="hiddenWords">
    <div class="modalHeader">
    <div class="modalTitle">Categorias ocultas</div>
    </div>
    <div class="modalContent">
    <div class="hiddenWords">
    <textarea id="hiddenWordsTextarea" placeholder="Indica una lista de categorias separadas por una coma y en mayuscula. (sin espacios) Ej: NRM,OMN,UFF,.." onChange={(e) => setWords(e.target.value)} value={categ()}></textarea>
    <button class="buttonPress" type="submit" onClick={saveFunc}>
    <span >Guardar</span>
    </button>
    </div>
    </div>
    </div>
    </>
  );
}

export default HiddenCategoriesModal;
