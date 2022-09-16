//SolidJS---------------------|
import { lazy, createSignal, createEffect, onMount, onCleanup } from "solid-js";
import { Router,  Link, useParams } from "@solidjs/router";
import moment from 'moment';
import toast, { Toaster } from 'solid-toast';
import 'moment/dist/locale/es';
moment.updateLocale('es', {
    relativeTime : {
        future: "%s",past:   "%s",s:  "1s",ss: "%ds",  m:  "1m",mm: "%dm",h:  "1h",hh: "%dh",  d:  "1d",dd: "%dd",M:  "1 mes",MM: "%d meses",y:  "1a",yy: "%da"
    }
});

//Services---------------------|
import VoxService from "../services/apiCall.jsx";
import { FiBarChart2, FiPaperclip, FiLayers, FiX, FiPlus, FiAlertOctagon, FiXCircle, FiUserX, FiUser, FiStar, FiEye, FiEyeOff, FiTool  } from "solid-icons/fi";
import { ImHammer2  } from "solid-icons/im";

//Components---------------------|
import CreateVox from './createVox.jsx'
import CategoryServices from "../services/categoriesService.jsx";



function Voxes() {


  //Variables---------------------|
  const [vox, setVox] = createSignal(false);
  const [comments, setComments] = createSignal(false);
  const [showAdminModal, setShowAdminModal] = createSignal(false);
  const [janitorModal, setJanitorModal] = createSignal(false);
  const [janitorCategory, setJanitorCategory] = createSignal(0);
  const params = useParams();
  const [commentDetails, setCommentDetails] = createSignal({
    commentText: "",
    commentImage: null,
    commentUrl: '',
    urlType: '',
    commentSource: null,
    preview: null,
    });
    const [adminDetails, setAdminDetails] = createSignal({
      isComment: false,
      reason: null,
      description: '',
      userId: '',
      time: '',
      reportId: ''
      });
  const [hoverDetails, setHoverDetails] = createSignal({
    isHover: false,
    posY: -200,
    hoverData: false,
    isMobile: false,
    isMobileClickd: false
  });
  var user = JSON.parse(localStorage.getItem("user"));


  createEffect(() => {
    //Fetching
    VoxService.getVox(params.voxid)
      .then((res) => {
        setVox(res.data[0]);
        document.title = 'Devox | ' + vox().title
      })
    VoxService.getComments(params.voxid)
      .then((res) => {
        setComments(res.data);
      })
      .catch((e) => {});
  }, []);

  const userTouchFunction = (tag) => {
    console.log(tag);
  }
  const setFunction = (data) =>  {
    if (data.comment) {
      setAdminDetails({...adminDetails(), isComment: true, userId: data.comment.username, reportId: data.comment.filename})
    } else {
      setAdminDetails({...adminDetails(), isComment: false, userId: data.vox.username, reportId: data.vox.filename})
    }
    setShowAdminModal(!showAdminModal())
  }


  function processAdminTool() {
    var errors = []
    var data = adminDetails();
    if (!data.reason || data.reason.length > 8 || 1 > data.reason.length) {
      errors.push("Razon invalida")
    }
    if (!data.description || data.description.length > 300 ) {
      errors.push("Descripcion invalida, podes poner un maximo de 300 caracteres")
    }
    if (!data.userId || data.userId.length != 36) {
      errors.push("Usuario invalido")
    }
    if (!data.time || 0 > data.time || data.time > 10000000) {
      errors.push("Tiempo invalido, se aceptan un maximo de 10 millones de minutos")
    }
    return errors
  }

  const deleteUser = async () =>  {
    var errors = processAdminTool()
    if (errors && errors.length > 0) {
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
          const data = await VoxService.adminTool({data: adminDetails(), user: user, type: 'delete'});
          if (data.data.errors) {
            data.data.errors.forEach((item, i) => {
              toast.error(item, {
    className: 'border-2 border-gray-600',
    style: {
      background: '#1f2937',
      color: '#f3f4f6'
    },

  })
            });
          } else {
            window.location.reload(false)
          }
    }
  }

  const moveCategory = async () =>  {
          const data = await VoxService.janitorTools({category: janitorCategory(), user: user, vox: vox()});
          if (data.data.errors) {
            data.data.errors.forEach((item, i) => {
              toast.error(item, {
    className: 'border-2 border-gray-600',
    style: {
      background: '#1f2937',
      color: '#f3f4f6'
    },

  })
            });
          } else {
            window.location.reload(false)
          }
  }

  const submitPrevent = (e) => {
  e.preventDefault();
  }

  const banUser = async () =>  {
    var errors = processAdminTool()
    if (errors && errors.length > 0) {
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
          const data = await VoxService.adminTool({data: adminDetails(), user: user, type: 'ban'});
          if (data.data.errors) {
            data.data.errors.forEach((item, i) => {
              toast.error(item, {
    className: 'border-2 border-gray-600',
    style: {
      background: '#1f2937',
      color: '#f3f4f6'
    },

  })
            });
          } else {
            window.location.reload(false)
          }
    }
  }
  const viewUser = () =>  {
    toast.error('Todavia no se implemento esta opcion anon', {
className: 'border-2 border-gray-600',
style: {
background: '#1f2937',
color: '#f3f4f6'
},  iconTheme: {
    primary: '#ffe561',
    secondary: '#1f2937'
  }

  });
  }














  const commentReportFunction = async (comment) => {
    var data = await VoxService.postReportComment({comment: comment, vox: vox(), user: user})
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
    toast.success('Comentario reportado', {
  className: 'border-2 border-gray-600',
  style: {
    background: '#1f2937',
    color: '#f3f4f6'
  },
  iconTheme: {
    primary: '#f3f4f6',
    secondary: '#1f2937'
  }})
  }
}

  const voxReportFunction = async (comment) => {
    var data = await VoxService.postReportVox({vox: vox(), user: user})
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
    toast.success('Vox reportado', {
  className: 'border-2 border-gray-600',
  style: {
    background: '#1f2937',
    color: '#f3f4f6'
  },
  iconTheme: {
    primary: '#f3f4f6',
    secondary: '#1f2937'
  }})
  }
}


  const uploadFiles = () => {
    document.getElementById('imgUpload').click()
  }

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
    setCommentDetails({ ...commentDetails(), commentUrl: e.target.value })
    if (/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g.test(commentDetails().commentUrl)) {
       setCommentDetails({ ...commentDetails(), urlType: 'image'})
    } else if (/^(?:https?:)?(?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9\_-]{7,15})(?:[\?&][a-zA-Z0-9\_-]+=[a-zA-Z0-9\_-]+)*$/g.test(commentDetails().commentUrl)) {
      if (extractVideoID(commentDetails().commentUrl)) {
        setCommentDetails({ ...commentDetails(), commentUrl: extractVideoID(commentDetails().commentUrl)})
        setCommentDetails({ ...commentDetails(), urlType: 'youtube'})
      }
    }
  }


  const commentPostFunc = async(e) => {
    e.preventDefault();
    var errors = [];

    if (commentDetails().commentSource === 'file') {
      var commentFormat = commentDetails().commentImage.name.split('.').pop().toLowerCase()
    }

    if ((commentDetails().commentSource === 'file') && (commentFormat != 'png') && (commentFormat != 'gif') && (commentFormat != 'jpg') && (commentFormat != 'jpeg')) {
      errors.push('El formato no esta sorportado')
    }
    if ((!user) || (!user.userData) || (!user.userData.userId || user.userData.userId.length != 36)) {
      errors.push('Sesion invalida, logueate usando el boton "iniciar vox"')
    }
    if (!commentDetails().commentText || commentDetails().commentText > 3000) {
      errors.push('Comentario invalido')
    }
    if (commentDetails().commentText.match(/((>>)\b\w{7}\b)/g) && commentDetails().commentText.match(/((>>)\b\w{7}\b)/g).length > 5) {
      errors.push('Solo podes taggear hasta 5 comentarios')
    }
    if (errors && errors.length > 0) {
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
       await setCommentDetails({ ...commentDetails(), username: user.userData.userId, voxuser: vox().username, voxid: vox().filename})
          const data = await VoxService.postComment(
                 commentDetails()
               );
          if (data.data.errors) {
            data.data.errors.forEach((item, i) => {
              toast.error(item, {
    className: 'border-2 border-gray-600',
    style: {
      background: '#1f2937',
      color: '#f3f4f6'
    },

  })
            });


          } else {
            window.location.reload(false)
          }
    }

}
















  //HTML---------------------|
  return (
    <>
    <main >
<Toaster/>
      <div className="vowWraper" style='padding-top: 1px;' >
        {vox() ?
        <section class="voxData">
          <div class="voxBar">
            <div class="voxCategoryBar">
              <Link href={"/" + CategoryServices.categoryFilter(vox().category)[0]}>
                <div class="voxCategory">
                  <div class="categoryAvatar">
                    <img
                      src={"../public/" +  CategoryServices.categoryFilter(vox().category)[0] + 'devoxLogoLowRes.jpg'}
                      alt=""
                    ></img>
                  </div>
                  <div class="categoryTitle">{CategoryServices.categoryFilter(vox().category)[1]}</div>
                </div>
              </Link>
            </div>
          </div>
          <div class="voxBar">
            <div class="actions">
              <div class="voxOption report"  onClick={() => voxReportFunction(vox())}>
              <FiAlertOctagon/>
                <span class="voxOptionText ">

                  Denunciar
                </span>
              </div>
              <div class="voxOption ">
                <FiStar/>
                <span data-parent="" class="voxOptionText">
                  Favorito
                </span>
              </div>
              <div class="voxOption ">
                <FiEye/>
                <span data-parent="" class="voxOptionText">
                  Seguir
                </span>
              </div>
              <div class="voxOption ">
                <FiEyeOff/>
                <span data-parent="" class="voxOptionText">
                  Ocultar
                </span>
                </div>
                {user && user.userData && user.userData.rank != "anon" && user.userData.rank != "janitor" ?
                <div class="voxOption banTag" onClick={() => setFunction({vox: vox()})}><ImHammer2 /><span data-parent="" class="voxOptionText">Admin tools</span></div>
                :
                ''
                }
                {user && user.userData && user.userData.rank != "anon" ?
                <div class="voxOption janitorTool" onClick={() => setJanitorModal(!janitorModal())}><FiTool  /><span data-parent="" class="voxOptionText">Janitor tools</span></div>
                :
                ''
                }

            </div>

            <div class="metadata">
              <div class="authorVox">
                <span class="name ">Anonimo</span>
                <span class="commentTag ">anon</span>
              </div>
              <div class="voxCreatedAt">{moment(vox().date).fromNow()}</div>
            </div>
          </div>
          <article class="voxContent">

          { vox().fileExtension == 'video' ?
          <figure class="voxAttach">
            <iframe width="100%" height="215" src={"https://www.youtube.com/embed/" + vox().url + "?autoplay=0"} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>
            </figure>
          : vox().fileExtension == 'image' ?
          <figure class="voxAttach">
            <a
              class="voxImage"
              target="_BLANK"
              href={vox().url}
            >
              <img
                src={vox().url}
                alt=""
              ></img>
              </a>
            </figure>
          :
          <figure class="voxAttach">
            <a
              class="voxImage"
              target="_BLANK"
              href={'../backgrounds/' + vox().filename + '.' + vox().fileExtension}
            >
              <img
                src={'../backgrounds/' + vox().filename + '.' + vox().fileExtension}
                alt=""
              ></img>
              </a>
            </figure>

          }


            <header class="voxBody">
              <h1 itemprop="name" id="voxTitle">
              {vox().title}
              </h1>
              <div class="voxDescription" itemprop="articleBody" id="voxContent" innerHTML={vox().description}>

              </div>



            </header>
          </article>
        </section>
        :
        ''
      }



      {hoverDetails().isMobile ? '' :

       comments() && hoverDetails().isHover == true && hoverDetails().hoverData && comments().filter(x => x.commentId === hoverDetails().hoverData)[0] ?
        <div class="comment commentfloat" id="H1YAITF" data-id="3554746"  style={"position: absolute; right: calc(50% - 60px); top: calc(" + hoverDetails().posY + 'px - 44px); max-width: 332px; '}>
          <div class="commentAvatar">
            <div class={"unselect avatarColor " + comments().filter(x => x.commentId === hoverDetails().hoverData)[0].anonColor}>
              <span class="avatarText">{ vox().dice ? <span class="avatarText" style="font-size: 40px">{comments().filter(x => x.commentId === hoverDetails().hoverData)[0].anonNumber}</span> : <span class="avatarText">ANON</span>}</span>
            </div>
          </div>
          <div class="commentBody">
            <div class="commentMetadata">
              <div class="commentsTag unselect">
                <span class="author   " style="">
                  Anonimo
                </span>
                <span class="commentTag ">anon</span>
                <span class="commentTag pointer" data-tag="H1YAITF">
                {comments().filter(x => x.commentId === hoverDetails().hoverData)[0].commentId}
                </span>
              </div>
              <div class="commentMetaRight">
                <div class="commentCreatedAt">{moment(comments().filter(x => x.commentId === hoverDetails().hoverData)[0].date).fromNow()}</div>
                <div class="commentAction" data-commentaction="3554746">
                  <i data-parent="" class="fas fa-ellipsis-v"></i>
                </div>
              </div>
            </div>
            <div class="commentReply"></div>
            <div class="commentData ">
            {
              comments().filter(x => x.commentId === hoverDetails().hoverData)[0].hasMedia ?
              <figure class="commentAttach">
            {  comments().filter(x => x.commentId === hoverDetails().hoverData)[0].fileExtension === 'video'  ?
            <iframe width="100%" height="215" src={"https://www.youtube.com/embed/" + comments().filter(x => x.commentId === hoverDetails().hoverData)[0].url + "?autoplay=0"} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>
            :
            comments().filter(x => x.commentId === hoverDetails().hoverData)[0].fileExtension === 'image'
            ?
            <a class="voxImage" target="_BLANK" href={comments().filter(x => x.commentId === hoverDetails().hoverData)[0].url}>
            <img src={comments().filter(x => x.commentId === hoverDetails().hoverData)[0].url}></img>
            </a>
            :
            <a class="voxImage" target="_BLANK" href={'../backgrounds/comments/' + comments().filter(x => x.commentId === hoverDetails().hoverData)[0].filename + '.' + comments().filter(x => x.commentId === hoverDetails().hoverData)[0].fileExtension}>
                                        <img src={'../backgrounds/comments/' + comments().filter(x => x.commentId === hoverDetails().hoverData)[0].filename + '.' + comments().filter(x => x.commentId === hoverDetails().hoverData)[0].fileExtension}></img>
                                    </a>
          }
              </figure>
              :
              ''
            }
              <div innerHTML={comments().filter(x => x.commentId === hoverDetails().hoverData)[0].commentText}></div>
            </div>
          </div>
        </div> :
        ''
      }





        <section class="voxCommentList">
          <form class="commentBox" id="createComment" onSubmit={commentPostFunc}>
            <div class="pollOption voted hide" id="commentPoll">
              <div class="pollOptionText"></div>
              <div class="pollOptionPercent" id="cancelVoteComment">
                X
              </div>
            </div>
            <textarea
              name="content"
              class="commentTextarea"
              id="commentTextarea"
              maxlength="3000"
              placeholder="Escribe un comentario..."
              onChange={(e) =>
                setCommentDetails({ ...commentDetails(), commentText: e.target.value })
              }
              value={commentDetails().commentText}
            ></textarea>






            <div class="commentBoxButtons">
              <div class="attachs" id="commentAttachs">
              <div class={commentDetails().commentSource === 'file' ? "attachButton tooltip-bottom uploadFromLocalActive tooltip-bottom" :
            "attachButton tooltip-bottom tooltip-bottom"} onClick={uploadFiles}>
                <FiLayers/>
              </div>
                <input
                  name="file"
                  id="imgUpload"
                  type="file"
                  accept="image/gif, image/jpeg, image/jpg, image/png"
                  hidden
                  onChange={(e) =>
                  setCommentDetails({ ...commentDetails(), commentImage: e.target.files[0], commentSource: 'file', preview: URL.createObjectURL(e.target.files[0]), commentUrl: '', urlType: '' })
                }
                ></input>

                <div class={commentDetails().commentSource === 'url' ? "attachButton uploadFromLocalActive tooltip-bottom" :
                "attachButton tooltip-bottom tooltip-bottom"} onclick={(e) => setCommentDetails({ ...commentDetails(), commentImage: null, commentSource: 'url', preview: null})}>
                <FiPaperclip/>
                </div>


                {commentDetails().commentSource === 'url' ?
                <div class="commentBoxURL">
                <input
                  name="url"
                  type="url"
                  placeholder="Actualmente se aceptan imagenes y videos de Youtube"
                  maxlength="220"
                  onChange={(e) =>
                 urlValidationFunc(e)
                }
                ></input>
                </div>
                 : ''}

                <div class="preview" id="previewInputComment" hidden>
                  <div class="closePreview" data-closepreview="previewInputComment">
                    <i class="fas fa-times"></i>
                  </div>
                  <img
                    src=""
                    alt=""
                  ></img>
                </div>
              </div>

              <button type="submit" class="buttonPress newComment" id="newComment">
                <i class="fas fa-circle-notch fa-spin"></i>
                <span>Comentar</span>
              </button>
            </div>

            <div div class="preview" id="previewInputVox" style="max-width: 100vw; margin-top:10px; max-height: 100%;">
            {commentDetails().urlType === 'image' ?
            <img src={commentDetails().commentUrl} alt=""></img>
             : ''}
             {commentDetails().urlType === 'youtube' ?
             <figure class="commentAttach" style="float:none">
             <iframe width="100%" src={"https://www.youtube.com/embed/" + commentDetails().commentUrl + "?autoplay=1"} frameborder="0" allow="accelerometer;  encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>
             </figure>

              : ''}


              {commentDetails().commentSource === 'file' ?
              <div div class="preview" id="previewInputVox">
                <div class="closePreview" onClick={(e) => setCommentDetails({ ...commentDetails(), commentImage: null, commentSource: null, preview: null})}>
                  <FiX/>
                </div>
                <img
                  src={commentDetails().preview}
                  alt=""
                ></img>
              </div>
               :
            ''}
            </div>

          </form>






          <div class="commentsVoxCount">
            <span class="commentsVoxText" id="commentsVoxText">
              Comentarios (
                <span id="voxComments">{vox().commentsCount}</span>)
            </span>
            <span class="commentsVoxText hide" id="attachsVoxText">
              Archivos (<span id="voxAttachsToggle">47</span>)
            </span>
            <span class="attachsVox">
              <span data-openfiles="">
                <i class="fas fa-folder"></i>
              </span>
            </span>
          </div>
          <div class="commentList" id="commentList">
            <div class="commentContainer">













          {comments() ?
            <>
            {comments() && comments().map((comment) => {
              return (
                <div class="comment" id={comment.commentId} onClick={(e) =>
                  setCommentDetails({ ...commentDetails(), commentText: commentDetails().commentText + '\r' + ">>" +  comment.commentId})
                }>
                  <div class="commentAvatar">
                    <div class={'unselect avatarColor ' + comment.anonColor}>
                      {vox().dice ? <span class="avatarText" style="font-size: 40px">{comment.anonNumber}</span> :  <span class="avatarText">ANON</span>}
                    </div>
                  </div>
                  <div class="commentBody">
                    <div class="commentMetadata">
                      <div class="commentsTag unselect">
                      {comment.op ? <span class="commentTagBg op">OP</span> : ''}
                        <span class="author">
                          Anonimo
                        </span>
                        <span class="commentTag">anon</span>
                        <span class="commentTag pointer">
                          {comment.commentId}
                        </span>
                    {user && user.userData && user.userData.rank != "anon" && user.userData.rank != "janitor" ?
                        <ImHammer2 class="banTag" onClick={() => setFunction({comment: comment})}/>
                        :
                        ''
                      }
                      </div>
                      <div class="commentMetaRight">
                        <div class="commentCreatedAt">{moment(comment.date).fromNow()}</div> <div class="commentCreatedAt report" style="padding-left: 10px" onClick={() => commentReportFunction(comment)}><FiAlertOctagon/> </div>
                        <div class="commentAction">
                          <i data-parent="" class="fas fa-ellipsis-v"></i>
                        </div>
                      </div>
                    </div>
                    {comment.taggedBy.length  ?<div class="commentReply">taggeado por: {comment.taggedBy.map((tag) => {
                      return(
                        <a href={'#' + tag} onMouseEnter={(e) => setHoverDetails({ ...hoverDetails(), posY: e.target.offsetTop, hoverData: tag, isHover: true})} onMouseLeave={(e) => setHoverDetails({ ...hoverDetails(), isHover: false})}> {'>>' + tag} </a>
                      )
                    })}</div>
                    :
                    ''
                  }
                    {comment.taggedTo && comment.taggedTo.length? <div class="commentReply">taggeando a: {comment.taggedTo.map((tag) => {
                      return(
                        <a href={'#' + tag} onTouchStart={(e) => {
                          userTouchFunction(tag)
                        }} onMouseEnter={(e) => setHoverDetails({ ...hoverDetails(), posY: e.target.offsetTop, hoverData: tag, isHover: true})} onMouseLeave={(e) => setHoverDetails({ ...hoverDetails(), isHover: false})}> {'>>' + tag} </a>
                      )
                    })}</div>
                    :
                    ''
                  }

                    <div class="commentData">
                    {
                      comment.hasMedia ?
                      <figure class="commentAttach">
                    {  comment.fileExtension === 'video'  ?
                    <iframe width="100%" height="215" src={"https://www.youtube.com/embed/" + comment.url + "?autoplay=0"} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>
                    :
                    comment.fileExtension === 'image'
                    ?
                    <a class="voxImage" target="_BLANK" href={comment.url}>
                    <img src={comment.url}></img>
                    </a>
                    :
                    <a class="voxImage" target="_BLANK" href={'../backgrounds/comments/' + comment.filename + '.' + comment.fileExtension}>
                                                <img src={'../backgrounds/comments/' + comment.filename + '.' + comment.fileExtension}></img>
                                            </a>
                  }
                      </figure>
                      :
                      ''
                    }
                    <div class="commentContent" innerHTML={comment.commentText}></div>
                    </div>
                  </div>
                </div>
              )
          })}
          </>
          : '' }
            </div>
          </div>
        </section>
      </div>

      { showAdminModal() ?
        <>
        <div>
        <form class="modalBox createVox openModal" id="verify" onSubmit={submitPrevent}>
          <select name="niche" onChange={(e) => setAdminDetails({...adminDetails(), reason: e.target.value})}>
            <option value="" selected="selected">
              Elegi la razon
            </option>
            <optgroup label="Maximo 1 semana">
            <option value="1">Flood</option>
            <option value="2">Desvirtuar</option>
            </optgroup>
            <optgroup label="Maximo 1 mes">
            <option value="3">Spam</option>
            <option value="4">Doxeo</option>
            <option value="5">Pornografia fuera de categoria</option>
            </optgroup>
            <optgroup label="Ilimitado">
            <option value="6">CP</option>
            <option value="7">Soy nafa, se me canto</option>
            </optgroup>
          </select>
          <input id="number" type="number" placeholder="Ingresa el tiempo en minutos" onChange={(e) => setAdminDetails({...adminDetails(), time: e.target.value})} />
          <textarea
            name="content"
            class="newVoxContent"
            id="voxTextarea"
            maxlength="5000"
            placeholder="Describi el problema..." onChange={(e) => setAdminDetails({...adminDetails(), description: e.target.value})} ></textarea>


          <button class="buttonPress" id="newVox" type="submit" style="background: #801f1f; border-color: #801f1f" onClick={banUser}>
            <span> <FiUserX/> Borrar y banear</span>
          </button>
          <button class="buttonPress" id="newVox" type="submit" style="background: #a17a37; border-color: #a17a37" onClick={deleteUser}>
            <span> <FiXCircle/> Borrar solamente</span>
          </button>
          <button class="buttonPress" id="newVox" onClick={viewUser}>
            <span> <FiUser/> Ver perfil del usuario</span>
          </button>
          </form>
        </div>
        </>
        :
        ''

      }
      { janitorModal() ?
        <>
        <div>
        <form class="modalBox createVox openModal" id="verify" onSubmit={submitPrevent}>
          <select name="niche" onChange={(e) => setJanitorCategory(e.target.value)}>
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
          <button class="buttonPress" id="newVox" type="submit" style="background: #a17a37; border-color: #a17a37" onClick={moveCategory}>
            <span> <FiTool/> Recategorizar</span>
          </button>
          </form>
        </div>
        </>
        :
        ''

      }

    </main>
    </>
  );
}

export default Voxes;
