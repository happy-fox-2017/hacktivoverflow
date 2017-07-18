<template>
  <div class="Mainmenu">
    <nav class="navbar navbar-inverse navbar-fixed-top">
      <div class="container-fluid">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#">Hacktiv8 Forum</a>
        </div>
        <div id="navbar" class="navbar-collapse collapse">
          <ul class="nav navbar-nav navbar-right">
            <li><a href="#">Login</a></li>
          </ul>
          <p class="navbar-text navbar-right">Welcome Guest</p>
        </div>
        <div class="modal fade" id="myModal" role="dialog">
    <div class="modal-dialog">
    
      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">Modal Header</h4>
        </div>
        <div class="modal-body">
          <p>Some text in the modal.</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        </div>
      </div>
      
    </div>
  </div>
      </div>
    </nav>
    <div class="container">
      <div class="jumbotron">
        <h1>Image Here!</h1>
      </div>
      <div class="panel panel-primary">
        <div class="panel-heading">Thread</div>
        <div class="panel-body">
          <table class="table table-condensed">
            <tr id = "table-tr">
              <td>Test Forasdasdasdasdasdasdasasdqweqweqwe13ewqeqwequm</td>
              <td style="text-align : right">100 <img src="https://cdn3.iconfinder.com/data/icons/musthave/256/Stock%20Index%20Up.png" style="width:24px" alt=""></td>
              <td style="text-align : right">111 <img src="http://icons.iconarchive.com/icons/visualpharm/must-have/256/Stock-Index-Down-icon.png" style="width:24px" alt=""></td>
              <td style="text-align : right">last post : Test-post by Antoni Angga at today</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'Mainmenu',
  data () {
    return {
      thread: null
    }
  },
  created () {
    var self = this
    this.$http.get('http://localhost:3000/thread')
    .then((response) => {
      self.thread = response.data
    }).catch(err => {
      console.log(err)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #desc{
    padding-left: 10px
  }
  #table-tr {
    padding-top: 40px
  }
</style>
