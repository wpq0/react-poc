import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

const Nodes = (nodes, currentLanguage) => {
    if(nodes != null && nodes.length) {
        return <ul>{nodes.map(node=>Node(node, currentLanguage))}</ul>
    }
    else {
        return null;
    }
}

const Node = (node, currentLanguage) => (
    <li key={node.id}>
        <div>
            <Link to={`/content/${node.type}/${node.id}/${currentLanguage}/`}>{node.name}</Link>
            {Nodes(node.children, currentLanguage)}
        </div>
    </li>
);

class ContentTree extends React.Component<{tree,currentLanguage}, {}> {
    render() {
        return Nodes(this.props.tree, this.props.currentLanguage);
    }
}

const ConnectedContentTree = connect(state=>({tree:state.tree, currentLanguage: state.currentLanguage}))(ContentTree);
export default ConnectedContentTree;