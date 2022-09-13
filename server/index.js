//Initialization
const express = require ("express"); const bodyParser = require('body-parser');
const cors = require('cors'); const fs = require('fs');
const path = require('path'); const sharp = require('sharp');
const multer = require('multer'); const requestIp = require('request-ip');
const uuid = require('uuid'); const bcrypt = require("bcryptjs");
const geoip = require('fast-geoip'); var macaddress = require('macaddress');
const sanitizeHtml = require('sanitize-html');

//Express & multer init
const app = express(); const upload = multer();

//DB Components & models
require("./database");
const voxModel = require("./schemas/voxSchema");
const userModel = require("./schemas/userSchema");
const commentModel = require("./schemas/commentSchema");
const reportModel = require("./schemas/reportSchema");


//Settings
app.set("port", process.env.PORT || 3001)

const corsOptions = {
  origin: "*",
  methods: ['GET', 'PUT', 'POST', 'HEAD', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'Access-Control-Allow-Origin', 'Access-control-request-private-network'],
}

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(requestIp.mw())

//Server log into the console
const server = app.listen(app.get("port"), () => {
  console.log("Puerto: ", app.get("port"));
  console.log('Node version is: ' + process.version);
});

//Functions
function anonRandom() {
  var number = Math.floor(Math.random() * 85)
  switch (true) {
    case number < 20:
    return 'red';
    case number < 40 && number >= 20: return 'blue';
    case number < 60 && number >= 40: return 'green';
    case number < 80 && number >= 60: return 'yellow';
    case number < 84 && number >= 80: return 'multi';
    case number === 84: return 'black';
  }
}


function opComment(authorId, userId){
  if (authorId == userId) { return true; } else { return false; }
}


function categoryDecoder(category) {
  switch (true) {
    case category == 'ANM': return [1, 'Anime'];
    case category == 'ARTE': return [2, 'Arte'];
    case category === 'AUTO': return [3, 'Autos'];
    case category === 'BANT': return [4, 'International Random'];
    case category === 'CON': return [5, 'Consejos'];
    case category === 'CYTV': return [6, 'Cine y TV'];
    case category === 'DEPO': return [7, 'Deportes'];
    case category === 'DWNL': return [8, 'Descargas'];
    case category === 'ECO': return [9, 'Economia'];
    case category === 'FEM': return [10, 'Soy mujer'];
    case category === 'FIT': return [11, 'Fitness'];
    case category === 'GAS': return [12, 'Gastronomia'];
    case category === 'GEN': return [13, 'General'];
    case category === 'GMR': return [14, 'Gamer'];
    case category === 'GORE': return [15, 'Gore'];
    case category === 'GYM': return [16, 'Gimnasio'];
    case category === 'HIST': return [17, 'Historias'];
    case category === 'HIS': return [18, 'Historia'];
    case category === 'INT': return [19, 'Internacional'];
    case category === 'JIJO': return [20, 'Humor'];
    case category === 'LGBT': return [21, 'LGBT'];
    case category === 'NSFW': return [22, 'Pornografia'];
    case category === 'BDSM': return [23, 'Fetiches'];
    case category === 'OMNI': return [24, 'Omniverso'];
    case category === 'PARA': return [25, 'Paranormal'];
    case category === 'POL': return [26, 'Politica'];
    case category === 'PREG': return [27, 'Preguntas'];
    case category === 'PROG': return [28, 'Programacion'];
    case category === 'SCI': return [29, 'Ciencia'];
    case category === 'TECH': return [30, 'Tecnologia'];
    case category === 'UFF': return [31, 'Random'];
    case category === 'YTB': return [32, 'Youtube'];
    case category === 'HLT': return [33, 'Salud']
    case category === 'MUS': return [34, 'Musica']
    case category === 'NOT': return [35, 'Noticias']
    case category === 'NRM': return [36, 'Normies']
    case category === 'LIT': return [37, 'Literatura']
    case category === 'LUG': return [38, 'Lugares']
    case category === 'HUM': return [39, 'Humanidades']
    default: return [0, 'Invalid'];
  }
}

function nl2br2(str){
return str;
}


