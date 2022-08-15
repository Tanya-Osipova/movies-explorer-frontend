import React from "react";


function Validator({children, ...props}) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
    }

    handleChange() {
      return false
    }

    render() {
      return 
      <>
        <children {...this.props} />;
      </>
    }
  }
}

export default Validator;