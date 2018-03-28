var React = require("react");
var helpers = require("../utils/helpers.js");
var Saved = React.createClass({

  // set a generic state
  getInitialState: function() {
    return {
      doIneedThis: false
    };
  },

  _handleDelete: function(event) {

    // Collect the clicked article's id
    var articleMongoId = event.target.value;

    // Copy "this" into "that" so that component is accessible inside the functions.
    var that = this;

    // Send this data to the API endpoint to save it to Mongo
    helpers.apiDelete(articleMongoId).then(function(){

      // Query Mongo Again for new Data (this will re-render the component to account for deletion)
      helpers.apiGet().then(function(query){
        that.props._resetMongoResults(query.data);
      });
    });
  },
  // Here we render the Search Results Panel
  render: function() {
    // http://stackoverflow.com/questions/29810914/react-js-onclick-cant-pass-value-to-method
    var that = this;
    return (
      <div className="panel panel-default panelHeader col-md-12">
        <div className="panel-heading">
          <h3 className="panel-title text-center" style={ {fontSize: "20px"} }><strong>Saved Articles</strong></h3>
        </div>
        <div className="panel-body">
          <ul className="list-group col-md-8 col-md-offset-2">
            {/* ++++++++++++++++++++++++++++++++ ITERATE HERE ++++++++++++++++++++++++++++++++ */}
            {/* Here we use a map function to loop through an array in JSX */}
            {this.props.mongoResults.map(function(search, i) {
              return (
                <li key={search._id} className="list-group-item" style={ {borderWidth: "0px"} }>
                  <div className="input-group">
                    <div type="text" className="form-control">
                      <b><a href={search.url} target="_new" style={ {color: "black"} }>{search.title}</a></b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{search.date.substring(0, 10)}
                    </div>
                    <span className="input-group-btn">
                      <button className="btn btn-danger" type="button" onClick={that._handleDelete} value={search._id}>Remove</button>
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
});

// Export the component back for use in Main file
module.exports = Saved;