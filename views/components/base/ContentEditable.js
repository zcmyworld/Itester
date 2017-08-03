
import React from 'react';
import Reflux from 'reflux';

export default class ContentEditable extends Reflux.Component {
    render() {
        return <div
            ref='ContentEditable'
            onInput={() => this.emitChange() }
            contentEditable
            dangerouslySetInnerHTML={{ __html: this.props.html }}></div>;
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.html !== this.getDOMNode().innerHTML;
    }

    componentDidUpdate() {
        if (this.props.html !== this.getDOMNode().innerHTML) {
            this.getDOMNode().innerHTML = this.props.html;
        }
    }

    keyPress(e) {
        // force set last html for copy and paste events
        this.lastHtml = this.getDOMNode().innerHTML;

        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            // do something with this.lastHtml
        }
    }

    emitChange() {
        // var html = this.getDOMNode().innerHTML;
        console.log(this.refs.ContentEditable.innerHTML)
        this.props.onChange();
        // console.log(html)
        // if (this.props.onChange && html !== this.lastHtml) {
        //     this.props.onChange({
        //         target: {
        //             value: html
        //         }
        //     });
        // }
        // this.props.onChange();
        // this.lastHtml = html;
        // console.log(this)
    }
}