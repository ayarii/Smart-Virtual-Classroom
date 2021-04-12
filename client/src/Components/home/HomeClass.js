import React from "react";
import { Container, Grid } from "semantic-ui-react";

import SideBareComponent from "../sideBare/sideBareComponent";

import PrivateRoute from "../../Routes/PrivateRoute";
import GetAllClassComponent from "../Class/GetAllClassComponent";
import AddClassComponent from "../Class/AddUserToClassComponent";
import CalendarComponent from "../Class/CalendarComponent";

const server = process.env.REACT_APP_API_URL || "";
function Home() {
  return (
    <div>
      <Grid celled="internally">
        <Grid.Row>
          <Grid.Column width={3}>
            <SideBareComponent />
          </Grid.Column>
          <Grid.Column width={13}>
            <Container textAlign="center"></Container>
            <br />
            <Grid>
              <Grid.Column width={3}></Grid.Column>
              <Grid.Column width={9}></Grid.Column>
              <Grid.Column width={4}></Grid.Column>
            </Grid>
            <PrivateRoute
              path="/class"
              exact
              component={GetAllClassComponent}
            />
            <PrivateRoute
              path="/schedule"
              exact
              component={CalendarComponent}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}

export default Home;