function commentProcessing (str) {
str = str.replaceAll(/</g, ".");
str = str.replace(/(^>((?!>).)*$)/gm, "<span class='greentext'> $1 </span>");
str = str.replace(/((>>)\b\w{7}\b)/g, "<a href='#$1'> $1 </a>").replace(/#>>/g, '#');
//str = str.replace(/((\[)[\w?=&nbsp .\/-;#~%-]+(?![\w?&.\/;#~%"&nbsp=-]*>)(\]))/g, "<span class='hiddenText'> $1 </span>");
str =  str.replace(/((>>)(http|https):\/\/[\w?=&.\/-;#~%-]+(?![\w?&.\/;#~%"=-]*>))/g, "<a href='$1'> $1 </a>").replace(/href='>>/g, "href='").replace(/#http/g, 'http');
str = str.replace(/(\r?\n)/g, '<br>');
return str;
}

function voxProcessing (str) {
str = str.replaceAll(/</g, ".");
str = str.replace(/(^>((?!>).)*$)/gm, "<span class='greentext'> $1 </span>");
//str = str.replace(/((\[)[\w?=&nbsp .\/-;#~%-]+(?![\w?&.\/;#~%"&nbsp=-]*>)(\]))/g, "<span class='hiddenText'> $1 </span>");
str =  str.replace(/((>>)(http|https):\/\/[\w?=&.\/-;#~%-]+(?![\w?&.\/;#~%"=-]*>))/g, "<a href='$1'> $1 </a>").replace(/href='>>/g, "href='").replace(/#http/g, 'http');
str = str.replace(/(\r?\n)/g, '<br>');
return str;
}

function urlProcess(data) {
  if (data.fileExtension == "video") {
    var url = "https://img.youtube.com/vi/" + data.url + "/0.jpg"
    return url
  } else {
    var url = "../backgrounds/low-res_" + data.filename + ".jpeg"
    return url
  }
}

//POST Methods

//Voxes POST & GET ----------------------------------------------------------|

app.post("/postVox", upload.any(), async (req, res) => {
  errors = [];
  var geo = await geoip.lookup(req.clientIp)
  var macaddres = await macaddress.one()
  const fileNameUuid = uuid.v4();

  //Esta verificacion se podria llevar a una funcion ========================|
  if (!req.body.voxTitle || req.body.voxTitle.length > 120) {
    errors.push("Titulo invalido");
  }
  if (!req.body.voxDescription || req.body.voxDescription.length > 3000) {
    errors.push("Descripcion invalida");
  }
  if (!req.body.voxCategory || req.body.voxCategory > 39 || req.body.voxCategory < 1) {
    errors.push("Categoria invalida");
  }
  if (!req.body.username || req.body.username.length != 36) {
    errors.push("Usuario invalido"); //Se deberia hacer otra verificacion con la DB
  } else {

    var user = await userModel.findOne({userId: req.body.username})
    console.log(user);
    if (user.voxDelay > Date.now()) {
      errors.push("Tenes que esperar " + Math.floor((user.voxDelay - Date.now()) / 60000) + " minutos para crear otro vox");
    }
  }
  //========================================================================|


  if (errors.length > 0) {
    var errorReturn = { errors: errors };
    res.send(errorReturn);
  } else {
    if (req.files[0]) {
      var extensionImg = req.files[0].originalname.split(".").pop();
      if (
        (extensionImg == "jpg") |
        (extensionImg == "png") |
        (extensionImg == "gif") |
        (extensionImg == "jpeg")
      ) {
        const newpath = path.join(
          __dirname,
          "../backgrounds/" + fileNameUuid + "." + extensionImg
        );
        fs.writeFileSync(newpath, req.files[0].buffer);
        sharp(newpath)
          .resize(250, 250)
          .toFormat("jpeg")
          .jpeg({ quality: 90 })
          .toFile(
            path.join(
              __dirname,
              "../backgrounds/low-res_" + fileNameUuid + ".jpeg"
            ),
            function (error) {
              if (error) {
              }
            }
          );
      }
    } else if (req.body.voxUrl != "") {
      if (
        /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png|webp|jpeg)/g.test(
          req.body.voxUrl
        )
      ) {
        var booleanChecked = true;
        var extensionImg = "image";
      } else if (req.body.voxUrl.length == 11) {
        var booleanChecked = true;
        var extensionImg = "video";
      } else {
        errors.push("Error de formato");
      } //Format error push
    } else {
      errors.push("Formato invalido");
    }
    if (errors.length > 0) {
      var errorReturn = { errors: errors };
      res.send(errorReturn);
    } else {
      var ipData = [{ip: req.clientIp, macaddres: macaddres, location: 'geo.country', city: 'geo.city' }]
      const vox = new voxModel({
        title: req.body.voxTitle,
        description: voxProcessing(req.body.voxDescription),
        category: req.body.voxCategory,
        filename: fileNameUuid,
        metadata: ipData,
        fileExtension: extensionImg,
        isURL: booleanChecked,
        url: req.body.voxUrl,
        username: req.body.username,
      });
      await userModel.findOneAndUpdate({userId: req.body.username}, {voxDelay: new Date(Date.now() + (10 * 60 * 1000))}, {new: true}).catch( err => {
      });

    await vox.save().then((response) => {
      res.send(response);
    });
    }
  }
});



app.post('/getVoxes', async (req, res) =>{
  hiddenCategories = [];
  var hiddenWords = ''
  var regex = ""
  if (req.body.userData && req.body.userData.hiddenWords != "") {
    hiddenWords = req.body.userData.hiddenWords
    regex = hiddenWords.map(function (k) { return new RegExp(k, 'i')});
  }
  if (req.body.userData) {
    hiddenCategories = req.body.userData.hiddenCategories
  }


  var voxes = await voxModel.find({title: {$nin:  regex}, category: {$nin: hiddenCategories}}).sort({lastUpdate: "desc"});
  res.send(voxes)
})

app.get('/getVoxes/:id', async (req, res) =>{
  var voxes = await voxModel.find({category: req.params.id}).sort({lastUpdate: "desc", });
  res.send(voxes)
})

app.get('/searchVoxes/:title', async (req, res) =>{
  const title = req.params.title;
  const regexTitle = new RegExp(title, 'i')
  var voxes = await voxModel.find({title: {$regex: regexTitle}}).sort({lastUpdate: "desc", });
  res.send(voxes)
})

app.get('/getVox/:id', async (req, res) =>{
  var vox = await voxModel.find({filename: req.params.id});
  res.send(vox)
})
















//Users POST & GET ----------------------------------------------------------|
app.post("/postSession", async (req, res) =>{
  const userUuid = uuid.v4();
  const passwordUuid = uuid.v4();
  const hashedPwd = await bcrypt.hash(passwordUuid, 10);
  const user = new userModel({userId: userUuid, userPassword: hashedPwd});
  await user.save().then( response => {
      res.send({'userData': user, 'password': passwordUuid})
      })
  });

  app.post("/postHiddenWords", async (req, res) =>{
    if (req.body.word.length && req.body.word.length > 500) {
      res.send({errors: ['Solo podes agregar hasta 500 caracteres']})
    } else {
      var user = await userModel.findOneAndUpdate({userId: req.body.user.userData.userId},  {hiddenWords: req.body.words}).catch( err => {
          res.send('Ocurrio un error')
      });
      res.send(user)
    }
    });

    app.post("/postHiddenCategories", async (req, res) =>{
          var categories = []
      if (req.body.word.length && req.body.word.length > 200) {
        res.send({errors: ['Solo podes agregar hasta 200 caracteres']})

      } else {
        req.body.words.forEach((item, i) => {

          if (categoryDecoder(item)[0] != 0) {
            categories.push(categoryDecoder(item)[0])
          }
        });

        var user = await userModel.findOneAndUpdate({userId: req.body.user.userData.userId},  {hiddenCategories: categories}).catch( err => {
            res.send('Ocurrio un error')
        });
        res.send(user)
      }
      });

app.post('/getSession', async (req, res) =>{
  var user = await userModel.findOne({userId: req.body.userName})
  if (user) {
    const cmp = await bcrypt.compare(req.body.userPassword, user.userPassword).catch( err => {
        res.send('Contraseña incorrecta')
    });
    if (cmp) { res.send({'userData': user, 'password': req.body.userPassword})} else { res.send('Contraseña incorrecta') }
  } else { res.send('Token invalido') }
});


app.post('/removeNotification', async (req, res) =>{
  var user = await userModel.updateMany({userId: req.body.userId}, {$pull: {notifications: {voxId: req.body.voxid}}}).catch( err => {
  });
  res.send('')
});
















//Comments POST & GET ----------------------------------------------------------|

app.post("/postComment",  upload.any(), async (req, res) => {
  var errors = []

  var geo = await geoip.lookup(req.clientIp)
  var macaddres = await macaddress.one()
  const fileNameUuid = uuid.v4();

  //Esta verificacion se podria llevar a una funcion ========================|
  if (!req.body.commentText || req.body.commentText.length > 5000) {
    errors.push("Comentario invalido");
  }
  if (!req.body.voxid || req.body.voxid.length != 36) {
    errors.push("Vox invalido");
  }
  if (!req.body.username || req.body.username.length != 36) {
    errors.push("Usuario invalido"); //Se deberia hacer otra verificacion con la DB
  } else {
    var user = await userModel.findOne({userId: req.body.username})
    if (user.commentDelay > Date.now()) {
      errors.push("Tenes que esperar " + Math.floor((user.commentDelay - Date.now()) / 1000) + " segundos para comentar");
    }
  }
  //========================================================================|

  //Variables to POST
  var anon = anonRandom(), dado = Math.floor(Math.random() * 10), op = opComment(req.body.voxuser, req.body.username),commentId = uuid.v4().substring(0,7).toUpperCase();


if (errors.length > 0) {
  var errorReturn = { errors: errors };
  res.send(errorReturn);
}

else {
  var voxData = await voxModel.findOne({filename: req.body.voxid})

  //Tag match function========
    if (req.body.commentText.match(/((>>)\b\w{7}\b)/g)) {
      var taggedTo = req.body.commentText.match(/((>>)\b\w{7}\b)/g).filter((value, index, self) =>
      index === self.findIndex((t) => (
        t.place === value.place && t.name === value.name
      ))
    )
    taggedTo.forEach((item, i) => {
      taggedTo[i] = item.replace(/>>/gm, '');
      var notificationTitle = 'Respondieron tu comentario en el vox: "' + voxData.title.substring(0,30) + '"'
      var notificationDescription = req.body.commentText.substring(0,50)
      var notificationId= voxData.filename
      var notificationUrl = urlProcess(voxData)
      var commentPush = commentModel.findOneAndUpdate({commentId: taggedTo[i]}, {$push: {taggedBy: commentId}}, {new: true}, (err, doc) => {
        if (err) {   }
    });
    var commentData = commentModel.findOne({$and:[{commentId: taggedTo[i]},{voxId: req.body.voxid}]}, (err, doc) => {
      if (err) {   } else {
        var notificationPush = userModel.findOneAndUpdate({userId: doc.username}, {$push: {notifications: {title: notificationTitle, description: notificationDescription, isAnnouncement: false, voxId: notificationId, date: Date.now(), url: notificationUrl}}}, {new: true}, (err, doc) => {
          if (err) {   }
      });
      }
  });


    });
    }
    //========================
    var media = true

  if (req.files[0]) {
    var extensionImg = req.files[0].originalname.split(".").pop();
    if (
      (extensionImg == "jpg") |
      (extensionImg == "png") |
      (extensionImg == "gif") |
      (extensionImg == "jpeg")
    ) {
      const newpath = path.join(
        __dirname,
        "../backgrounds/comments/" + fileNameUuid + "." + extensionImg
      );
      fs.writeFileSync(newpath, req.files[0].buffer);

    } else {
      errors.push("Error de formato");
    }
  } else if (req.body.commentUrl != "") {
    if (/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png|webp|jpeg)/g.test(req.body.commentUrl)) {
      var booleanChecked = true;
      var extensionImg = "image";
    } else if (req.body.commentUrl.length == 11) {
      var booleanChecked = true;
      var extensionImg = "video";
    } else {
      errors.push("Error de formato");
    } //Format error push
  } else {
    media = false;
  }
  if (errors.length > 0) {
    var errorReturn = { errors: errors };
    res.send(errorReturn);
  } else {

    var ipData = [{ip: req.clientIp, macaddres: macaddres, location: 'geo.country', city: 'geo.city' }]
    const comment = new commentModel({
      commentText: commentProcessing(req.body.commentText),
      taggedTo: taggedTo,
      commentId: commentId,
      username: req.body.username,
      metadata: ipData,
      isURL: booleanChecked,
      filename: fileNameUuid,
      hasMedia: media,
      voxId: req.body.voxid,
      anonColor: anon,
      anonNumber: dado,
      fileExtension: extensionImg,
      url: req.body.commentUrl,
      op: op
    });
    var vox = await voxModel.findOneAndUpdate({filename: req.body.voxid}, {$inc: {commentsCount: 1}, $set: {lastUpdate: Date.now()}});
    var notificationTitle = 'Comentaron tu vox: "' + voxData.title.substring(0,30) + '"'
    var notificationDescription = req.body.commentText.substring(0,50)
    var notificationId= voxData.filename
    var notificationUrl = urlProcess(voxData)
    var notificationPush = userModel.findOneAndUpdate({userId: voxData.username}, {$push: {notifications: {title: notificationTitle, description: notificationDescription, isAnnouncement: false, voxId: notificationId, date: Date.now(), url: notificationUrl}}, commentDelay: new Date(Date.now() + (10 * 1000))}, {new: true}, (err, doc) => {
      if (err) {   }
  });
  await comment.save().then((response) => {
    res.send(response);
  });
}}
});


app.get('/getComments/:id', async (req, res) =>{
  var comments = await commentModel.find({voxId: req.params.id}).sort({date: "desc"});
  res.send(comments)
})

//Reports POST & GET ----------------------------------------------------------|

app.post('/postReportComment', async (req, res) =>{
  var errors = []
  //Esta verificacion se podria llevar a una funcion ========================|
  if (!req.body.user.userData || req.body.user.userData.userId.length != 36) {
    errors.push("Usuario invalido"); //Se deberia hacer otra verificacion con la DB
  } else {
    var user = await userModel.findOne({userId: req.body.user.userData.userId})
    if (user.commentDelay > Date.now()) {
      errors.push("Tenes que esperar " + Math.floor((user.commentDelay - Date.now()) / 1000) + " segundos para reportar");
    }
  }

  if (errors.length > 0) {
    var errorReturn = { errors: errors };
    res.send(errorReturn);
  } else {
  const report = new reportModel({
    title: 'Reportaron un comentario en el vox: "'  + req.body.vox.title.substring(0,30) + '"',
    description: req.body.comment.commentText.substring(0,50),
    voxId: req.body.vox.filename,
    url: urlProcess(req.body.vox),
    commentId: req.body.comment.commentId,
  });
  var notificationPush = userModel.findOneAndUpdate({userId: req.body.user.userData.userId}, {commentDelay: new Date(Date.now() + (15 * 1000))}, {new: true}, (err, doc) => {
    if (err) {   }
});
  await report.save().then((response) => {
    res.send(response);
  });
}
})


app.post('/postReportVox', async (req, res) =>{
  var errors = []
  //Esta verificacion se podria llevar a una funcion ========================|
  if (!req.body.user.userData || req.body.user.userData.userId.length != 36) {
    errors.push("Usuario invalido"); //Se deberia hacer otra verificacion con la DB
  } else {
    var user = await userModel.findOne({userId: req.body.user.userData.userId})
    if (user.commentDelay > Date.now()) {
      errors.push("Tenes que esperar " + Math.floor((user.commentDelay - Date.now()) / 1000) + " segundos para reportar");
    }
  }

  if (errors.length > 0) {
    var errorReturn = { errors: errors };
    res.send(errorReturn);
  } else {
  const report = new reportModel({
    title: 'Reportaron el siguiente vox: "'  + req.body.vox.title.substring(0,30) + '"',
    description: req.body.vox.description.substring(0,50),
    voxId: req.body.vox.filename,
    url: urlProcess(req.body.vox),
    commentId: ' ',
  });
  var notificationPush = userModel.findOneAndUpdate({userId: req.body.user.userData.userId}, {commentDelay: new Date(Date.now() + (15 * 1000))}, {new: true}, (err, doc) => {
    if (err) {   }
});
  await report.save().then((response) => {
    res.send(response);
  });
}
})


app.get('/getReports/:id', async (req, res) =>{
  var reports = await reportModel.find().sort({date: "desc"});
  res.send(reports)
})

app.post('/removeReport', async (req, res) =>{
 console.log(req.body);
 var reports = await reportModel.deleteMany({ voxId: req.body.voxid}).catch( err => {
   res.send(err)
 });
 res.send(reports)
})
