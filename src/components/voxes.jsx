//SolidJS---------------------|
import { createSignal, createEffect } from "solid-js";
import { Routes, Route, Link, useParams } from "@solidjs/router"

//Services---------------------|
import VoxService from "../services/apiCall.jsx";
import CategoryServices from "../services/categoriesService.jsx";
import { makeIntersectionObserver } from '@solid-primitives/intersection-observer';


//Icons
import { FiPlus, FiMessageCircle } from "solid-icons/fi";
//import { ImBubble } from "solid-icons/im";

//Components---------------------|
import CreateVox from './createVox.jsx'



function Voxes() {
  const [voxesTotal, setVoxesTotal] = createSignal(null);
  const [voxes, setVoxes] = createSignal(null);
  const [voxesIndex, setVoxesIndex] = createSignal(50);
  const [showVoxModal, setShowVoxModal] = createSignal(false);
  const [categoryUrl, setCategoryUrl] = createSignal('');
  const [user, setUser] = createSignal(JSON.parse(localStorage.getItem("user")));
  const [voxIndex, setVoxIndex] = createSignal(80);

  createEffect(() => {
    document.title = 'Devox'
    if (useParams().id && CategoryServices.categoryURLDecoder(useParams().id)[0] !== 0) {
      setCategoryUrl(useParams().id)
      document.title = 'Devox | ' + CategoryServices.categoryURLDecoder(useParams().id)[1]
    }
    if (useParams().title) {
      VoxService.searchVoxes(useParams().title)
        .then((res) => {
          setVoxesTotal(res.data);
          voxesIndexFunc(0, 40)
        })
        .catch((e) => {});


    } else if (useParams().id) {
      VoxService.getVoxes(useParams().id)
        .then((res) => {
          setVoxesTotal(res.data);
          voxesIndexFunc(0, 40)
        })
        .catch((e) => {});


    } else {
      if (user()) {

      } else {
        setUser("")
      }

      VoxService.findVoxes(user())
        .then((res) => {
          setVoxesTotal(res.data);
          voxesIndexFunc(0, 40)
        })
        .catch((e) => {});

    }

  }, []);

  const voxesIndexFunc = async (s, e) => {
    var voxesArr = []
    for (var j = s; j < e; j++) {
        if (voxesTotal()[j]) {
          voxesArr.push(voxesTotal()[j]);
        }
    }
    setVoxes(voxesArr)
  }

    const showVoxModalFunc = () => {
      setShowVoxModal(!showVoxModal())
    }


    const addVoxes = async (e) => {
      if (e.isIntersecting) {
        voxesIndexFunc(0, voxIndex())
        setVoxIndex(voxIndex() + 40)
      }
    }


    const { add: intersectionObserver } = makeIntersectionObserver([], entries => {
      entries.forEach(e => addVoxes(e));
    });


  //HTML---------------------|
  return (
    <>
    <div class="bottonContextual" onClick={showVoxModalFunc}><FiPlus/></div>
    {showVoxModal() ? (
      <div class="">
        <div
          class="modalBg openModal modalBlack"
          id="modalBg"
          onClick={showVoxModalFunc}
        ></div>
        <CreateVox />
      </div>
    ) : (
      ""
    )}
      <main>
        {voxes() ? (
          <div class="voxList" id="voxList">
            <a
            href="/about"
              class="vox newInVoxed"
              style={"background: url(../public/" + categoryUrl() + "devoxLogo.jpg"}
            >
              <div class="voxHeader">
                <div class="tagList">
                  <div class="tag sticky">Info y Reglas</div>
                </div>
              </div>
              <h4 class="title textShadon">¿Nuevo en Devox?</h4>
              <div class="over"></div>
            </a>

            {voxes() ?
              <>
              {voxes().map((vox) => {
                return (
                  <Link
                    class="vox"
                    href={'/' + CategoryServices.categoryFilter(vox.category)[0] + '/' + vox.filename}
                    style={  vox.isURL ? vox.fileExtension == 'video' ? 'background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.3)), url(https://img.youtube.com/vi/' + vox.url + '/0.jpg)'
                      : 'background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.3)), url(' + vox.url + ')'
                    : "background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.3)), url(../backgrounds/low-res_" + vox.filename +".jpeg);"}
                  >
                    <div class="voxHeader">
                      <div class="tagList">
                        <div class="tag categoryTag">{CategoryServices.categoryFilter(vox.category)[0]}</div>
                        {console.log()}
                        {Date.now() < (Date.parse(vox.date) + 1000 * 10 * 60)?
                          <div class="tag new">Nuevo</div>
                        :
                        ''
                      }
                      </div>



                      <div class="voxComments textShadon">
                        <FiMessageCircle/>
                        <span class="countComments">{vox.commentsCount}</span>
                      </div>
                    </div>

                    <h4 class="title textShadon">
                      {vox.title}
                    </h4>
                    <div class="over"></div>
                  </Link>
                )
              })}
              <div use:intersectionObserver></div>
              </>
              :
              ''
            }
          </div>
        ) : (
          ""
        )}
      </main>
    </>
  );
}

export default Voxes;
