import axios from "axios";
import VacationModel from "../Models/VacationModel";
import { deleteVacationAction, fetchVacationsAction, updateVacationAction } from "../Redux/VacationsState";
import { vacationsStore } from "../Redux/Store";
import config from "../Utils/Config";

class VacationsService {

    public async getAllVacations(): Promise<VacationModel[]> {
        if (vacationsStore.getState().vacations.length === 0) {
            const response = await axios.get<VacationModel[]>(config.urls.vacations);
            const vacations = response.data;
            vacationsStore.dispatch(fetchVacationsAction(vacations)); // Send downloaded vacations to Redux.
            return vacations;
        }
        else {
            const vacations = vacationsStore.getState().vacations;
            return vacations;
        }
    }

    public async getOneVacation(id: number): Promise<VacationModel> {
        const vacations = vacationsStore.getState().vacations;
        const vacation = vacations.find(p => p.vacationId === id);
        if (vacation) {
            return vacation;
        }
        const response = await axios.get<VacationModel>(config.urls.vacations + id);
        return response.data;
    }

    public async addVacation(vacation: VacationModel): Promise<VacationModel> {
        const myFormData = new FormData();
        myFormData.append("description", vacation.description);
        myFormData.append("destination", vacation.destination);
        myFormData.append("fromDate", vacation.fromDate.toString());
        myFormData.append("toDate", vacation.toDate.toString());
        myFormData.append("price", vacation.price.toString());
        myFormData.append("image", vacation.image.item(0)); // FileList has to be converted to File
        const response = await axios.post<VacationModel>(config.urls.vacations, myFormData); // Must send FormData and not vacation
        const addedVacation = response.data;
        return addedVacation;
    }

    public async updatePartialVacation(vacation: VacationModel): Promise<VacationModel> {
        const myFormData = new FormData();
        myFormData.append("description", vacation.description);
        myFormData.append("destination", vacation.destination);
        myFormData.append("fromDate", vacation.fromDate.toString());
        myFormData.append("toDate", vacation.toDate.toString());
        myFormData.append("price", vacation.price.toString());
        myFormData.append("image", vacation.image.item(0)); // FileList has to be converted to File
        const response = await axios.patch<VacationModel>(config.urls.vacations + vacation.vacationId, myFormData); // Must send FormData and not vacation
        const updatedVacation = response.data;
        vacationsStore.dispatch(updateVacationAction(updatedVacation));
        return updatedVacation;
    }


    public async deleteVacation(id: number): Promise<void> {
        await axios.delete(config.urls.vacations + id);
        vacationsStore.dispatch(deleteVacationAction(id));
    }
}
 
// Single object:
const vacationsService = new VacationsService();

export default vacationsService;