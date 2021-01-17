import React from 'react';
import Task from '../task/Task';
import Add from '../add/Add';
import { Droppable, Draggable } from 'react-beautiful-dnd';

const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: 'none',
    background: isDragging ? 'grey' : 'none',
    ...draggableStyle
});

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey'
});

const getGuid = () => {
    function _p8(s) {
        var p = (Math.random().toString(16) + "000000000").substr(2, 8);
        return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
    }
    return _p8() + _p8(true) + _p8(true) + _p8();
}

class Swimlane extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: this.props.swimlane.title,
            edit: false
        };
    }

    render() {
        let swimlane = this.props.swimlane;
        let tasks = [];
        if (swimlane && swimlane.tasks) {
            for (let i = 0; i < swimlane.tasks.length; i++) {
                tasks.push(<Task task={swimlane.tasks[i]}></Task>);
            }
        }
        let title;
        if (!this.state.edit) {
            title =  <span className="swimlane-header" onClick={this.toggle.bind(this)}>{swimlane.title}</span>;
        } else {
            title = <input className="swimlane-header" autoFocus value={this.state.value} onChange={this.handleTitleChange.bind(this)} onBlur={this.updateSwimlane.bind(this)}></input>;
        }
        return <div className="swimlane" key={swimlane.id}>
            <header>
                {title}
            </header>
            <Droppable droppableId={swimlane.id}>
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}>
                        {swimlane.tasks.map((item, index) => (
                            <Draggable
                                key={item.id}
                                draggableId={item.id}
                                index={index}>
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={getItemStyle(
                                            snapshot.isDragging,
                                            provided.draggableProps.style
                                        )}>
                                        <Task task={item}></Task>
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
            <Add name="Card" addOption={this.addTask.bind(this)} />
        </div>
    }

    toggle() {
        this.setState({
            edit: !this.state.edit
        });
    }

    handleTitleChange(event) {
        this.setState({
            value: event.target.value
        });
    }

    updateSwimlane(event) {
        this.props.swimlane.title = this.state.value;
        this.toggle();
    }

    addTask(taskTitle) {
        if (taskTitle) {
            let id = 'task_' + getGuid();
            if (this.props.swimlane && this.props.swimlane.tasks && this.props.swimlane.tasks.length > 0) {
            } else {
                this.props.swimlane.tasks = [];
            }
            this.props.swimlane.tasks.push({
                title: taskTitle,
                id
            });
            this.setState({
                ...this.state
            });
        }
    }
}
export default Swimlane;