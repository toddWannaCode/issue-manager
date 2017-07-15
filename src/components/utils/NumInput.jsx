import React,{ Component } from 'react';

export default class NumInput extends Component {
    constructor(props) {
        super(props)
        this.state = { value: this.format(props.value) };
        this.onBlur = (e) => {
            this.props.onChange(e, this.unformat(this.state.value))
        }

        this.onChange = (e) => {
            if(+e.target.vale)
                this.setState({ value: e.target.value })
        }
    }    

    componentWillReceiveProps(newProps) {
        this.setState({ value: this.format(newProps.value) })
    }


    format(num) {
        return +num ? `${num}` : ''
    }

    unformat(str) {
        return +str ? ~~str : null
    }

    render() {
        return(
            <input
                type="text" {...this.props} value={this.state.value}
                onBlur={this.onBlur} onChange={this.onChange}
            />
        )
    }
}