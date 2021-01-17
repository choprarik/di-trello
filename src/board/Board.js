import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import Swimlane from '../swimlane/Swimlane';

class Board extends React.Component {

    state = {
        board: this.getBoardData()
    };

    getList (id) {
        return this.state.board.swimlanes.filter(item => item.id === id)[0].tasks;
    }
    
    render() {
        let board = this.state.board;
        let sLanes = [];
        if (board && board.swimlanes) {
            for (let i=0; i<board.swimlanes.length; i++) {
                sLanes.push(<Swimlane swimlane={board.swimlanes[i]}></Swimlane>);
            }
        }
        return <div className="board">
            <header className="board-header row-layout">
                <span className="app-button">
                    <span>
                        Board: {board.title}
                    </span>
                </span>
            </header>
            <div className="designer row-layout">
                <DragDropContext onDragEnd={this.onDragEnd}>
                    {sLanes}
                </DragDropContext>
                <div className="swimlane app-button" onClick={() => {console.log("add swimlane")}}>
                    Add Swimlane
                </div>
            </div>
        </div>
    }

    reorder (list, startIndex, endIndex) {
        const [removed] = list.splice(startIndex, 1);
        list.splice(endIndex, 0, removed);
    };
    
    // Move item from one list to other
    move (source, destination, droppableSource, droppableDestination) {
        // const sourceClone = Array.from(source);
        // const destClone = Array.from(destination);
        const [removed] = source.splice(droppableSource.index, 1);
    
        destination.splice(droppableDestination.index, 0, removed);
    
        // const result = {};
        // result[droppableSource.droppableId] = sourceClone;
        // result[droppableDestination.droppableId] = destClone;
    
        // return result;
    };

    onDragEnd = (result) => {
        const { source, destination } = result;

        if (!destination) {
            return;
        }

        // Sorting in same list
        if (source.droppableId === destination.droppableId) {
            this.reorder(
                this.getList(source.droppableId),
                source.index,
                destination.index
            );
/* 
            let state = { items };

            if (source.droppableId === 'droppable2') {
                state = { selected: items };
            }

            this.setState(state); */
        }
        // Interlist movement
        else {
            this.move(
                this.getList(source.droppableId),
                this.getList(destination.droppableId),
                source,
                destination
            );

            // this.setState({
            //     items: result.droppable,
            //     selected: result.droppable2
            // });
        }
        this.setState({
            ...this.state
        });
    };

    getBoardData() {
        return {
            title: "Custom board",
            swimlanes: [
                {
                    id: "list_1",
                    title: "To Do",
                    tasks: [{
                        title: "Task 1",
                        description: "Create wire frame",
                        id: "task_1",
                        index: 0,
                        swimlaneId: 1
                    },
                    {
                        title: "Task 2",
                        description: "Convert to React",
                        id: "task_2",
                        index: 1,
                        swimlaneId: 1
                    },
                    {
                        title: "Task 3",
                        description: "Add CSS to the page",
                        id: "task_3",
                        index: 2,
                        swimlaneId: 1
                    },
                    {
                        title: "Task 4",
                        description: "Implement drag drop",
                        id: "task_4",
                        index: 3,
                        swimlaneId: 1
                    },
                    {
                        title: "Task 5",
                        description: "Unit test and code push",
                        id: "task_5",
                        index: 5,
                        swimlaneId: 1
                    },
                    {
                        title: "Task 6",
                        description: "Additional changes",
                        id: "task_6",
                        index: 5,
                        swimlaneId: 1
                    }
                ]
                },
                {
                    id: "list_2",
                    title: "In Progress",
                    tasks: []
                },
                {
                    id: "List_3",
                    title: "Completed",
                    tasks: []
                }
            ]
        }
    };
}
export default Board;