import React from 'react';
import Container from "@material-ui/core/Container";
import {Button, Form} from "react-bootstrap";
import MySelect from "./MySelect";
import CompteurApportNutritionnel from "./CompteurApportNutritionnel";
import {withRouter} from "react-router-dom";
import Select from "react-select";
import ApportNutritionnel from "./ObjetMetiers/ApportNutritionnel";
import ReleveInformations from "./ObjetMetiers/ReleveInformations";
import Utils from "./Utils/Utils";

class ReleveInfos extends React.Component {

    constructor(props) {
        super(props);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleChangeTension = this.handleChangeTension.bind(this);
        this.addOrRemovePlat = this.addOrRemovePlat.bind(this);
        this.majApportNutritionnel = this.majApportNutritionnel.bind(this);
        this.initialisePlats = this.initialisePlats.bind(this);

        this.state = {
            relevesInformations: props.new? new ReleveInformations():
                new ReleveInformations(props.apportNutritionnel,
                props.periode,
                props.tensionMontante,
                props.tensionDesc,
                props.plats,
                false,
                props.id),

            apportNutritionnel: props.new ? new ApportNutritionnel(0, 0, 0, 0, 0) : props.apportNutritionnel,
            tensionMontante: props.new ? '' : props.tensionMontante,
            tensionDescendante: props.new ? '' : props.tensionDescendante,
            plats: props.new ? [] : props.plats,
            periode: props.new ? '' : props.periode,
        }
    }



    addOrRemovePlat(event) {
        if (event == null) {
            let currentApport = this.state.relevesInformations.apportNutritionnel;
            this.props.handleMajReleve(this.props.index,new ApportNutritionnel().getDelta(currentApport),this.state.relevesInformations);
            this.setState({relevesInformations:this.state.relevesInformations.resetApport()})
            return;
        }

        let plats = [];
        event.forEach(plat => plats.push(plat.value));
        this.majApportNutritionnel(plats);
        this.setState({relevesInformations: this.state.relevesInformations.setPlats(plats)});
    }

    handleSelectChange(event) {

        if (event != null && event.target === 'periode') {
            this.setState({
                relevesInformations: this.state.relevesInformations.setPeriode(event.value)
            })
        }
    }

    majApportNutritionnel(plats) {
        let currentApport = this.state.relevesInformations.apportNutritionnel;
        let newApportNutritionnel =new ApportNutritionnel();
        plats.forEach(plat => newApportNutritionnel.addApport(plat.apportNutritionnel))
        this.setState({relevesInformations: this.state.relevesInformations.setApportNutritionnel(newApportNutritionnel)});
        this.props.handleMajReleve(this.props.index,newApportNutritionnel.getDelta(currentApport),this.state.relevesInformations);
    }

    handleChangeTension(event) {
        this.setState({
            relevesInformations: event.target.name ==='tensionMontante'?
                this.state.relevesInformations.setTensionMontante(event.target.value): this.state.relevesInformations.setTensionDesc(event.target.value)
        });
    }

    initialisePlats(){
        let result = [];
        this.state.relevesInformations.listPlats.forEach(
            plat=>result.push(this.props.listPlats.find(option=>option.label === plat.nom)));
        return result;
    }

    render() {
        return <Container>
            <h3>Relevé d'informations</h3>
            <div className="col-md-12">
                <Form onSubmit={this.handleSubmit}>

                    <CompteurApportNutritionnel apportNutritionnel={this.state.relevesInformations.apportNutritionnel}/>
                    <Form.Row>

                        <Form.Group className={"col-md-3"}>
                            <MySelect
                                name="periode"
                                id="periode"
                                label="Période déclaration"
                                options={periodeOptions}
                                handleChange={this.handleSelectChange}
                                defaultValue={this.state.relevesInformations.periode !== null ?
                                    Utils.getValueIndexFromArray(this.state.relevesInformations.periode, periodeOptions) : ""}>
                            </MySelect>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group className={"col-md-3"}>
                            <Form.Label>Tension Montante</Form.Label>
                            <Form.Control
                                type="number"
                                step=".01"
                                id="tensionMontante"
                                name="tensionMontante"
                                onChange={this.handleChangeTension}
                                value={this.state.relevesInformations.tensionMontante}
                            />
                        </Form.Group>

                        <Form.Group className={"col-md-3"}>
                            <Form.Label>Tension descendante</Form.Label>
                            <Form.Control
                                type="number"
                                step=".01"
                                id="tensionDescendante"
                                name="tensionDescendante"
                                onChange={this.handleChangeTension}
                                value={this.state.relevesInformations.tensionDesc}
                            />
                        </Form.Group>

                        <div className={"col-md-3"}>
                            <label htmlFor="Sélectionnez vos repas">Sélectionnez vos repas</label>
                            <Select
                                id="selectRepas"
                                options={this.props.listPlats}
                                onChange={this.addOrRemovePlat}
                                isMulti
                                className="basic-multi-select"
                                classNamePrefix="select"
                                value={this.initialisePlats(this.state.relevesInformations.listPlats,this.props.listPlats)}
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

export default withRouter(ReleveInfos);