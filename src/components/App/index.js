import React, { Component } from "react";
import PropTypes from "prop-types";
import "./App.css";

import { Button } from "../Button";
import { Table } from "../Table";
import { Search } from "../Search";

import {
  DEFAULT_QUERY,
  DEFAULT_PAGE,
  DEFAULT_HPP,
  PATH_BASE,
  PATH_SEARCH,
  PARAM_SEARCH,
  PARAM_PAGE,
  PARAM_HPP
} from "../../constants";

const Loading = () => <div>Loading...</div>;

const withLoading = Component => ({ isLoading, ...rest }) =>
  (isLoading ? <Loading /> : <Component {...rest} />);

const ButtonWithLoading = withLoading(Button);

ButtonWithLoading.PropTypes = {
  isLoading: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  children: PropTypes.node.isRequired
};

const updateSearchTopStories = (hits, page) => prevState => {
  const { searchKey, results } = prevState;
  const oldHits = results && results[searchKey] ? results[searchKey].hits : [];
  const updatedHits = [...oldHits, ...hits];
  return {
    results: {
      ...results,
      [searchKey]: { hits: updatedHits, page }
    },
    isLoading: false
  };
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: null,
      searchKey: "",
      searchTerm: DEFAULT_QUERY,
      isLoading: false
    };

    this.needsToSearchTopsStories = this.needsToSearchTopsStories.bind(this);
    this.setSearchTopstorie = this.setSearchTopstorie.bind(this);
    this.fetchSearchTopstorie = this.fetchSearchTopstorie.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
  }

  needsToSearchTopsStories(searchTerm) {
    return !this.state.results[searchTerm];
  }

  setSearchTopstorie(result) {
    const { hits, page } = result;
    this.setState(updateSearchTopStories(hits, page));
  }

  fetchSearchTopstorie(searchTerm, page) {
    this.setState({ isLoading: true });
    fetch(
      `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`
    )
      .then(response => response.json())
      .then(result => this.setSearchTopstorie(result));
  }

  componentDidMount() {
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm });
    this.fetchSearchTopstorie(searchTerm, DEFAULT_PAGE);
  }

  render() {
    const { searchTerm, results, searchKey, isLoading } = this.state;
    const page =
      (results && results[searchKey] && results[searchKey].page) || 0;
    const list = (results && results[searchKey] && results[searchKey].hits) || [
    ];
    return (
      <div className="page">
        <div className="interactions">
          <Search
            value={searchTerm}
            onChange={this.onSearchChange}
            onSubmit={this.onSearchSubmit}
          >
            Search
          </Search>
        </div>
        <Table list={list} onDismiss={this.onDismiss} />
        <div className="interactions">
          <ButtonWithLoading
            isLoading={isLoading}
            onClick={() => this.fetchSearchTopstorie(searchKey, page + 1)}
          >
            More
          </ButtonWithLoading>
        </div>
      </div>
    );
  }

  onDismiss(id) {
    const { searchKey, results } = this.state;
    const { hits, page } = results[searchKey];
    const isNotId = item => item.objectID !== id;
    const updatedHits = hits.filter(isNotId);
    this.setState({
      results: {
        ...results,
        [searchKey]: { hits: updatedHits, page }
      }
    });
  }

  onSearchSubmit(event) {
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm });
    if (this.needsToSearchTopsStories(searchTerm)) {
      this.fetchSearchTopstorie(searchTerm, DEFAULT_PAGE);
    }
    event.preventDefault();
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }
}

export default App;
