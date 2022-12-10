import {
    ManageAccountsOutlined,
    EditOutlined,
    LocationOnOutlined,
    WorkOutlineOutlined
} from "@mui/icons-material";

import { Box, Typography, Divider, useTheme } from "@mui/material";
import UserImage from "../../components/UserImageWidget";
import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";

import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserWidget = ({userId, picturePath}) =>{
    const [user, setUser] = useState(null)
    const {palette} = useTheme()
    const navigate = useNavigate()
    const token = useSelector((state) => state.token);
    const dark = palette.neutral.dark
    const medium = palette.neutral.medium
    const main = palette.neutral.main

    const getUser = async () => {
        const response = await fetch(`http://localhost:3500/users/${userId}`,
          {
            method:"GET",
            headers:{Authorization :`Bearer ${token}`}
          })
          const data = await response.json()
          setUser(data)
    }
    useEffect(() =>{
        getUser()
    }, [])

    if(!user){
        return null;
    }

    const {
        firstname,
        lastname,
        location,
        occupation,
        viewedProfile,
        impressions,
        friends
    } = user
    return(
        <WidgetWrapper>
            <FlexBetween
              gap="0.5rem"
              pb="1.1rem"
                >
                <FlexBetween gap="1rem">
                    <UserImage image={picturePath}></UserImage>
                    <Box
                     onClick={() => navigate(`/profile/${userId}`)}
                    >
                        <Typography 
                          variant="h4"
                          color={dark}
                          fontWeight="500"
                          sx={{
                            "&:hover":{
                                color:palette.primary.dark,
                                cursor:"pointer"
                            }
                          }}>
                            {firstname} {lastname}
                          </Typography>
                          <Typography color={medium}>{friends.length} friends</Typography>
                    </Box>
                    <ManageAccountsOutlined/>
                </FlexBetween>



                <Divider/>
                <Box p="1rem 0">
                    <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
                        <LocationOnOutlined fontSize="large" sx={{color: main}} />
                        <Typography color={medium}>{location}</Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap="1rem">
                        <WorkOutlineOutlined fontSize="large" sx={{color: main}} />
                        <Typography color={medium}>{occupation}</Typography>
                    </Box>
                </Box>


                <Box padding="1rem">
                    <FlexBetween mb="0.5rem">
                        <Typography color={medium}>Profile views</Typography>
                        <Typography color={medium} fontWeight="500">{viewedProfile}</Typography>
                    </FlexBetween>
                    <FlexBetween>
                        <Typography color={medium}>post impressions</Typography>
                        <Typography color={medium} fontWeight="500">{impressions}</Typography>
                    </FlexBetween>
                </Box>


                <Box p="1rem 0">
                    <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
                        social Profile
                    </Typography>
                    <FlexBetween gap="1rem" mb="0.5rem">
                        <FlexBetween gap="1rem">
                            <img src="../assets/twitter.png"alt="twitter"/>
                            <Box>
                                <Typography color={main} fontWeight="500">
                                    Twitter
                                </Typography>
                                <Typography color={medium}>social NetWork</Typography>
                            </Box>
                        </FlexBetween>
                        <EditOutlined sx={{color: main}}/>
                    </FlexBetween>

                    <FlexBetween gap="1rem" mb="0.5rem">
                        <FlexBetween gap="1rem">
                            <img src="../assets/linkedin.png"alt="linkedin"/>
                            <Box>
                                <Typography color={main} fontWeight="500">
                                    linkedIn
                                </Typography>
                                <Typography color={medium}>NetWork Platform</Typography>
                            </Box>
                        </FlexBetween>
                        <EditOutlined sx={{color: main}}/>
                    </FlexBetween>


                </Box>
            </FlexBetween>
        </WidgetWrapper>
    )
}

export default UserWidget