import React from "react";
import {Button, Form} from "react-bootstrap";
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
                        options={props.listIngredients}
                        handleChange={props.handleChange}
                        count = {props.count}>
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
                    onChange={(event)=>props.handleQteChange(event,props.count)}
                />
                </Col>
                    <Button variant="primary" style={{margin:31}}  onClick={()=>props.delete(props.count)}>
                        Supprimer la ligne
                    </Button>
            </Form.Row>
        </Form.Row>

    )
}


export default LigneRecette;