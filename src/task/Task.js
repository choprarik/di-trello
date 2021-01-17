import React from 'react';

class Task extends React.Component {
    render() {
        let task = this.props.task;
        return <div className="card">
                <div className="card-header">
                    <span>{task.title}</span>
                    {/* <span className="app-button">x</span> */}
                </div>
                {this.getDescription(task)}
            </div>
    }

    getDescription(task) {
        if (task.description) {
            return <div className="card-content">{task.description}</div>
        }
    }
}
export default Task;