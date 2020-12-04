import * as React from 'react';
import { Grid } from '@material-ui/core';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setFilter } from '../redux/actions/Todo';
import { StyledButton } from '../utils/Extra'

const Filter = {
    ALL: 'ALL',
    ACTIVE: 'ACTIVE',
    COMPLETED: "COMPLETED"
}
const FilterButton = (props) => {
    return (
        <Grid container direction="row" justify="center" alignItems="center">
            <Grid container item xs={2} direction="row" justify="center" alignItems="center">
                <span>{`ALL(${props.todo.length})`}</span>
            </Grid>
            <Grid container item xs={10} direction="row" justify="center" alignItems="center">
                {Object.keys(Filter).map(filter => {
                    return <StyledButton id={`${filter}_filter`} key={filter} isactive={(props.filterType === filter).toString()} onClick={() => props.setFilter(Filter[filter])}>{filter}</StyledButton>
                })}
            </Grid>
        </Grid>
    )
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            setFilter,
        },
        dispatch,
    );
};

const mapStateToProps = (state) => ({
    todoList: state.domain.todoList,
    filterType: state.domain.filterType
});


export default connect(mapStateToProps, mapDispatchToProps)(FilterButton)
