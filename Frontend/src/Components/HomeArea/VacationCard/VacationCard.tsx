import VacationModel from "../../../Models/VacationModel";
import config from "../../../Utils/Config";
import "./VacationCard.css";
import { Card, Switch } from "@mui/material";
import UserModel from "../../../Models/UserModel";
import followedVacationsService from "../../../Services/FollowedVacationService";
import { useState } from "react";
import { Button, Typography, Box, Modal } from "@mui/material";
import moment from "moment";
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CardMedia from '@mui/material/CardMedia';
import DropdownShareButton from "../DropdownShareButton/DropdownShareButton";
import { NavLink } from "react-router-dom";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: `80%`,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    overflow: `scroll`,
};

interface VacationCardProps {
    vacation: VacationModel;
    user: UserModel;
}

function VacationCard(props: VacationCardProps): JSX.Element {

    const [open, setOpen] = useState(false);
    const [followedByUser, setfollowedByUser] = useState<boolean>(props.vacation.followedByUser);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    async function toggleFollow(): Promise<void> {
        followedByUser ? setfollowedByUser(false) : setfollowedByUser(true);
        try {
            if (followedByUser) {
                await followedVacationsService.deleteFollowedVacation(props.user.id, props.vacation.vacationId);
            }
            else {
                await followedVacationsService.addFollowedVacation(props.user.id, props.vacation.vacationId);
            }

        } catch (err: any) {
            console.log(err.message)
        }
    }

    return (
        <div className="VacationCard">
            <Card sx={{ maxWidth: 345 }}>
                <div>
                    <CardHeader
                        action={
                            <IconButton aria-label="settings">
                                <Button onClick={handleOpen}>
                                    <MoreVertIcon />
                                </Button>
                            </IconButton>
                        }
                        title={props.vacation?.destination}
                    />
                    <Button onClick={handleOpen}>
                        <CardMedia
                            component="img"
                            image={config.urls.vacationImages + props.vacation?.imageName}
                            alt={props.vacation?.imageName}
                        />
                    </Button>
                    <br />
                    <Typography noWrap={true}>{props.vacation.description}</Typography>
                    <br />
                    ${props.vacation.price}
                    <br />
                    <b> Followers: </b>
                    {
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                            {props.vacation.followers ? props.vacation.followers + "😍" : "🙋🏼‍♂️"}
                        </Avatar>
                    }
                    <DropdownShareButton />
                    <br />
                    {followedByUser ? "UnCheck To Unfollow" : "Check To Follow"} <Switch checked={followedByUser} onChange={toggleFollow} />
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                <h2>{props.vacation.destination}</h2>
                                <p>Price: ${props.vacation.price}</p>
                                <p>Followers: {props.vacation.followers}</p>
                                <img src={config.urls.vacationImages + props.vacation?.imageName} alt={props.vacation?.imageName} />
                                <p>{props.vacation.description}</p>
                                <p>{props.vacation.followedByUser}</p>
                                <p> <label >From Date:</label>
                                    {moment(props.vacation.fromDate).format("DD - MM - YYYY")}</p>
                                <p><label >To Date:</label>
                                    {moment(props.vacation.toDate).format("DD - MM - YYYY")}</p>
                                <NavLink to="/about"><Button variant="contained" color="primary" size="medium" disableElevation>Order Vacation</Button></NavLink>
                                <Button onClick={handleClose} autoFocus>
                                    Close
                                </Button>
                            </Typography>
                        </Box>
                    </Modal>

                </div>
            </Card>

        </div>
    );
}

export default VacationCard;
