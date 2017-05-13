/**
 * Created by adnanbasar on 12/05/2017.
 *
 * @flow
 */

import React from 'react'
import {ListView} from 'react-native'

type Props = {
    data: Array<Object>
}

class CompatListView extends React.Component {

    props: Props

    static defaultProps = {
        data: []
    }

    state: {
        dataSource: ListView.DataSource
    }

    constructor(props: Props) {
        super(props)

        let ds = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2
        })

        this.state = {
            dataSource: cloneWithData(ds, this.props.data)
        }
    }

    componentWillReceiveProps(nextProps: Props) {
        if (this.props.data !== nextProps.data) {
            this.setState({
                dataSource: cloneWithData(this.state.dataSource, nextProps.data)
            })
        }
    }

    render() {
        return (<ListView
            {...this.props}
            dataSource={this.state.dataSource}
            enableEmptySections={true}/>)
    }

}

function cloneWithData(dataSource: ListView.DataSource, data: ?Array<Object>) {
    if (!data) {
        return dataSource.cloneWithRows([]);
    }
    if (Array.isArray(data)) {
        return dataSource.cloneWithRows(data);
    }
    return dataSource.cloneWithRowsAndSections(data);
}

export default CompatListView