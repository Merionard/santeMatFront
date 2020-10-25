import React from "react";
import {Form} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import MySelect from "./MySelect";
import ligneRecette from"./ligneRecette.css"

function LigneRecette(props) {
    return (<Form.Row>

            <Form.Row>
                <Col>
                    <MySelect
                        name="listeIngredients"
                        id="listeIngredients"
                        label="liste Ingredients"
                        options={categorieOptions}>
                    </MySelect>
                </Col>
                <Col>
                <Form.Label>quantite</Form.Label>
                <Form.Control
                    type="number"
                    step=".01"
                    placeholder="quantite"
                    id="quantite"
                    name="quantite"
                />
                </Col>
            </Form.Row>
        </Form.Row>

    )
}

const categorieOptions = [
    {value: 'LEGUME', label: 'Legume'},
    {value: 'FRUITS', label: 'Fruits'},
    {value: 'POISSON', label: 'Poisson'},
    {value: 'VIANDE', label: 'Viande'},
    {value: 'FECULENT', label: 'Feculent'},
    {value: 'HERBE', label: 'Herbe'},
];

export default LigneRecette;