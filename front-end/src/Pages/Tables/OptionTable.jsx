import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});
  
  const OptionTable = ({data}) => {
    const classes = useStyles();
    if(data){
    return (
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Company Name</TableCell>
              <TableCell align="right">Ticker</TableCell>
              <TableCell align="right">Option Type</TableCell>
              <TableCell align="right">Buy In Price</TableCell>
              <TableCell align="right">Strike Price</TableCell>
              <TableCell align="right">Expiration</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.company}
                </TableCell>
                <TableCell align="right">{row.ticker}</TableCell>
                <TableCell align="right">{row.option_type}</TableCell>
                <TableCell align="right">{row.buy_in_price}</TableCell>
                <TableCell align="right">{row.strike_price}</TableCell>
                <TableCell align="right">{row.expiration}</TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }else{
    return(
      <div>
        Loading
      </div>
    )
  }}


export default OptionTable