import React, { Component } from 'react'
import { connect } from 'react-redux'

import Connection from './Auth/Connection'

class Home extends Component {
    
    render () {
        const { isAuthenticated } = this.props
        return (
            <div>
                Home page
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.isAuthenticated
})
  
export default connect(mapStateToProps)(Home)