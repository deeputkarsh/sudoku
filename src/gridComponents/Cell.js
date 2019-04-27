import React, { PureComponent } from 'react';

import { connect } from 'react-redux';
import { updateCellValue } from '../reduxHelpers/actions';

const mapStateToProps = (state,ownProps) => {
    const value = state.valueMatrix[ownProps.row][ownProps.col];
    const wasEntered = state.editedValueMatrix[ownProps.row][ownProps.col];
    return {
        value,
        wasEntered,
        isEditing: state.isEditing
    }
};

class Cell extends PureComponent {
    onInputChange = (event)=>{
        const newValue = Number(event.target.value);
        if(!isNaN(newValue) && newValue>=0 && newValue<=9) {
            this.props.updateCellValue({
                row : this.props.row,
                col : this.props.col,
                newValue : newValue || ''
            });
        }
    }
    render() {
        const {
            isEditing,
            wasEntered,
            value
        } = this.props;
        return (
            <div className={`sudoku-cell${wasEntered?' user-entered':''}`}>
                {isEditing?
                    <input onChange={this.onInputChange} value={value}/>
                    : 
                    <span>{value}</span>
                }
            </div>
        );
    }
}
export default connect(mapStateToProps,{updateCellValue})(Cell);