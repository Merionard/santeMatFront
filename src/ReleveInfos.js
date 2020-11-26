import React from 'react';
import Container from "@material-ui/core/Container";
import {Button, Form} from "react-bootstrap";
import MySelect from "./MySelect";
import CompteurApportNutritionnel from "./CompteurApportNutritionnel";
import {withRouter} from "react-router-dom";
import Select from "react-select";
import ApportNutritionnel from "./ObjetMetiers/ApportNutritionnel";

class ReleveInfos extends React.Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.addOrRemovePlat = this.addOrRemovePlat.bind(this);
        this.majApportNutritionnel = this.majApportNutritionnel.bind(this);
        this.state = {
            apportNutritionnel: props.new ? new ApportNutritionnel(0, 0, 0, 0, 0) : props.apportNutritionnel,
            tensionMontante: props.new ? '' : props.tensionMontante,
            tensionDescendante: props.new ? '' : props.tensionDescendante,
            plats: props.new ? [] : props.plats,
            periode: props.new ? '' : props.periode,
        }

    }

    componentDidMount() {
        console.log('init....');
        fetch('http://localhost:8080/plat/list')
            .then(result => result.json())
            .then(plats => initialiseListPlats(plats))
            .catch(error => console.log('for the url: http://localhost:8080/plat/list' + +' error:' + error));
    }


    handleSubmit() {

    }

    addOrRemovePlat(event) {
        if (event == null) {
            let plats = [];
            this.setState({plats: plats, apportNutritionnel: this.state.apportNutritionnel.reset()})
            return;
        }

        let plats = [];

        event.forEach(plat => plats.push(plat.value));
        this.majApportNutritionnel(plats);
        this.setState({plats: plats});
    }

    handleSelectChange(event) {

        console.log(event);
        if (event != null && event.target === 'periode') {
            this.setState({
                periode: event.value
            })
        }
    }

    majApportNutritionnel(plats) {
        let apportNutritionnel = this.state.apportNutritionnel;
        apportNutritionnel.reset();
        plats.forEach(plat => apportNutritionnel.addApport(plat.apportNutritionnel))
        this.setState({apportNutritionnel: apportNutritionnel});
    }

    handleChange(event) {
        console.log('event:' + event)
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
        return <Container>
            <h3>Relevé d'informations</h3>
            <div className="col-md-12">
                <Form onSubmit={this.handleSubmit}>

                    <CompteurApportNutritionnel apportNutritionnel={this.state.apportNutritionnel}/>
                    <Form.Row>

                        <Form.Group className={"col-md-2"}>
                            <MySelect
                                name="periode"
                                id="periode"
                                label="Période déclaration"
                                options={periodeOptions}
                                handleChange={this.handleSelectChange}>
                            </MySelect>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group className={"col-md-2"}>
                            <Form.Label>Tension Montante</Form.Label>
                            <Form.Control
                                type="number"
                                step=".01"
                                id="tensionMontante"
                                name="tensionMontante"
                                onChange={this.handleChange}
                                value={this.state.tensionMontante}
                            />
                        </Form.Group>

                        <Form.Group className={"col-md-2"}>
                            <Form.Label>Tension descendante</Form.Label>
                            <Form.Control
                                type="number"
                                step=".01"
                                id="tensionDescendante"
                                name="tensionDescendante"
                                onChange={this.handleChange}
                                value={this.state.tensionDescendante}
                            />
                        </Form.Group>

                        <div className={"col-md-3"}>
                            <label htmlFor="Sélectionnez vos repas">Sélectionnez vos repas</label>
                            <Select
                                id="selectRepas"
                                options={listPlats}
                                onChange={this.addOrRemovePlat}
                                isMulti
                                className="basic-multi-select"
                                classNamePrefix="select"
                            />
                        </div>
                    </Form.Row>

                    <Form.Row>
                        <Button variant="danger" type="button" onClick={() => this.props.handleDeleteReleve(this.props.index)}>
                            Supprimer le relevé
                        </Button>
                    </Form.Row>
                </Form>
            </div>
        </Container>
    }
}

const periodeOptions = [
    {value: 'MATIN', label: 'Matin', target: 'periode'},
    {value: 'MIDI', label: 'Midi', target: 'periode'},
    {value: 'SOIR', label: 'Soir', target: 'periode'},
    {value: 'CUSTOM', label: 'Custom', target: 'periode'},
];

const listPlats = [];

function initialiseListPlats(plats) {
    plats.map(plat => listPlats.push({label: plat.nom, value: plat, target: 'plat'}))
}

export default withRouter(ReleveInfos);