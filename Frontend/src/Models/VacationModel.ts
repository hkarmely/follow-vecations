class VacationModel {
    public vacationId: number;
    public description: string;
    public destination: string;
    public imageName: string;
    public fromDate: string;
    public toDate: string;
    public price: number;
    public image: FileList; // Frontend uploads an image to Backend
    public followers?: number // calculating and sending followers to the front end
    public followedByUser?: boolean; // calculated in Home component and being send to card
    assigned: any;


}

export default VacationModel;
