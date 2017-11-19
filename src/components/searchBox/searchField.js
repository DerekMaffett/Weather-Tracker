import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';

import theme from './autosuggestTheme.css';
import styles from './styles.css';
import { fetchSuggestions } from '../../api';

const getSuggestionValue = (suggestion) => suggestion;

const renderSuggestion = (suggestion) => {
    return (
        <div>
            {suggestion}
        </div>
    );
};

class SearchField extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: '',
            suggestions: []
        }
    }

    render() {
        const { value, suggestions } = this.state;

        const inputProps = {
            value,
            onChange: this.onChange.bind(this)
        };

        return (
            <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested.bind(this)}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested.bind(this)}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                renderInputComponent={this.renderInputComponent}
                inputProps={inputProps}
                theme={theme}
            />
        );
    }

    renderInputComponent(inputProps) {
        return (
            <div className={styles.inputContainer}>
                <input {...inputProps} />
                <span className={styles.inputPrompt}>Location: </span>
            </div>
        );
    }

    onChange(event, { newValue }) {
        this.setState({
            value: newValue
        });
    };

    onSuggestionsFetchRequested({ value }) {
        fetchSuggestions(value)
            .then((suggestions) => {
                this.setState({ suggestions });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    onSuggestionsClearRequested() {
        this.setState({
            suggestions: []
        });
    };
}

SearchField.propTypes = {
};

export default SearchField;