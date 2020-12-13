import React from 'react';
import moment from "moment";
import Container from "react-bootstrap/Container";
import {Button, Form} from "react-bootstrap";
import RapportJournalier from "./RapportJournalier";
import axios from "axios";
import Rapport from "./ObjetMetiers/Rapport";

class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {noRapport: true,newRapport:false}
        this.addNewRapportJournalier = this.addNewRapportJournalier.bind(this);
        this.saveRapportJournalier = this.saveRapportJournalier.bind(this);

        let date = moment().format('DD-MM-YYYY');
        fetch('http://localhost:8080/rapportJournalier/findByDate/' + date)
            .then(response => {
                    if (response.status === 200) {
                        return response.json();
                    }
                }
            )
            .then((rapport) => {

                if (rapport !== undefined) {
                    this.setState(
                        {
                            noRapport: false,
                            rapportId: rapport.id,
                            rapportDate: rapport.date,
                            relevesInfosRapport: rapport.relevesInfos
                        });
                }
            })
            .catch(error => console.log('for the url: http://localhost:8080/rapportJournalier/' + date + ' error:' + error));
    }

    addNewRapportJournalier() {
        this.setState({newRapport:true,noRapport:false});
    }

    saveRapportJournalier(rapportJournalier){

        console.log(Rapport.toJson(rapportJournalier));

        axios.post('http://localhost:8080/rapportJournalier/add', Rapport.toJson(rapportJournalier))
            .then(response => {
                console.log(response)
                if(response.status===200){
                    alert('Le rapport a bien été enregistré')
                }
            })
            .catch(error => alert('une erreur est survenue dsl...' + error));
    }


    render() {
        if (this.state.noRapport) {
            return <Container>
                <h3>Aucun rapport déclaré pour le moment</h3>
                <Form.Row>
                    <Button variant="success" type="button" onClick={() => this.addNewRapportJournalier()}>
                        Créer nouveau rapport
                    </Button>
                </Form.Row>
            </Container>
        }
        if (this.state.newRapport) {
            return <Container>
                        <RapportJournalier isNew={true}
                        saveRapport={(rapportJournalier)=>this.saveRapportJournalier(rapportJournalier)}/>
                    </Container>
        }
        return <Container>
            <RapportJournalier
                id={this.state.rapportId}
                date={this.state.rapportDate}
                relevesInformations={this.state.relevesInfosRapport}
                isNew={false}
                saveRapport={(rapportJournalier)=>this.saveRapportJournalier(rapportJournalier)}
            />
        </Container>

    }

}

export default Dashboard;
