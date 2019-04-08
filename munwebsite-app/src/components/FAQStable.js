import React, { Component } from 'react';
import {BootstrapTable, 
       TableHeaderColumn} from 'react-bootstrap-table';

import '../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css'
 
 
class FAQStable extends Component {
  render() {
    return (
      <div>
        <BootstrapTable data={this.props.data}>
          <TableHeaderColumn isKey={true} dataField='FAQ_id'>
            FAQ_id
          </TableHeaderColumn>
          <TableHeaderColumn dataField='reply'>
            reply 
          </TableHeaderColumn>
          <TableHeaderColumn dataField='content'>
            content
          </TableHeaderColumn>
          <TableHeaderColumn dataField='id'>
            id
          </TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}
 
export default FAQStable;