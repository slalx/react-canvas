var React = require('react');
var ReactCanvas = require('react-canvas');

var Item = require('./components/Item');

var Surface = ReactCanvas.Surface;
var Group = ReactCanvas.Group;
var Image = ReactCanvas.Image;
var Text = ReactCanvas.Text;
var FontFace = ReactCanvas.FontFace;



window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       || 
          window.webkitRequestAnimationFrame || 
          window.mozRequestAnimationFrame    || 
          window.oRequestAnimationFrame      || 
          window.msRequestAnimationFrame     || 
          function(/* function */ callback, /* DOMElement */ element){
            window.setTimeout(callback, 1000 / 60);
          };
})();



var App = React.createClass({

  getInitialState: function() {
    return { focusBoxLeft: 0,groupListLeft:0}
  },

  propTypes:{
    images:React.PropTypes.node
  },

  componentDidMount: function() {
    document.body.addEventListener('keydown',this.onKeyDown,false);
  },

  componentWillUnMount: function() {
    document.body.removeEventListener('keydown',this.onKeyDown,false);
  },

  render: function () {
    var surfaceWidth = 700;
    var surfaceHeight = 200;

    var images = this.props.images;

    var i=0;

    var listItems = images.map(function(item) {
      return <Item title={item.title} width={100} height={200} imageUrl={item.src} groupLeft={0}></Item>;
    });

    return (
      <Surface width={surfaceWidth} height={surfaceHeight} left={0} top={0} enableCSSLayout={true} onClick={this.onClick} >
        <Group style={this.getPageStyle()} onKeyDown={this.onKeyDown}>
          {listItems}
        </Group>
        <Group style={this.focusBox()} ></Group>
      </Surface>
    );
  },

  onClick: function(){
    //debugger;

  },

  onKeyDown: function(e){
   // debugger;
    e.preventDefault();

    var that = this;
    var target = null;
    var direction = 1;
    var startLeft = this.state.focusBoxLeft;
    //左
    if(e.keyCode==37){
      //当焦点框剧中时
      if(startLeft===300){

        if(this.state.groupListLeft==0){
          direction = -1;
          target = startLeft-100;
          requestAnimationFrame(function(){
            that.scrollBox(target,direction);
          });  
        }else{
          direction = 1;
          target = this.state.groupListLeft+100;
          requestAnimationFrame(function(){
            that.scrollList(target,direction);
          });
        }
      }else{

        if(startLeft===0){
          return;
        }

        direction = -1;
        target = startLeft-100;
        requestAnimationFrame(function(){
          that.scrollBox(target,direction);
        });
      }


    }
    //右
    if(e.keyCode==39){
      //当焦点框剧中时
      if(startLeft===300){
        //debugger;
        direction = -1;

        if(this.state.groupListLeft==(700-18*100)){

          direction = 1;
          target = startLeft+100;
          requestAnimationFrame(function(){
            that.scrollBox(target,direction);
          });

        }else{
          target = this.state.groupListLeft-100;
          requestAnimationFrame(function(){
            that.scrollList(target,direction);
          });
        }

      }else{
        direction = 1;
        target = startLeft+100;

        if(target==700){
          return;
        }

        requestAnimationFrame(function(){
          that.scrollBox(target,direction);
        });
      }


    }

  },

  scrollList: function(target,direction){
    var that = this;
    var state = this.state;
    var progress = this.state.groupListLeft+Math.floor(100/20*direction);

    if(direction===-1){
      if(progress>=target){

          state.groupListLeft = progress;
          this.setState(state);
          this.animatePending_ = requestAnimationFrame(function(){
            that.scrollList(target,direction);
          }); 
      }else{
        cancelAnimationFrame(this.animatePending_);
      }
    }

    if(direction===1){
      if(progress<=target){
        state.groupListLeft = progress;
        this.setState(state);
        this.animatePending_ = requestAnimationFrame(function(){
          that.scrollList(target,direction);
        }); 
      }else{
        cancelAnimationFrame(this.animatePending_);
      }
    }

   
  },

  scrollBox: function(target,direction){
      var progress = this.state.focusBoxLeft+Math.floor(100/20*direction);
      var that = this;
      var state = this.state;
      if(direction===1){
        if(progress<=target){

          console.log(progress);

          state.focusBoxLeft = progress;
          this.setState(state);

          this.animatePending_ = requestAnimationFrame(function(){
            that.scrollBox(target,direction);
          }); 
        }else{
          cancelAnimationFrame(this.animatePending_);
        }
      }

      if(direction===-1){
        if(progress>=target){
          state.focusBoxLeft = progress;
          this.setState(state);

          this.animatePending_ = requestAnimationFrame(function(){
            that.scrollBox(target,direction);
          }); 
        }else{
          cancelAnimationFrame(this.animatePending_);
        }      
      }


  },

  getPageStyle: function(){
    return {
      flexDirection: 'row',
      left:this.state.groupListLeft
    }
  },

  getGroupList: function(){
    return {
      top:0,
      left:0
    }
  },
  focusBox: function(){
    return {
      borderWidth:2,
      borderColor:'red',
      width:100,
      height:200,
      position:'absolute',
      left:this.state.focusBoxLeft,
      top:0    
    }
  }

});


