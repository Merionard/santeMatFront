import React from "react";
import {Form} from "react-bootstrap";
import Col from "react-bootstrap/Col";

class CompteurApportNutritionnel extends React.Component{

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <fieldset className="scheduler-border">
                    <legend className="scheduler-border">Apport nutritionnel</legend>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>Potassium</Form.Label>
                            <Form.Control
                                type="number"
                                step=".01"
                                placeholder="0"
                                id="potassium"
                                name="potassium"
                                readOnly
                            />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Calcium</Form.Label>
                            <Form.Control
                                type="number"
                                step=".01"
                                placeholder="0"
                                id="calcium"
                                name="calcium"
                                readOnly
                            />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Magnesium</Form.Label>
                            <Form.Control
                                type="number"
                                step=".01"
                                placeholder="0"
                                id="magnesium"
                                name="magnesium"
                                readOnly
                            />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Sodium</Form.Label>
                            <Form.Control
                                type="number"
                                step=".01"
                                placeholder="0"
                                id="sodium"
                                name="sodium"
                                readOnly
                            />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Phosphore</Form.Label>
                            <Form.Control
                                type="number"
                                step=".01"
                                placeholder="0"
                                id="phosphore"
                                name="phosphore"
                                readOnly
                            />
                        </Form.Group>
                    </Form.Row>

                </fieldset>
            </div>
        );
    }
}

export default CompteurApportNutritionnel;