//SolidJS---------------------|

//Services---------------------|
import { FiUsers, FiHome, FiShield, FiMessageCircle  } from "solid-icons/fi";

import './assets/css/styles.css';
import Navbar from './components/navbar.jsx'


function About() {
  return (
    <>
    <Navbar/>
      <main>

        <section class="infoWrap">
          <section class="infoMenu">
            <ul>
              <li class="infoMenuSection">
                <div class="infoMenuIcon">
                  <FiHome/>
                </div>
                <div class="infoMenuText">Plataforma</div>
              </li>
              <a href="#home">
                <li>
                  <div class="infoMenuText">Pagina principal</div>
                </li>
              </a>
              <a href="#voxs">
                <li>
                  <div class="infoMenuText">Voxs</div>
                </li>
              </a>
              <a href="#categorias">
                <li>
                  <div class="infoMenuText">Categorias</div>
                </li>
              </a>
              <a href="#configuracion">
                <li>
                  <div class="infoMenuText">Configuracion</div>
                </li>
              </a>
              <a href="#reglas">
                <li>
                  <div class="infoMenuText">Reglamento</div>
                </li>
              </a>
              <li class="infoMenuSection">
                <div class="infoMenuIcon">
                  <FiUsers/>
                </div>
                <div class="infoMenuText">Membresias</div>
              </li>
              <a href="#donar">
                <li>
                  <div class="infoMenuText">¿Que son las membresias?</div>
                </li>
              </a>
              <a href="#tokens">
                <li>
                  <div class="infoMenuText">Tokens</div>
                </li>
              </a>
              <a href="#membresia">
                <li>
                  <div class="infoMenuText">Obtener membresia</div>
                </li>
              </a>
              <li class="infoMenuSection">
                <div class="infoMenuIcon">
                  <FiShield/>
                </div>
                <div class="infoMenuText">Ayuda</div>
              </li>
              <a href="#bajas">
                <li>
                  <div class="infoMenuText">Bajas de contenido</div>
                </li>
              </a>
              <a href="#terminos">
                <li>
                  <div class="infoMenuText">Terminos y condiciones</div>
                </li>
              </a>
            </ul>
          </section>
          <section class="infoContent">
            <div class="infoContentWrap">
              <h1>¡Bienvenido a Devox!</h1>
              <p>
                Devox es una plataforma web en donde podes interactuar con otros
                usuarios de forma anónima. La información se ordena en
                <b>voxs</b>, que sirven como canal de comunicación entre los
                usuarios
              </p>
              <h3 id="home">Pagina principal 🏡</h3>
              <div class="sectionDivider">
                <div class="sectionLeft">
                  <p>
                    En la pagina principal se muestran los ultimos voxs con
                    actividad, contando como primer actividad el momento su
                    creacion, que lo posiciona en el primer lugar de la lista.
                    Cuando otro vox es comentado este se posciona en el primer
                    lugar, y desplaza un lugar al vox creado anteriomente.
                  </p>
                  <p>
                    De esta manera, los voxs que aparecen cómo primeros, son
                    aquellos que fueron creados o comentados recientemente.
                  </p>
                  <p>
                    Una vez superados los 500 comentarios el vox ya no volvera a la
                    primer posicion de la lista.
                  </p>
                </div>
                <div class="sectionRight">
                  <img
                    src="../public/vox_home.webp"
                    alt=""
                  >
                  </img>
                </div>
              </div>
              <h3 id="voxs">Voxs</h3>
              <div class="sectionDivider">
                <div class="sectionLeft indexVoxContainer">
                  <div
                    class="vox"
                    id="test"
                    style="background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.3)), url(../public/devoxLogo.jpg);"
                  >
                    <div class="voxHeader">
                      <div class="tagList">
                        <div class="tag categoryTag">OFF</div>
                        <div class="tag new">Nuevo</div>
                      </div>
                      <div class="voxComments textShadon">
                        <FiMessageCircle/>
                        <span class="countComments">472</span>
                      </div>
                      <div class="voxAction textShadon">
                        <div class="actionBotton" data-voxaction="test">

                        </div>
                      </div>
                    </div>
                    <h4 class="title textShadon">¡Bienvenido a devox!</h4>
                    <div class="over"></div>
                    <div class="voxActions unselect">
                      <div class="voxActionBotton">
                        <div class="actionText" data-action="close">
                          Ocultar
                        </div>
                      </div>
                      <div class="voxActionBotton">
                        <div class="actionText" data-action="close">
                          Favorito
                        </div>
                      </div>
                      <div class="voxActionBotton">
                        <div class="actionText" data-action="close">
                          Reportar
                        </div>
                      </div>
                      <div class="voxActionBotton">
                        <div class="actionText" data-action="close">

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="sectionRight">
                  <div>
                    <p>
                      Cada vox cuenta con un título, el cual define el tema sobre el
                      que se va a hablar junto a una imagen o video y una
                      descripción que hagan alusión a dicho tema.
                    </p>
                    <p>
                      Dentro de los voxs, los usuarios tienen la posibilidad de
                      comentarlo, pudiendo agregar una imagen, un video.
                    </p>
                    <p>
                      Cada comentario cuenta con un identificador alfanumerico de 7
                      caracteres llamado "ID", que sirve para identificar ese
                      comentario y responderle. Ejemplo:
                      <span class="commentTag">LMD2FZ3</span>
                    </p>

                  </div>
                </div>
              </div>
              <h3 id="categorias">Categorias</h3>
              <p>
                Los voxs estan ordenados en diferentes categorías, a las cuales
                podes acceder individualmente desde la lista que se encuentra en la
                barra superior.
              </p>
              <p>
                En la home se muestran por defecto todas las categorías exceptuando
                las de contenido sensible, pero haciendo uso de la herramienta que
                se encuentra en la barra superior, podes filtrar las categorias que
                quieras ver en la pagina principal.
              </p>
              <p>
                Cada categoria tiene un maximo de almacenamiento de 400 voxs, cuando
                un vox cae por debajo de la posición numero 400 en actividad se
                elimina por falta de actividad y deja espacio para la creación de
                nuevos voxs.
              </p>
              <h3 id="configuracion">Configuracion ⚙</h3>
              <p>
                Devox posee varias herramientas que podes configurar a tu gusto,
                para hacer mas cómoda tu navegación en la plataforma. Para acceder a
                ellas tenes que ir al menu y luego a la opcion de Configuracion
                avanzada
              </p>
              <h3 id="reglas">Reglamento 📜</h3>
              <ul class="rules">
                <li>
                  No se permite pedir o compartir información de otras personas sin
                  su consentimiento.
                </li>
                <li>No se permite el flood.</li>
                <li>No se permite la utilización de acortadores de url.</li>
                <li>No se permite la utilización de Proxy/VPN.</li>
              </ul>
              <p>
                <b>No iniciar voxs que:</b>
              </p>
              <p>Contengan una portada que no tenga relación el tema del vox.</p>
              <p>
                Contengan una portada de sexo explícito o gore sin estar en sus
                respectivas categorías: /nsfw/ y /gore/.
              </p>
              <p>
                <b>¿Que voxs se borran?</b>
              </p>
              <p>
                En Devox muy pocos voxs se terminan borrando, la mayoría tienen una
                categoría, y los que no son mandados a /uff/, lo que hace que la
                mayoría no se borre.
              </p>
              <p>
                <b>Los voxs que se borran son:</b>
              </p>
              <ul class="rules">
                <li>
                  Cualquier vox que muestre imágenes de menores de edad, o edad
                  dudosa, desnudas, o en posiciones sexuales, al igual que los voxs
                  que pidan este tipo de material, o hagan “guiños” con el mismo
                  fin.
                </li>
                <li>
                  Voxs donde se pida o comparta información acerca de compraventa de
                  armas, drogas, organos, trafico de personas, o cualquier otra
                  actividad penada por la ley Argentina o local de quien publique.
                </li>
                <li>Voxs los cuales tengan fotos de personas que pidan la baja.</li>
                <li>
                  Voxs que contengan información privada de cualquier persona:
                  numeros telefonicos, dni, direcciones, nombres de parientes, etc.
                </li>
                <li>
                  Eventualmente los Janitors desactivan los shitposting que se
                  encuentren fuera de /uff/, al no tener la posibilidad de moverlos
                  de categoría. Se puede enviar un reporte (uno, no diez) pidiendo
                  que se reactive y se mande a /uff/.
                </li>
              </ul>
              <h3 id="donar">¿Hay membresias?</h3>
              <p>
                Se planea implementar el sistema de membresias en futuras actualizaciones del sitio.
              </p>
              <b>Con las membresias podras: </b>
              <ul class="rules">
                <li>
                  <b>Editar tus voxs </b>
                  vas a poder modificar tus voxs para corregir errores ortograficos o incluso añadir otra imagen o enlace.
                </li>
                <li>
                  <b>Pinear comentarios en tus voxs: </b>
                  Podras  destacar un comentarios en tus voxs para que este aparezca al inicio del mismo.
                </li>
                <li>
                  Subir archivos de hasta:
                  <b>10MB</b>.
                </li>
                <li>
                  <b>Ayudar al mantenimiento de Devox: </b>
                  con tu donacion estas contribuyendo a mantener los costes de los
                  servidores de Devox!
                </li>
                <li>
                  <b>Enviar un mensaje global: </b>
                  con tu donacion recibiras cubos que te permitiran enviar mensajes
                  globales.
                </li>
              </ul>
              <h3 id="tokens">Cubos 🧊</h3>
              <p>
                Los cubos te seran otorgados por hacer donaciones al sitio, con los
                mismos podras enviar mensajes globales que apareceran en todos los
                voxs debajo de la caja de comentarios.
              </p>
              <h3 id="bajas">Baja de contenido</h3>
              <p>
                Los pedidos de baja pueden darse en situaciones las cuales, el
                contenido publicado infrinja los derechos de autor, o contenta
                imágenes o información personal de alguien.
              </p>
              <b>¿Quienes pueden pedir la baja de contenido del sitio?</b>
              <p>
                La baja puede ser pedida por la persona afectada, un familiar o
                representante legal.
              </p>
              <b>¿Todos los pedidos de baja son aceptados?</b>
              <p>
                No, para que una baja sea aceptada debes cumplir con algunos
                requisitos:
              </p>
              <ul class="rules">
                <li>
                  El contenido debe afectarte directamente a vos o a un familiar
                  tuyo.
                </li>
                <li>
                  Se debe certificar la identidad de quien pide la baja por medio de
                  una foto del documento, cédula o registro de conducir. No se
                  aceptarán bajas de personas que no se identifiquen.
                </li>
                <li>
                  En caso de fotos, deben poder distinguirse personas o hechos que
                  puedan involucrar a las mismas en cuanto a su honor o privacidad.
                </li>
              </ul>
              <b>¿Cómo realizo un pedido de baja?</b>
              <p>
                Debes enviar un email a <b>devox.eth@proton.me</b>, con el título
                "Pedido de Baja", donde se debe incluir:
              </p>
              <ul class="rules">
                <li>Documentación que certifique la identidad del denunciante.</li>
                <li>URL de los voxs donde se encuentre el contenido a reportar.</li>
                <li>
                  Si el contenido está en uno o más comentarios, se debe aclarar
                  cuál es el ID de cada comentario
                </li>
                <li>Motivo de la denuncia</li>
                <li>Relación con la persona afectada</li>
              </ul>
              <b>¿Cuanto tiempo tardan en responder?</b>
              <p>
                Dependiendo la cantidad de reportes y la disponibilidad de los
                administradores, el plazo máximo de respuesta es de 24 a 48hs.
              </p>
              <h3 id="terminos">Terminos y condiciones</h3>
              <p>
                Devox.eth no asume ninguna responsabilidad legal sobre el contenido
                publicado por sus usuarios. Sin embargo, Devox se compromete a
                eliminar cualquier contenido en discordancia con sus reglas y con la
                legislación aplicable al sitio dentro de un plazo razonable conforme
                a la frecuencia de actividad de los miembros del staff.
              </p>
              <p>
                El contenido publicado en Devox.eth no representa las opiniones de
                la administración y moderación del sitio. Todas las marcas y
                copyrights en esta página web son propiedad de sus respectivos
                autores.
              </p>
              <p>
                Devox.eth es de uso anónimo y sin registro. El sitio
                recogerá unicamente la macaddress del usuario, las direcciones IPs se encriptan solo para procesarse unicamente
                en caso de baneo, tanto para los mods como desde la base de datos es imposible acceder a esta.
              </p>
              <p>
                Este documento podrá ser modificado en cualquier momento y sin
                necesidad de previo aviso.
              </p>
            </div>
          </section>
        </section>
      </main>
    </>
  );
}

export default About;
