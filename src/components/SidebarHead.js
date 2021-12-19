import React from "react";
import NoSsr from "@material-ui/core/NoSsr";
import GoogleFontLoader from "react-google-font-loader";
import Avatar from "@mui/material/Avatar";
import { Row, Item } from "@mui-treasury/components/flex";
import { Info, InfoTitle, InfoSubtitle } from "@mui-treasury/components/info";
import { useDynamicAvatarStyles } from "@mui-treasury/styles/avatar/dynamic";
import { useTrendInfoStyles } from "@mui-treasury/styles/info/trend";
import { userInfo } from "../services/userInfo";

export const TrendyListItemDemo = React.memo(function TrendyListItem() {
  const avatarStyles = useDynamicAvatarStyles({ size: 48, radius: 6 });
  let user = userInfo();
  user = user !== {} ? user : { user: { name: "", email: "" } };
  return (
    <>
      <NoSsr>
        <GoogleFontLoader fonts={[{ font: "Manrope", weights: [500, 700] }]} />
      </NoSsr>
      <Row gap={3}>
        <Item>
          <Avatar
            variant={"rounded"}
            classes={avatarStyles}
            // src={
            //   "https://imgcache.dealmoon.com/thumbimg.dealmoon.com/dealmoon/923/a5d/cff/399ac7fa0f6e82bf24f9363.jpg_300_300_2_f169.jpg"
            // }
          >
            {user.user ? user.user.name[0] : "U"}
          </Avatar>
        </Item>
        <Info useStyles={useTrendInfoStyles}>
          <InfoTitle>{user.user ? user.user.name : "name"}</InfoTitle>
          <InfoSubtitle>{user.user ? user.user.email : "email"}</InfoSubtitle>
        </Info>
      </Row>
    </>
  );
});
