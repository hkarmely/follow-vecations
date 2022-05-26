import FollowedVacationModel from "../Models/FollowedVacationModel";

// followedVacations AppState - The application level data:
export class followedVacationsState {
    public followedVacations: FollowedVacationModel[] = [];
}

// followedVacations ActionType - Which actions we can perform on the data:
export enum followedVacationsActionType {
    FetchFollowedVacations = "FetchFollowedVacations", // Must be a strings
    AddFollowedVacation = "AddFollowedVacation",
    UpdateFollowedVacation = "UpdateFollowedVacation",
    UpdatePartialFollowedVacation = "UpdatePartialFollowedVacation",
    DeleteFollowedVacation = "DeleteFollowedVacation"
    // ...
}

// followedVacations Action - A single object containing data to perform for a single ActionType
export interface followedVacationsAction {
    type: followedVacationsActionType; // The action type
    payload: any; // The action data
}

// followedVacations Action Creators - functions for creating action object for sending to dispatch
export function fetchFollowedVacationsAction(followedVacations: FollowedVacationModel[]): followedVacationsAction {
    return { type: followedVacationsActionType.FetchFollowedVacations, payload: followedVacations };
}
export function addFollowedVacationAction(followedVacationToAdd: FollowedVacationModel): followedVacationsAction {
    return { type: followedVacationsActionType.AddFollowedVacation, payload: followedVacationToAdd };
}
export function updateFollowedVacationAction(followedVacationToUpdate: FollowedVacationModel): followedVacationsAction {
    return { type: followedVacationsActionType.UpdateFollowedVacation, payload: followedVacationToUpdate };
}
export function updatePartialFollowedVacationAction(followedVacationToUpdate: FollowedVacationModel): followedVacationsAction {
    return { type: followedVacationsActionType.UpdatePartialFollowedVacation, payload: followedVacationToUpdate };
}
export function deleteFollowedVacationAction(idToDelete: number): followedVacationsAction {
    return { type: followedVacationsActionType.DeleteFollowedVacation, payload: idToDelete };
}

// followedVacations Reducer - the function actually performing the operations:
export function followedVacationsReducer(currentFollowedVacationsState: followedVacationsState = new followedVacationsState(), action: followedVacationsAction): followedVacationsState {

    // Duplicate the current followedVacations state int a new one:
    const newFollowedVacationsState = { ...currentFollowedVacationsState };

    switch (action.type) {

        case followedVacationsActionType.FetchFollowedVacations: // Here action.payload is followedVacations array downloaded from the server
            newFollowedVacationsState.followedVacations = action.payload;
            break;

        case followedVacationsActionType.AddFollowedVacation: // Here action.payload is a single followedVacation to add
            const followedVacation = action.payload;
            if (newFollowedVacationsState.followedVacations.find(p => p.userId === followedVacation.id) === undefined) {
                newFollowedVacationsState.followedVacations.push(action.payload);
            }
            break;

        case followedVacationsActionType.UpdateFollowedVacation: // Here action.payload is a single followedVacation to update
            const indexToUpdate = newFollowedVacationsState.followedVacations.findIndex(p => p.userId === action.payload.id);
            newFollowedVacationsState.followedVacations[indexToUpdate] = action.payload;
            break;

        case followedVacationsActionType.UpdatePartialFollowedVacation: // Here action.payload is a single followedVacation to update
            const indexToPartialUpdate = newFollowedVacationsState.followedVacations.findIndex(p => p.userId === action.payload.id);
            newFollowedVacationsState.followedVacations[indexToPartialUpdate] = action.payload;
            break;

        case followedVacationsActionType.DeleteFollowedVacation: // Here action.payload is the id of the followedVacation to delete
            const indexToDelete = newFollowedVacationsState.followedVacations.findIndex(p => p.userId === action.payload);
            if (indexToDelete >= 0) {
                newFollowedVacationsState.followedVacations.splice(indexToDelete, 1); // 1 = delete only one item
            }
            break;
    }

    return newFollowedVacationsState;
}
