import React, { useState, useEffect, useContext } from "react";
import { Auth } from "../context/AuthContext";
import { useHistory } from "react-router-dom";
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { CardActionArea } from "@mui/material";

function Home(props) {
  const { usuario } = useContext(Auth);
  const history = useHistory();
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  useEffect(() => {
    if (usuario === null) {
      history.push("/login");
    }
  }, [history, usuario]);

  return (
    <Container>
      <h1>Home</h1>

      <Grid container spacing={3}>
        <Grid item xs={6} sm={4} md={4}>
          <Card>
            <CardActionArea onClick={() => window.alert("Se clikeo en card")}>
              <CardMedia
                component="img"
                height="140"
                image="https://www.eluniverso.com/resizer/MsTA2hnfrBZEZJCEVC2iwAtET0w=/1115x670/smart/filters:quality(70)/cloudfront-us-east-1.images.arcpublishing.com/eluniverso/GF4REHO2ZRA2XF7WVWKL5JQRVQ.jpg"
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Verduras
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

        <Grid item xs={6} sm={4} md={4}>
          <Card>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image="https://cdn-3.expansion.mx/dims4/default/d09bf08/2147483647/strip/true/crop/1254x836+0+0/resize/1800x1200!/format/webp/quality/90/?url=https%3A%2F%2Fcdn-3.expansion.mx%2Fbf%2F70%2F7fe976134d178e57a12e46a69186%2Fistock-857308908.jpg"
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Carnes
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

        <Grid item xs={6} sm={4} md={4}>
          <Card>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image="https://img.vixdata.io/pd/webp-large/es/sites/default/files/imj/hogartotal/7/7-trucos-para-disfrutar-mas-de-la-cocina-limpiando-menos-7.jpg"
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Limpieza
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

        <Grid item xs={6} sm={4} md={4}>
          <Card>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image="https://cdn2.salud180.com/sites/default/files/metodos-anticonceptivos-y-productos-de-higiene-intima-que-danan-tu-zona-v7.jpg"
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Higiene
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

      </Grid>
    </Container>
  );
}

export default Home;
