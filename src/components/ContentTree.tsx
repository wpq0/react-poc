import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import actions from '../actions';
import { ContentNode } from '../types';

const Nodes = (nodes:ContentNode[]|undefined, onNodeClick: (node:ContentNode)=>any) => {
    if(nodes != null && nodes.length) {
        return <ul>{nodes.map(node=>Node(node, onNodeClick))}</ul>
    }
    else {
        return null;
    }
}

const Node = (node:ContentNode, onNodeClick: (node:ContentNode)=>any) => (
    <li key={node.id}>
        <div>
            <Link to={`/content/${node.type}/${node.id}/`} onClick={()=>onNodeClick(node)}>{node.name}</Link>
            {Nodes(node.children, onNodeClick)}
        </div>
    </li>
);

class ContentTree extends React.Component<{tree} & typeof actions, {}> {
    render() {
        return Nodes(this.props.tree, (node)=>this.props.loadItem(node.type, node.id));
    }
}

export default connect(state=>({tree:state.tree}), actions)(ContentTree);