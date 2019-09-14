// Core
import React, { Component } from 'react';
import { connect } from 'react-redux';

// Instruments
import Styles from './styles.m.css';

const mapStateToProps = state => {
  return {
    isSpinning: state.uiReducer.get('isSpinning'),
  };
};

@connect(mapStateToProps)
export default class Spinner extends Component {
    render () {
        const { isSpinning } = this.props;

        return isSpinning ? <div className = { Styles.spinner } /> : null;
    }
}
