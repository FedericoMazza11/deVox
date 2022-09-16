import axios from "axios";
import CategoryServices from "../services/categoriesService.jsx";

class VoxServices {

  //GET / POST Voxes
  postVox(data) {
    var value = axios({
      method: "post",
      url: "http://127.0.0.1:3001/postVox",
      data: data,
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then(function (response) {
        //Handle success
        return response;
      })
      .catch(function (response) {
        //Handle error
        return response;
      });
    return value;
  }
  getVoxes(category) {
    var categoryCall = ''
    if (category) {
      categoryCall = '/' + CategoryServices.categoryURLDecoder(category)[0]
    }
    var data = axios.get('http://127.0.0.1:3001/getVoxes' + categoryCall)
      .then(function (response) {
        return response;
      })
      .catch(function (response) {
        return response;
      });
      return data
  }
  searchVoxes(title) {
    var data = axios.get('http://127.0.0.1:3001/searchVoxes/' + title)
      .then(function (response) {
        return response;
      })
      .catch(function (response) {
        return response;
      });
      return data
  }
  getVox(id) {
    var data = axios.get('http://127.0.0.1:3001/getVox/' + id)
      .then(function (response) {
        return response;
      })
      .catch(function (response) {
        return response;
      });
      return data
  }
  findVoxes(user) {
    var data = axios({
      method: "post",
      data: user,
      url: "http://127.0.0.1:3001/getVoxes",
    })
      .then(function (response) {
        return response
      })
      .catch(function (response) {
        return response
      });
      return data
  }

  //Get / POST Session
  postSession() {
    var data = axios({
      method: "post",
      url: "http://127.0.0.1:3001/postSession",
    })
      .then(function (response) {
        return response
      })
      .catch(function (response) {
        return response
      });
      return data
  }
  postHiddenWords(words) {
    var data = axios({
      method: "post",
      data: words,
      headers: {'Content-Type': 'application/json'},
      url: "http://127.0.0.1:3001/postHiddenWords",
    })
      .then(function (response) {
        return response
      })
      .catch(function (response) {
        return response
      });
      return data
  }
  postHiddenCategories(words) {
    var data = axios({
      method: "post",
      data: words,
      headers: {'Content-Type': 'application/json'},
      url: "http://127.0.0.1:3001/postHiddenCategories",
    })
      .then(function (response) {
        return response
      })
      .catch(function (response) {
        return response
      });
      return data
  }
  getSession(user) {
    var data = axios({
      method: "post",
      url: "http://127.0.0.1:3001/getSession",
      data: user,
      headers: {'Content-Type': 'application/json'}
    })
      .then(function (response) {
        return response
      })
      .catch(function (response) {
        return response
      });
      return data
  }
  removeNotification(notification) {
    var data = axios({
      method: "post",
      url: "http://127.0.0.1:3001/removeNotification",
      data: notification,
      headers: {'Content-Type': 'application/json'}
    })
      .then(function (response) {
        return response
      })
      .catch(function (response) {
        return response
      });
      return data
  }
  //Get / POST Comments
  postComment(data) {
    var value = axios({
      method: "post",
      url: "http://127.0.0.1:3001/postComment",
      data: data,
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then(function (response) {
        //Handle success
       return response
      })
      .catch(function (response) {
        //Handle error
         return response
      });
    return value;
  }

  getComments(id) {
    var data = axios.get('http://127.0.0.1:3001/getComments/' + id)
      .then(function (response) {
        return response;
      })
      .catch(function (response) {
        return response;
      });
      return data
  }

  //Admin tools
  postReportComment(comment) {
    var data = axios({
      method: "post",
      data: comment,
      headers: {'Content-Type': 'application/json'},
      url: "http://127.0.0.1:3001/postReportComment",
    })
      .then(function (response) {
        return response
      })
      .catch(function (response) {
        return response
      });
      return data
  }
  adminTool(data) {
    var data = axios({
      method: "post",
      data: data,
      headers: {'Content-Type': 'application/json'},
      url: "http://127.0.0.1:3001/adminTool",
    })
      .then(function (response) {
        return response
      })
      .catch(function (response) {
        return response
      });
      return data
  }
  postReportVox(comment) {
    var data = axios({
      method: "post",
      data: comment,
      headers: {'Content-Type': 'application/json'},
      url: "http://127.0.0.1:3001/postReportVox",
    })
      .then(function (response) {
        return response
      })
      .catch(function (response) {
        return response
      });
      return data
  }
  getReports(id) {
    var data = axios.get('http://127.0.0.1:3001/getReports/' + id)
      .then(function (response) {
        return response;
      })
      .catch(function (response) {
        return response;
      });
      return data
  }
  removeReport(notification) {
    var data = axios({
      method: "post",
      url: "http://127.0.0.1:3001/removeReport",
      data: notification,
      headers: {'Content-Type': 'application/json'}
    })
      .then(function (response) {
        return response
      })
      .catch(function (response) {
        return response
      });
      return data
  }
  janitorTools(category) {
    var data = axios({
      method: "post",
      url: "http://127.0.0.1:3001/janitorTools",
      data: category,
      headers: {'Content-Type': 'application/json'}
    })
      .then(function (response) {
        return response
      })
      .catch(function (response) {
        return response
      });
      return data
  }

}

const service = new VoxServices();
export default service;