var images = [
    {src:'http://gtms03.alicdn.com/tps/i3/TB10eNvHFXXXXanXVXXpTrh3FXX-192-168.jpg',title:'第一张'},
    {src:'http://gtms04.alicdn.com/tps/i4/TB1QYFwHFXXXXc_XFXXpTrh3FXX-192-168.jpg',title:'第二张'},
    {src:'http://gtms01.alicdn.com/tps/i1/TB1JPVDHFXXXXXCXXXXpTrh3FXX-192-168.jpg',title:'第三张'},
    {src:'http://gtms02.alicdn.com/tps/i2/TB1W0NBHFXXXXXuXpXXpTrh3FXX-192-168.jpg',title:'第四张'},
    {src:'http://gtms03.alicdn.com/tps/i3/TB136VuHFXXXXaKXVXXpTrh3FXX-192-168.jpg',title:'第五张'},
    {src:'http://gtms03.alicdn.com/tps/i3/TB136VuHFXXXXaKXVXXpTrh3FXX-192-168.jpg',title:'第六张'},
    {src:'http://gtms04.alicdn.com/tps/i4/TB17vlrHFXXXXbHaXXXpTrh3FXX-192-168.jpg',title:'第七张'},
    {src:'http://gtms01.alicdn.com/tps/i1/TB1nKXvHFXXXXafXVXXpTrh3FXX-192-168.jpg',title:'第八张'},
    {src:'http://gtms02.alicdn.com/tps/i2/TB1GRNvHFXXXXXHXVXXpTrh3FXX-192-168.jpg',title:'第九张'},
    {src:'http://gtms03.alicdn.com/tps/i3/TB1GD8wHFXXXXceXFXXpTrh3FXX-192-168.jpg',title:'第10张'},
    {src:'http://gtms04.alicdn.com/tps/i4/TB1ARhuHFXXXXbiXVXXpTrh3FXX-192-168.jpg',title:'第11张'},
    {src:'http://gtms03.alicdn.com/tps/i3/TB10eNvHFXXXXanXVXXpTrh3FXX-192-168.jpg',title:'第12张'},
    {src:'http://gtms04.alicdn.com/tps/i4/TB1QYFwHFXXXXc_XFXXpTrh3FXX-192-168.jpg',title:'第13张'},
    {src:'http://gtms01.alicdn.com/tps/i1/TB1JPVDHFXXXXXCXXXXpTrh3FXX-192-168.jpg',title:'第14张'},
    {src:'http://gtms02.alicdn.com/tps/i2/TB1W0NBHFXXXXXuXpXXpTrh3FXX-192-168.jpg',title:'第15张'},
    {src:'http://gtms03.alicdn.com/tps/i3/TB136VuHFXXXXaKXVXXpTrh3FXX-192-168.jpg',title:'第16张'},
    {src:'http://gtms03.alicdn.com/tps/i3/TB136VuHFXXXXaKXVXXpTrh3FXX-192-168.jpg',title:'第17张'},
    {src:'http://gtms04.alicdn.com/tps/i4/TB17vlrHFXXXXbHaXXXpTrh3FXX-192-168.jpg',title:'第19张'},
    {src:'http://gtms01.alicdn.com/tps/i1/TB1nKXvHFXXXXafXVXXpTrh3FXX-192-168.jpg',title:'第20张'},
    {src:'http://gtms02.alicdn.com/tps/i2/TB1GRNvHFXXXXXHXVXXpTrh3FXX-192-168.jpg',title:'第21张'},

];

React.render(<App images={images}/>, document.getElementById('main'));
