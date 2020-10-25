import React from 'react';
import Select from 'react-select'

class MySelect extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){
        this.props.handleChange(event,this.props.name);
    }


    render() {
        console.log('defaultIndex: '+this.props.defaultValue);
        return (
            <div>
                <label htmlFor={this.props.label}>{this.props.label}</label>
                <Select
                    id={this.props.id}
                    options={this.props.options}
                    onChange={this.handleChange}
                    value={this.props.options[this.props.defaultValue]}
                />
            </div>
        );
    }
}

export default MySelect