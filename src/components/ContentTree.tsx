import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { loadItem } from '../actions';

const Nodes = (nodes, currentLanguage, handleClick) => {
    if(nodes != null && nodes.length) {
        return <ul>{nodes.map(node=>Node(node, currentLanguage, handleClick))}</ul>
    }
    else {
        return null;
    }
}

const Node = (node, currentLanguage, handleClick) => (
    <li key={node.id}>
        <div>
            <Link to={`/content/${node.type}/${node.id}/${currentLanguage}/`} onClick={()=>handleClick(node)}>{node.name}</Link>
            {Nodes(node.children, currentLanguage, handleClick)}
        </div>
    </li>
);

class ContentTree extends React.Component<{tree,currentLanguage, dispatch}, {}> {
    render() {
        return Nodes(this.props.tree, this.props.currentLanguage, this.handleClick.bind(this));
    }

    handleClick(node) {
      this.props.dispatch(loadItem(node.type, node.id, this.props.currentLanguage)); 
    }
}

const ConnectedContentTree = connect(state=>({tree:state.tree, currentLanguage: state.currentLanguage}))(ContentTree);
export default ConnectedContentTree;