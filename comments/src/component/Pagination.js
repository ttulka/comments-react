import React, {Component} from 'react';

import './Pagination.css';

const label_def = 'Next'

class Pagination extends Component {
    constructor(props) {
        super(props);

        this.next = props.next;
        this.onLoadNextItems = props.onLoadNextItems;
        this.label = props.label || label_def;
    }

    loadNextItems = (loadFn, next) => e => {
        e.preventDefault();
        loadFn(next);
    }

    render() {
        return  (
        <nav>
            <ul className="pagination">
                <li className="page-item">
                    <a onClick={this.loadNextItems(this.onLoadNextItems, this.next)} className="page-link" href="#">{this.label}</a>
                </li>
            </ul>
        </nav>
        );
    }
}

export default Pagination;