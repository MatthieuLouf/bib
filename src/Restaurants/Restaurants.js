import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import './Restaurants.css';
import Chip from '@material-ui/core/Chip';
import {LocalFlorist,Brightness5,LocalDining,Public,ImportExport} from '@material-ui/icons';

const types =["Cuisine du marché","Cuisine moderne","Cuisine du terroir","Cuisine traditionnelle","Cuisine régionale"];
const icons = [<LocalFlorist/>,<ImportExport/>,<Brightness5/>,<LocalDining/>,<Public/>];

export default class Restaurants extends React.Component {
    constructor() {
        super()
        this.state = { data: [] }
        this.fetching();
    }

    fetching() {
        fetch('http://localhost:8080/restaurants', {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        }).then(res => res.json().then(json => {
            this.setState({ data: json });

        }));
    }


    render() {
        return (
            <Paper className="paper" elevation={3}>
                <h1 className="title">Maître Restaurateur X Bib Gourmand Restaurants</h1>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="center">Location</TableCell>
                            <TableCell align="center">Phone number</TableCell>
                            <TableCell align="center">Type</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.data.map(row => (
                            <TableRow>
                                <TableCell className="restaurant-name" style={{ backgroundImage: "url('" + row.image_url + "')"}}>
                                    <div>{row.name}</div>
                                </TableCell>
                                <TableCell align="center" className="" >{row.adress.street}<br/>{row.adress.postal_code + " " + row.adress.city}</TableCell>
                                <TableCell align="center">{row.phone_number}</TableCell>
                                <TableCell align="center"><Chip label={row.type} icon={icons[types.indexOf(row.type)]} color="primary" variant="outlined"/></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        );
    }

}