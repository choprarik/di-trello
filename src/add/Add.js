import React from 'react';

class Add extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            edit: false
        };
    }
    render() {
        if (this.state.edit) {
            return <div className="col-layout add">
                <div className="card">
                    <textarea
                    className="sans-border"
                    placeholder={'Enter a title for this ' + this.props.name + '...'}
                    value={this.state.value}
                    onChange={this.handleChange.bind(this)}>
                    </textarea>
                </div>
                <footer>
                    <div className="row-layout">
                        <div className="app-button accent" onClick={this.addOption.bind(this)}>Add {this.props.name}</div>
                        <div className="app-button" onClick={this.toggle.bind(this)}>Cancel</div>
                    </div>
                </footer>
            </div>
        } else {
            return <div className="app-button" onClick={this.toggle.bind(this)}>Add {this.props.name}
            </div>
        }
    }

    handleChange(event) {
        this.setState({
            value: event.target.value
        });
    }

    addOption() {
        this.props.addOption(this.state.value);
        this.toggle();
    }

    toggle() {
        let state = this.state;
        state.edit = !this.state.edit;
        state.value = '';
        this.setState(state);
    }
}
export default Add;