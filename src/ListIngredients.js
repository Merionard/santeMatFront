import React, {useEffect, useState} from 'react';
import {AgGridReact} from 'ag-grid-react';
import {  Link } from 'react-router-dom';


import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';


function ListIngredients() {
    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);


    const [rowData, setRowData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/ingredient/list')
            .then(result => result.json())
            .then(rowData => setRowData(rowData))
    }, []);

    const columnDefs = [
        {field: 'categorie', filter: true, sortable: true,},
        {
            field: 'nom',
            cellRenderer: function (params) {
                console.log(params);
                return `<a href="/ingredient/${params.data.nom}">${params.data.nom}</a>`;
            },
            filter: true,
            sortable: true,
        },
        {field: 'apportNutritionnel.potassium', headerName: 'potassium'},
        {field: 'apportNutritionnel.sodium', headerName: 'sodium'},
        {field: 'apportNutritionnel.calcium', headerName: 'calcium'},
        {field: 'apportNutritionnel.magnesium', headerName: 'magnesium'},
        {field: 'apportNutritionnel.phosphore', headerName: 'phosphore'},
        {field: 'typeComptabilisation'}
    ];


    return (
        <div className="ag-theme-alpine" style={{height: 400, width: 1700}}>
            <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}>
            </AgGridReact>
        </div>
    );
};

export default ListIngredients;