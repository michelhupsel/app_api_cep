import CepModel from "../Model/CepModel";

export class CepController {
    static ceps: CepModel[] = [];
    //static returnCep

    static async fetchCep(cep: string): Promise<void> {
        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await response.json();
            if (!data.erro) {
                const cepModel = new CepModel(
                    data.cep,
                    data.logradouro,
                    data.bairro,
                    data.localidade,
                    data.uf
                );
                this.ceps.push(cepModel)
            } else {
                console.log('CEP não encontrado')
                //this.returnCep = true;
            }
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    }

    //static getReturnCeps(): Boolean {
    //    return this.returnCep;
    //}

    static getCeps(): CepModel[] {
        return this.ceps;
    }
}