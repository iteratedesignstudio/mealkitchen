/** @jsx React.DOM */

var SignUp = React.createClass({

  getInitialState: function() {
    return {email: null, password: null, signup: true};
  },

  componentWillMount: function(){
    this.props.setBGImg(true);
  },

  handleEmailChange: function(e) {
     this.setState({email: e.target.value});
  },

  handlePasswordChange: function(e) {
     this.setState({password: e.target.value});
  },

  handleSignUp: function(e) {
    console.log('calling handlesignup');
    e.preventDefault();
    var that = this;
    $.ajax({
      type: "POST",
      url: "api/user",
      data: JSON.stringify(that.state),
      dataType: "json",
      contentType: "application/json",
      success: function(){
        console.log('success!');
        that.props.transitionTo('/login');
      }
    });
  },

  render : function() {
    return (
      <div className="jumbotron-container">
        <div className="jumbotron">
        <h1 className="default-header">Sign Up</h1>
          <form onSubmit={this.handleSignUp}>
            <div className="form-group">
              <label className="input-label" htmlFor="email">Email</label>
              <input className="form-control" type="text" name="email" placeholder="Enter email" onChange={this.handleEmailChange} required />
            </div>
            <div className="form-group">
              <label className="input-label" htmlFor="password">Password</label>
              <input className="form-control" pattern=".{5,10}" title="5 to 10 characters" type="password" name="password" placeholder="Enter password" onChange={this.handlePasswordChange} required />
            </div>
            <input type="submit" className="btn btn-default btn-large pull-right" value="Sign Up"></input>
          </form>
          <p className="suggested-action">Already have an account with us? <a href="/#/login">Login here.</a></p>
        </div>
      </div>
    );
  }

});



