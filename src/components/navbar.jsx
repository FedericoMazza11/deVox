//SolidJS---------------------|
import { createSignal, createEffect } from "solid-js";
import { Routes, Route, Link } from "@solidjs/router"

//Components---------------------|
import CreateVox from './createVox.jsx'
import Sidebar from './sidebar.jsx'
import CategoryBar from './categoryBar.jsx'
import LoginModal from './loginModal.jsx'
import VoxService from "../services/apiCall.jsx";


//Icons---------------------|
import { FiSearch, FiUser, FiAlignJustify, FiX, FiBox, FiAlertTriangle } from "solid-icons/fi";
import { AiOutlineBell, AiFillBell } from "solid-icons/ai";

function Navbar(){

  //Variables---------------------|
  const [showVoxModal, setShowVoxModal] = createSignal(false);
  const [showUser, setShowUser] = createSignal(false);
  const [showSearchBar, setShowSearchBar] = createSignal(false);
  const [showSidebar, setShowSidebar] = createSignal(false);
  const [showCategoryBar, setShowCategoryBar] = createSignal(false);
  const [showNotification, setShowNotification] = createSignal(false);
  const [showReports, setShowReports] = createSignal(false);
  const [user, setUser] = createSignal(JSON.parse(localStorage.getItem("user")));
  const [reports, setReports] = createSignal('');
  //State functions---------------------|
  createEffect(() => {
    if (window.localStorage.getItem('darkmode')) {
      document.body.classList.add('darkmode')
    }
    //Fetching
    if (JSON.parse(localStorage.getItem("user")) && JSON.parse(localStorage.getItem("user")).userData && JSON.parse(localStorage.getItem("user")).userData.userId) {
      VoxService.getSession({userName:JSON.parse(localStorage.getItem("user")).userData.userId, userPassword: JSON.parse(localStorage.getItem("user")).password})
        .then((res) => {
          if (res.data) {
            localStorage.setItem("user", JSON.stringify(res.data));
            setUser(res.data)
            VoxService.getReports(user().userData.userId).then( response => {
                setReports(response.data)
            });
          } else {
            localStorage.removeItem("user");
            window.location.href = "/";
          }
        }).catch((e) => {});
    } else {
      localStorage.removeItem("user");
    }

  }, []);
  const showSearchBarFunc = () => {
    setShowSearchBar(!showSearchBar())
  }

  function redirectFunc(notification) {
    console.log(notification);
    VoxService.getVox(notification.voxId).then((res) => {
      VoxService.removeNotification({userId: user().userData.userId, voxid: notification.voxId}).then((r) => {
        window.location.href = "/" + res.data[0].category + "/" + res.data[0].filename
    })
  })
}
function redirectFuncReport(notification) {
  VoxService.getVox(notification.voxId).then((res) => {
    VoxService.removeReport({userId: user().userData.userId, voxid: notification.voxId}).then((r) => {
      window.location.href = "/" + res.data[0].category + "/" + res.data[0].filename
  })
})
}
  const showCategoryBarFunc = () => {
    setShowCategoryBar(!showCategoryBar())
    if (showSidebar() === true) {
      setShowSidebar(!showSidebar())
    }
  }
  const searchFunc = (e) => {
      window.location.href = "/search/" + e.target.value
  }
  const showUserFunc = () => {
    setShowUser(!showUser())
  }

  const showVoxModalFunc = () => {
    setShowVoxModal(!showVoxModal())
  }
  const showNotificationFunc = () => {
    setShowNotification(!showNotification())
  }
  const showSidebarFunc = () => {
    setShowSidebar(!showSidebar())
    if (showCategoryBar() === true) {
      setShowCategoryBar(!showCategoryBar())
    }
  }

//HTML---------------------|
  return(
    <>
    {showSidebar() ? (
      <Sidebar />
    ) : (
      ""
    )}
      <nav>
      {showUser() ? (
        <div className="">
          <div
            class="modalBg openModal"
            id="modalBg"
            onClick={showUserFunc}
          ></div>
        </div>
      ) : (
        ""
      )}
        {showVoxModal() ? (
          <div className="">
            <div
              class="modalBg openModal"
              id="modalBg"
              onClick={showVoxModalFunc}
            ></div>
            <CreateVox />
          </div>
        ) : (
          ""
        )}


        <div class="logo unselect">
          <Link href="/">devox</Link>
        </div>
        <ul class="menu unselect" id="navbarMenu">
          <li class="navbarCategories pointer" onClick={showCategoryBarFunc}>
            <div class="categorySelected" >
            {showCategoryBar() ? (
              <CategoryBar/>
            ) : (
              ""
            )}
              <FiBox/> <div class="navCategoryTitle">Categorias</div>
            </div>
          </li>
          {showSearchBar() ? (
            <>
              <li
                class="menuIcon tooltip-bottom mobile"
                onClick={showSearchBarFunc}
              >
                <FiX />
              </li>
              <li class="search">
                <input type="text" id="searchInput" placeholder="Buscar..." onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  searchFunc(e)
                }
              }}></input>
              </li>
            </>
          ) : (
            <li class="menuIcon tooltip-bottom mobile" onClick={showSearchBarFunc}>
              <FiSearch/>
            </li>
          )}

            {user() ?
              user().userData && user().userData.notifications && user().userData.notifications.length ?
              <li class="menuIcon tooltip-bottom mobile" onClick={showNotificationFunc}>
              <AiFillBell />
            </li>
              :
              <li class="menuIcon tooltip-bottom mobile" onClick={showNotificationFunc}>
              <AiOutlineBell />
            </li>

            :
          <li class="menuIcon tooltip-bottom mobile" onClick={showUserFunc}>
            <FiUser />
          </li>}

          {user() && user().userData && reports() && reports().length ?
            <li class="menuIcon tooltip-bottom mobile" style="color: red" onClick={() => setShowReports(!showReports())}>
            <FiAlertTriangle/>
          </li>
          :
            user() && user().userData ?
            <li class="menuIcon tooltip-bottom mobile" onClick={() => setShowReports(!showReports())}>
            <FiAlertTriangle/>
          </li>
          :
          ''
        }

          <li class="menuIcon tooltip-bottom mobile" onClick={showSidebarFunc}>
            <FiAlignJustify />
          </li>
          <li class="newVox" onClick={showVoxModalFunc}>
            INICIAR VOX
          </li>

        </ul>



        {showUser() ? (
          <LoginModal/>
        ) : ("")}

      </nav>
      {showNotification() ? user().userData.notifications && user().userData.notifications.length ?
        <div class="menuModal notifications" id="notificationsList" >
        <ul>
        {
          user().userData.notifications.map((notification) => {
            return (
              <li class="noNotification "><div className="Notification" style="max-height: 75px; display: flex; word-break: break-word; max-width:100%" onClick={() => redirectFuncReport(notification)}><img src={notification.url} style="max-height: 100%; display: flex; border-radius: 6px;"></img><h1  style="padding-left:10px; word-break: break-word; margin: 0;  font-size: 14px;" >{notification.title}<br/><p style="word-break: break-word; margin: 0; font-weight: 100; font-size: 11px;">{notification.description}</p></h1></div></li>
            )
          })
        }
        </ul>
        </div>
          :
          <div class="menuModal notifications" id="notificationsList">
          <ul>
          <li class="noNotification ">No hay notificaciones</li>
          </ul>
          </div>

        :
      ''
    }
        {showReports() ? reports() && user().userData && reports().length ?
          <div class="menuModal notifications" id="notificationsList" >
          <ul>
          {
            reports().map((notification) => {
              return (
                <li class="noNotification "><div className="Notification" style="max-height: 75px; display: flex; word-break: break-word; max-width:100%" onClick={() => redirectFuncReport(notification)}><img src={notification.url} style="max-height: 100%; display: flex; border-radius: 6px;"></img><h1  style="padding-left:10px; word-break: break-word; margin: 0;  font-size: 14px;" >{notification.title}<br/><p style="word-break: break-word; margin: 0; font-weight: 100; font-size: 11px;">{notification.description}</p></h1></div></li>
              )
            })
          }
          </ul>
          </div>
            :
            <div class="menuModal notifications" id="notificationsList">
            <ul>
            <li class="noNotification ">No hay reportes</li>
            </ul>
            </div>
            :
            ''
      }
    </>
  );
}

export default Navbar;
