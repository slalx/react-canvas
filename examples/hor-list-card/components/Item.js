/** @jsx React.DOM */

'use strict';

var React = require('react');
var ReactCanvas = require('react-canvas');

var Group = ReactCanvas.Group;
var Image = ReactCanvas.Image;
var Text = ReactCanvas.Text;


var Item = React.createClass({

  propTypes: {
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
    imageUrl: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired,
    groupLeft : React.PropTypes.number.isRequired
  },

  render: function () {
    return (
      <Group style={this.getGroup()}>
        <Image style={this.getImage()} src={this.props.imageUrl} fadeIn={true}/>
        <Text style={this.getText()}>
          {this.props.title}
        </Text>
      </Group>
    );
  },
  getGroup: function(){
    //debugger;

    return {
      left: this.props.groupLeft,
      top: -200,
      width: this.props.width,
      height: this.props.height,
      position:'relative'      
    }
  },
  getImage: function(){
    return {
      left: 0,
      top: 0,
      width: 100,
      height: 200       
    } 
  },
  getText: function(){
    return {
      left: 10,
      top: 160,
      width: 100,
      height: 40,
      fontSize: 18,
      lineHeight: 24,
      color:'#fff'
    }
  }
});



module.exports = Item;
