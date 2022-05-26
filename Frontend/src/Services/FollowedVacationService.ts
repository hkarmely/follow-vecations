import axios from "axios";
import FollowedVacationModel from "../Models/FollowedVacationModel";
import { addFollowedVacationAction,  deleteFollowedVacationAction,  fetchFollowedVacationsAction } from "../Redux/FollowedVacationsState";
import { followedVacationsStore } from "../Redux/Store";
import config from "../Utils/Config";

class FollowedVacationsService {
    getFollowedVacations() {
        throw new Error("Method not implemented.");
    }

    public async getAllFollowedVacations(): Promise<FollowedVacationModel[]> {
        if (followedVacationsStore.getState().followedVacations.length === 0) {
            const response = await axios.get<FollowedVacationModel[]>(config.urls.followedVacations);
            const followedVacations = response.data;
            followedVacationsStore.dispatch(fetchFollowedVacationsAction(followedVacations)); // Send downloaded followedVacations to Redux.
             return followedVacations;
        }
        else {
            const followedVacations = followedVacationsStore.getState().followedVacations;
            return followedVacations;
        }
    }
   
    public async getUserFollowedVacation(id: number): Promise<FollowedVacationModel[]> {
            const response = await axios.get<FollowedVacationModel[]>(config.urls.followedVacations+ `${id}`);
            const followedVacations = response.data;

            return followedVacations; 
    }  

    public async addFollowedVacation(id: number, vacationId: number): Promise<FollowedVacationModel> {
        const myFormData = new FormData();
        myFormData.append("userId", id.toString());
        myFormData.append("vacationId", vacationId.toString());
        const response = await axios.post<FollowedVacationModel>(config.urls.followedVacations, myFormData); // Must send FormData and not followedVacation
        const addedFollowedVacation = response.data;
        followedVacationsStore.dispatch(addFollowedVacationAction(addedFollowedVacation));
        return addedFollowedVacation;
    }

    public async deleteFollowedVacation(id: number, vacationId: number): Promise<void> {
        await axios.delete(config.urls.followedVacations + `${id}/${vacationId}`);
        followedVacationsStore.dispatch(deleteFollowedVacationAction(id));
    }

}

// Single object:
const followedVacationsService = new FollowedVacationsService();
export default followedVacationsService;