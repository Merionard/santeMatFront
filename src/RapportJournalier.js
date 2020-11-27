import React from 'react';
import Container from "@material-ui/core/Container";
import {Button, Form} from "react-bootstrap";
import CompteurApportNutritionnel from "./CompteurApportNutritionnel";
import {withRouter} from "react-router-dom";
import ApportNutritionnel from "./ObjetMetiers/ApportNutritionnel";
import moment from "moment";
import ReleveInfos from "./ReleveInfos";
import ReleveInformations from "./ObjetMetiers/ReleveInformations";

class RapportJournalier extends React.Component {

    constructor(props) {
        super(props);
        this.addReleve = this.addReleve.bind(this);
        this.handleDeleteReleve = this.handleDeleteReleve.bind(this);
        this.handleMajReleve = this.handleMajReleve.bind(this);
        this.majApportNutritionnel = this.majApportNutritionnel.bind(this);

        this.state = {
            apportNutritionnel: new ApportNutritionnel(0, 0, 0, 0, 0),
            date: moment().format('DD/MM/YYYY'),
            relevesInformations: [],
        }

    }

    addReleve() {
        let releves = this.state.relevesInformations.slice();
        releves.push(new ReleveInformations());
        this.setState({relevesInformations: releves})
    }

    handleDeleteReleve(index){

       let releves =  this.state.relevesInformations.slice();
       this.majApportNutritionnel(new ApportNutritionnel().deltaApport(releves[index].apportNutritionnel));
       releves.splice(index,index+1);
       this.setState({relevesInformations:releves});
    }

    handleMajReleve(index,deltaApport,newApport){
        let releves = this.state.relevesInformations.slice();
        releves[index].apportNutritionnel=newApport;
        this.setState({relevesInformations:releves});
        this.majApportNutritionnel(deltaApport)
    }

    majApportNutritionnel(deltaApport){
        let apportNutritionnel = this.state.apportNutritionnel;
        apportNutritionnel.addApport(deltaApport);
        this.setState({apportNutritionnel:apportNutritionnel});
    }


    handleSubmit() {

    }


    render() {

        let result = this.state.relevesInformations.map((releve, index) =>
            <li style={{listStyleType: "none"}}>
                <ReleveInfos
                    index={index}
                    new={releve.new}
                    apportNutritionnel={releve.new ? null : releve.apportNutritionnel}
                    tensionMontante={releve.new ? null : releve.tension.tensionMontante}
                    tensionDescendante={releve.new ? null : releve.tension.tensionDesc}
                    plats={releve.new ? null : releve.listPlats}
                    periode={releve.new ? null : releve.periode}
                    handleDeleteReleve={(index)=>this.handleDeleteReleve(index)}
                    handleMajReleve={(index,deltaApport,currentApport)=>this.handleMajReleve(index,deltaApport,currentApport)}
                />
            </li>)


        return <Container>
            <h3>Rapport journalier du {this.state.date} </h3>
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

export default withRouter(RapportJournalier);