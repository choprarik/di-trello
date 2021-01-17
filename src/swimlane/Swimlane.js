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

    render() {
        let swimlane = this.props.swimlane;
        let tasks = [];
        if (swimlane && swimlane.tasks) {
            for (let i = 0; i < swimlane.tasks.length; i++) {
                tasks.push(<Task task={swimlane.tasks[i]}></Task>);
            }
        }
        return <div className="swimlane" key={swimlane.id}>
            <header>
                <span className="swimlane-header">{swimlane.title}</span>
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