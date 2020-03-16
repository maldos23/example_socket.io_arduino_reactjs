import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardContent, makeStyles, ListItem, ListItemText, List, ListSubheader, ListItemAvatar, Avatar, ExpansionPanel, ExpansionPanelSummary } from '@material-ui/core';
import { SearchRounded, ClearRounded, FirstPageRounded, LastPageRounded, CheckRounded, ChevronLeft, ChevronLeftRounded, ChevronRightRounded, SupervisedUserCircleRounded } from '@material-ui/icons';
import openSocket from 'socket.io-client';
import MaterialTable from 'material-table';
const socket = openSocket(`http://${window.location.hostname}:8080`);

const useStyle = makeStyles(theme => ({
  card:{
    height:"calc(100vh)",
    textAlign:"center",
    background:"linear-gradient(to right, #ee0979, #ff6a00)",
    color:"#FFF"
  },
  list:{
    background:"rgba(255,255,255,0.3)",
    borderRadius:"5px",
    display:"block",
    height:"calc(100vh - 200px)",
    overflowY:"scroll"
  }
}))


function App() {
  const [data, setData] = useState([]);
  const classes = useStyle();

  function onConnetion(){
    socket.on('arduino:data',info => setData(prevState => ([info,...prevState])));
  }

  useEffect(() => onConnetion(),[]);

  return (
    <div className={classes.card}>
        <CardHeader
        title="Ciudad"
        subheader="Mexico city, Mexico"/>
        <CardContent>
          <div className={classes.list}>
          <List>
            <ListSubheader style={{
              color:"#FFF",
              background:"linear-gradient(to right, #8e2de2, #4a00e0)",
              borderRadius:"5px", 
              margin:"10px"}}>
              Ingresos
            </ListSubheader>
            {
              data.map((item,index)=> (
                <ListItem 
                button
                key={index} 
                style={{
                  color:"#FFF",
                  borderBottom:"1px solid #4a00e0"
                  }}>
                  <ListItemAvatar>
                    <Avatar>
                      <img src="https://todoimagenesde.com/wp-content/uploads/2018/03/FondoPantalla21.jpg"/>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={item.entry} secondary={Date(item.date).toString()}/>
                </ListItem>
              ))
            }
          </List>
          </div>
        </CardContent>
    </div>
  );
}

export default App;
