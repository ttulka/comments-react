import React, {Component} from 'react';

import './Pagination.css';

const label_def = 'Next'

class Pagination extends Component {
    constructor(props) {
        super(props);

        this.label = props.label || label_def;
        this.onLoadNextItems = props.onLoadNextItems;

        this.onNext = this.onNext.bind(this);
    }

    onNext(e) {
        e.preventDefault();
        this.onLoadNextItems();
    }

    render() {
        return  (
        <nav>
            <ul className="pagination">
                <li className="page-item">
                    <a onClick={this.onNext} className="page-link" href="#">{this.label}</a>
                </li>
            </ul>
        </nav>
        );
    }
}

export default Pagination;