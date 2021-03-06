import ReleveInformations from "./ReleveInformations";
import moment from "moment";
import ApportNutritionnel from "./ApportNutritionnel";

class Rapport {
    constructor(isNew = true, date, relevesInfos) {
        if (!isNew) {
            this.date = date;
            this.relevesInfos = [];

           if(relevesInfos !== undefined) {
               this.mapAndAddReleves(relevesInfos);
           }

        } else {
            this.date = moment().format('DD-MM-YYYY');
            this.relevesInfos = [];
        }
    }

    mapAndAddReleves(relesInfos) {

        relesInfos.forEach(releve => {

            this.relevesInfos.push(new ReleveInformations(ApportNutritionnel.of(releve.apportNutritionnel),
                releve.periode,
                releve.tension.t_montante,
                releve.tension.t_descendante,
                releve.listPlats,
                false,
                releve.id
            ))
        })
    }

    addReleve(){
        this.relevesInfos.push(new ReleveInformations());
        return this;
    }

    deleteReleve(index){
        this.relevesInfos.splice(index, index + 1);
        return this;
    }

    static toJson(rapportJournalier){
        let json = {
            date:rapportJournalier.date,
            relevesInfos:ReleveInformations.toJson(rapportJournalier.relevesInfos)
        }

        return json;
    }
}

export default Rapport;