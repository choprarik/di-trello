import React from 'react';
import './Swimlane.css';
import Task from '../task/Task';
import { Droppable, Draggable } from 'react-beautiful-dnd';

const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: 'none',
    background: isDragging ? 'grey' : 'none',

    ...draggableStyle
});

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    width: 250
});

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
            <div className="app-button" onClick={() => { console.log("add card") }}>
                Add Card
            </div>
        </div>
    }
}
export default Swimlane;