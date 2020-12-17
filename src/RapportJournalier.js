import React from 'react';
import Container from "@material-ui/core/Container";
import {Button, Form} from "react-bootstrap";
import CompteurApportNutritionnel from "./CompteurApportNutritionnel";
import {withRouter} from "react-router-dom";
import ApportNutritionnel from "./ObjetMetiers/ApportNutritionnel";
import ReleveInfos from "./ReleveInfos";
import Rapport from "./ObjetMetiers/Rapport";

class RapportJournalier extends React.Component {

    constructor(props) {
        super(props);
        this.addReleve = this.addReleve.bind(this);
        this.handleDeleteReleve = this.handleDeleteReleve.bind(this);
        this.handleMajReleve = this.handleMajReleve.bind(this);
        this.majApportNutritionnel = this.majApportNutritionnel.bind(this);
        this.initialiseListPlats = this.initialiseListPlats.bind(this);

        this.state = {
            rapportJournalier: props.isNew ? new Rapport() :
                new Rapport(false, props.date, props.relevesInformations),
            apportNutritionnel: props.isNew?new ApportNutritionnel(0, 0, 0, 0, 0): props.apportNutritionnel,
            listPlats:[],
        }


    }

    componentDidMount() {
        fetch('http://localhost:8080/plat/list')
            .then(result => result.json())
            .then(plats => this.initialiseListPlats(plats))
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

     initialiseListPlats(plats) {
        if (this.state.listPlats.length === 0) {
            let listPlats = []
            plats.map(plat => listPlats.push({label: plat.nom, value: plat}));
            this.setState({listPlats:listPlats});
        }
    }




    render() {

        let result = this.state.rapportJournalier.relevesInfos.map((releve, index) =>
            <li style={{listStyleType: "none"}}>
                <ReleveInfos
                    index={index}
                    new={releve.new}
                    apportNutritionnel={releve.new ? null : releve.apportNutritionnel}
                    tensionMontante={releve.new ? null : releve.tensionMontante}
                    tensionDesc={releve.new ? null : releve.tensionDesc}
                    plats={releve.new ? null : releve.listPlats}
                    periode={releve.new ? null : releve.periode}
                    handleDeleteReleve={(index) => this.handleDeleteReleve(index)}
                    handleMajReleve={(index, deltaApport, currentApport) => this.handleMajReleve(index, deltaApport, currentApport)}
                    listPlats={this.state.listPlats}
                />
            </li>)

        console.log(result);


        return <Container>
            <Form.Row>
                <h3>Rapport journalier du {this.state.rapportJournalier.date} </h3>
                <div className={"offset-md-5"}>
                    <Button variant="success" type="button" onClick={() => this.props.saveRapport(this.state.rapportJournalier)}>
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


export default withRouter(RapportJournalier);