import React, {useEffect, useState} from 'react';
import {AgGridColumn, AgGridReact} from 'ag-grid-react';

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


    return (
        <div className="ag-theme-alpine" style={{height: 400, width: 1700}}>
            <AgGridReact
                rowData={rowData}>
                <AgGridColumn field="categorie" sortable={true}></AgGridColumn>
                <AgGridColumn field="nom" sortable={true} filter={true}></AgGridColumn>
                <AgGridColumn field="apportNutritionnel.potassium"></AgGridColumn>
                <AgGridColumn field="apportNutritionnel.sodium"></AgGridColumn>
                <AgGridColumn field="apportNutritionnel.calcium"></AgGridColumn>
                <AgGridColumn field="apportNutritionnel.magnesium"></AgGridColumn>
                <AgGridColumn field="apportNutritionnel.phosphore"></AgGridColumn>
                <AgGridColumn field="typeComptabilisation"></AgGridColumn>
            </AgGridReact>
        </div>
    );
};

export default ListIngredients;