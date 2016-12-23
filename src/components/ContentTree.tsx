import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { loadItem } from '../actions';

const Nodes = (nodes, onNodeClick) => {
    if(nodes != null && nodes.length) {
        return <ul>{nodes.map(node=>Node(node, onNodeClick))}</ul>
    }
    else {
        return null;
    }
}

const Node = (node, onNodeClick) => (
    <li key={node.id}>
        <div>
            <Link to={`/content/${node.type}/${node.id}/`} onClick={()=>onNodeClick(node)}>{node.name}</Link>
            {Nodes(node.children, onNodeClick)}
        </div>
    </li>
);

class ContentTree extends React.Component<{tree, dispatch}, {}> {
    render() {
        return Nodes(this.props.tree, this.onNodeClick.bind(this));
    }

    onNodeClick(node) {
      this.props.dispatch(loadItem(node.type, node.id)); 
    }
}

export default connect(state=>({tree:state.tree}))(ContentTree);