import { createSignal, createEffect } from "solid-js";
import '../assets/css/styles.css';
const [checked, setChecked] = createSignal(false);

function DarkModeModal() {
  const darkFunction = () => {
    if( document.body.className.match('darkmode') ) {
      document.body.classList.remove('darkmode')
      window.localStorage.removeItem('darkmode');
    } else {
      document.body.classList.add('darkmode')
      window.localStorage.setItem('darkmode', 'darkmode');
    }
  }

  createEffect(() => {
    if (window.localStorage.getItem('darkmode')) {
      setChecked(true)
      console.log(checked());
    }

  }, []);
  return (
    <div class="modalBox modalConfig openModal" id="config">
        <div class="modalHeader">
            <div class="modalTitle">Configuracion avanzada</div>
          </div>
        <div class="modalContent">
            <ul class="config">
                            <li>
                    <div class="configTitle">Modo nocturno activado permanentemente</div>
                    <div class="configToggle">
                        <label class="switch">
                        { checked() ?
                          <input type="checkbox" data-toggleconfig="darkmode" onClick={darkFunction} checked></input>
                        :
                        <input type="checkbox" data-toggleconfig="darkmode" onClick={darkFunction}></input>
                      }

                            <span class="slider"></span>
                        </label>
                    </div>
                </li>

            </ul>
        </div>
    </div>
  );
}

export default DarkModeModal;
