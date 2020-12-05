import React from 'react';
import Container from "@material-ui/core/Container";
import {Button, Form} from "react-bootstrap";
import CompteurApportNutritionnel from "./CompteurApportNutritionnel";
import {withRouter} from "react-router-dom";
import ApportNutritionnel from "./ObjetMetiers/ApportNutritionnel";
import ReleveInfos from "./ReleveInfos";
import axios from "axios";
import Rapport from "./ObjetMetiers/Rapport";

class RapportJournalier extends React.Component {

    constructor(props) {
        super(props);
        this.addReleve = this.addReleve.bind(this);
        this.handleDeleteReleve = this.handleDeleteReleve.bind(this);
        this.handleMajReleve = this.handleMajReleve.bind(this);
        this.majApportNutritionnel = this.majApportNutritionnel.bind(this);

        this.state = {
            rapportJournalier: props.isNew ? new Rapport() :
                new Rapport(false, props.id, props.date, props.relevesInformations),
            apportNutritionnel: new ApportNutritionnel(0, 0, 0, 0, 0),
        }

        fetch('http://localhost:8080/plat/list')
            .then(result => result.json())
            .then(plats => initialiseListPlats(plats))
            .catch(error => console.log('for the url: http://localhost:8080/plat/list' + +' error:' + error));

    }

    addReleve() {
        this.setState({rapportJournalier: this.state.rapportJournalier.addReleve()})
    }

    handleDeleteReleve(index) {
        let rapportJournalier = this.state.rapportJournalier;
        this.majApportNutritionnel(new ApportNutritionnel().getDelta(rapportJournalier.relevesInfos[index].apportNutritionnel));
        this.setState({rapportJournalier: rapportJournalier.deleteReleve(index)});
    }

    handleMajReleve(index, deltaApport, updatedReleve) {
        let rapportJournalier = this.state.rapportJournalier;
        rapportJournalier.relevesInfos[index] = updatedReleve;
        this.setState({rapportJournalier: rapportJournalier});
        this.majApportNutritionnel(deltaApport)
    }

    majApportNutritionnel(deltaApport) {
        let apportNutritionnel = this.state.apportNutritionnel;
        apportNutritionnel.addApport(deltaApport);
        this.setState({apportNutritionnel: apportNutritionnel});
    }


    handleSubmit() {

        const result = {
            nom: this.state.nomPlat,
            apportNutritionnel: this.state.apportNutritionnel
        };


        axios.post('http://localhost:8080/rapportJournalier/add', result)
            .then(response => {
                console.log(response)
            })
            .catch(error => alert('une erreur est survenue dsl...' + error));


    }


    render() {

        let result = this.state.rapportJournalier.relevesInfos.map((releve, index) =>
            <li style={{listStyleType: "none"}}>
                <ReleveInfos
                    index={index}
                    new={releve.new}
                    apportNutritionnel={releve.new ? null : releve.apportNutritionnel}
                    tensionMontante={releve.new ? null : releve.tension.tensionMontante}
                    tensionDescendante={releve.new ? null : releve.tension.tensionDesc}
                    plats={releve.new ? null : releve.listPlats}
                    periode={releve.new ? null : releve.periode}
                    handleDeleteReleve={(index) => this.handleDeleteReleve(index)}
                    handleMajReleve={(index, deltaApport, currentApport) => this.handleMajReleve(index, deltaApport, currentApport)}
                    listPlats={listPlats}
                />
            </li>)


        return <Container>
            <Form.Row>
                <h3>Rapport journalier du {this.state.rapportJournalier.date} </h3>
                <div className={"offset-md-5"}>
                    <Button variant="success" type="submit">
                        Sauvegarder
                    </Button>
                </div>
            </Form.Row>
            <Form.Row>
                <div className="col-md-12">
                    <Form onSubmit={this.handleSubmit}>

                        <CompteurApportNutritionnel apportNutritionnel={this.state.apportNutritionnel}/>

                        <Button variant="primary" type="button" onClick={() => this.addReleve()}>
                            Ajouter un relevé
                        </Button>

                        <fieldset className="scheduler-border">
                            <legend className="scheduler-border">Synthèse relevé</legend>
                            <ul>
                                {result}
                            </ul>
                        </fieldset>


                    </Form>
                </div>
            </Form.Row>
        </Container>
    }
}

const listPlats = [];

function initialiseListPlats(plats) {
    if (listPlats.length === 0) {
        plats.map(plat => listPlats.push({label: plat.nom, value: plat}));
    }
}

export default withRouter(RapportJournalier);