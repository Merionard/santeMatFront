import React, {useEffect, useState} from 'react';
import {AgGridReact} from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';


function ListPlats() {

    const [rowData, setRowData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/plat/list')
            .then(result => result.json())
            .then(rowData => setRowData(rowData))
    }, []);

    const columnDefs = [
        {
            field: 'nom',
            cellRenderer: function (params) {
                return `<a href="/plat/${params.data.nom}">${params.data.nom}</a>`;
            },
            filter: true,
            sortable: true,
        },
        {field: 'apportNutritionnel.potassium', headerName: 'potassium'},
        {field: 'apportNutritionnel.sodium', headerName: 'sodium'},
        {field: 'apportNutritionnel.calcium', headerName: 'calcium'},
        {field: 'apportNutritionnel.magnesium', headerName: 'magnesium'},
        {field: 'apportNutritionnel.phosphore', headerName: 'phosphore'},
    ];


    return (
        <div className="ag-theme-alpine" style={{height: 400, width: 1205}}>
            <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}>
            </AgGridReact>
        </div>
    );
};

export default ListPlats;