import React from "react"
import DataTable, { createTheme } from 'react-data-table-component';

function Employees(props) {


    const list1 = {
        top: '23%',
        display: 'block',
        position: 'fixed',
        left: 0,
        right: 0,
        cursor: "pointer",
        margin: 'auto',
        maxWidth: '400px',
        width: '100%'
    }
    const list = {
        top: '27%',
        display: 'block',
        position: 'fixed',
        left: 0,
        right: 0,
        background: 'rgb(0, 0, 0, 0.4)',
        // top: 0,
        margin: 'auto',
        padding: '35px',
        maxWidth: '400px',
        width: '100%'
    }
    createTheme('solarized', {
        text: {
            primary: '#268bd2',
            secondary: '#2aa198',
        },
        background: 'rgb(0, 0, 0, 0.4)',

        context: {
            background: 'rgb(0, 0, 0, 0.4)',
            text: '#FFFFFF',
        },
        divider: {
            default: '#073642',
        },
    });


    const columns = [
        {
            name: 'First Name',
            selector: 'firstName',
            sortable: true,
        },
        {
            name: 'Last Name',
            selector: 'lastName',
            sortable: true,
        }
    ]
    const data = [
        {
            firstName: 'John',
            lastName: 'Wick'
        },

        {
            firstName: 'Lionel',
            lastName: 'Messi'
        },
        {
            firstName: 'raghu',
            lastName: 'ram'
        },
        {
            firstName: 'Cristiano',
            lastName: 'Ronaldo'
        },
        {
            firstName: 'Roberto',
            lastName: 'Firmino'
        }

    ]
    const submit = () => {
        localStorage.removeItem('jwtToken');
        window.location.href = '/'
    }
    return (
        <div>
            <p onClick={submit} style={list1}>Logout</p>
            <DataTable
                style={list}
                // title="Employes"
                noHeader={false}
                columns={columns}
                data={data}
                theme="solarized"
            />
        </div>

    )
}



export default (Employees)