import { createSignal, createEffect } from "solid-js";
import '../assets/css/styles.css';
import VoxService from "../services/apiCall.jsx";
const [words, setWords] = createSignal('');
const [user, setUser] = createSignal(JSON.parse(localStorage.getItem("user")));
import toast, { Toaster } from 'solid-toast';

function HiddenWordsModal() {

  const saveFunc = () => {
    VoxService.postHiddenWords({words: words().split(','), user: user(), word: words()})
      .then((res) => {
        if (res.data.errors) {
          res.data.errors.forEach((item, i) => {
            toast.error(item, {
      className: 'border-2 border-gray-600',
      style: {
        background: '#1f2937',
        color: '#f3f4f6'
      }})}) } else {
        window.location.reload()
      }
      }).catch((e) => {});

  }


  return (
    <>
    <Toaster/>
    <div class="modalBox modalConfig openModal" id="hiddenWords">

    <div class="modalHeader">
    <div class="modalTitle">Palabras ocultas</div>
    </div>
    <div class="modalContent">
    <div class="hiddenWords">
    <textarea id="hiddenWordsTextarea" placeholder="Indica una lista de palabras separadas por una coma. (sin espacios) Ej: anon,multi,normie,.." onChange={(e) => setWords(e.target.value)} value={user().userData.hiddenWords}></textarea>
    <button class="buttonPress" id="hiddenWordsSubmit" type="submit" onClick={saveFunc}>
    <span >Guardar</span>
    </button>
    </div>
    </div>
    </div>
    </>
  );
}

export default HiddenWordsModal;
