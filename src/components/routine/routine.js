import React from 'react';
import Exercise from './../exercise/exercise.js';
// - - -
import s from './routine.module.css';

export default class Routine extends React.Component {
    constructor(props) {
        super(props);
        this.increment = this.increment.bind(this);
        this.state = {
            activeExercise: 0,
        }
    }
    increment() {
        if (this.state.activeExercise === this.props.routine.length - 1) {
            console.log('What do I do here?');
            //go back to first page?
            //add new exercise?
            //Back to start of routine?
            //list of options?
        } else {
            this.setState({
                activeExercise: this.state.activeExercise + 1
            });
        }
    }

    render(props) {
        const {
            name = '',
            routine = [ ],
            updateStorage,
            fullData = {}
        } = this.props;

        return (
            <div className={s.container}>
                <h1 className={s.title}>{name}</h1>
                <Exercise
                    fullData={fullData}
                    updateStorage={updateStorage}
                    nextExercise={this.increment}
                    exercise={routine[this.state.activeExercise]}
                    updateFullState={this.props.updateFullState}
                />
            </div>
        );
    }
}
