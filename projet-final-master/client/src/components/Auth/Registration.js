import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'
import SaveIcon from '@material-ui/icons/Save'
import { connect } from 'react-redux'

import { registrationUser } from '../../actions/authActions'

const styles = {
    textField: {
        marginTop: '1%',
        marginRigth: '1%',
        width: '100%'
    },
    btnBlock: {
        textAlign: 'center',
        margin: '2%',
    }
}

class Registration extends Component
{
    constructor (props)
    {
        super(props)
        this.state = {
            login: '',
            email: '',
            password: '',
            password_confirm: '',
            errors: {}
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)   
    }

    handleChange (e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors })
        }
    }

    handleSubmit (e) {
        e.preventDefault()
        const userData = {
            login: this.state.login,
            email: this.state.email,
            password: this.state.password,
            password_confirm: this.state.password_confirm
        }
        this.props.registrationUser(userData, this.props.history)
    }

    render() {
        const { classes } = this.props;
        const { errors } = this.state;
        return (
            <Paper style={{ padding: 8 }}>
                <form onSubmit={this.handleSubmit}>
                    <TextField
                        variant="outlined"
                        type="login"
                        label="Login"
                        className={classes.textField}
                        value={this.state.login}
                        name="login"
                        onChange={this.handleChange}
                        helperText={errors.login ? errors.login : ''}
                        error={errors.login ? true : false}
                        placeholder="EX: koko" />

                    <TextField
                        variant="outlined"
                        type="email"
                        label="Email"
                        className={classes.textField}
                        value={this.state.email}
                        name="email"
                        onChange={this.handleChange}
                        helperText={errors.email ? errors.email : ''}
                        error={errors.email ? true : false}
                        placeholder="Ex: koko@koko.com" />

                    <TextField
                        variant="outlined"
                        type="password"
                        label="Password"
                        className={classes.textField}
                        value={this.state.password}
                        name="password"
                        onChange={this.handleChange}
                        helperText={errors.password ? errors.password : ''}
                        error={errors.password ? true : false}
                        placeholder="Tape your password" />

                    <TextField
                        variant="outlined"
                        type="password"
                        label="Password confirm"
                        className={classes.textField}
                        value={this.state.password_confirm}
                        name="password_confirm"
                        onChange={this.handleChange}
                        helperText={errors.password_confirm ? errors.password_confirm : ''}
                        error={errors.password_confirm ? true : false}
                        placeholder="Confirm your password" />

                    <div className={classes.btnBlock}>
                    <Button variant="contained" style={{ backgroundColor: '#ffab91' }} type="submit" className={classes.button} startIcon={<SaveIcon />} value="Submit">Submit</Button>
                    </div>
                </form>
            </Paper>
        )
    }
}

const mapStateToProps = (state) => ({
    errors: state.errors
})

export default connect(mapStateToProps, { registrationUser })(withRouter(withStyles(styles)(Registration)))