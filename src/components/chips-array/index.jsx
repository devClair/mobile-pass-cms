import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import TagFacesIcon from "@material-ui/icons/TagFaces";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: theme.spacing(0.5),
    margin: 0,
  },
  chip: {
    margin: theme.spacing(0.5),
    "& .MuiChip-label": {
      // backgroundColor: "red",
      paddingBottom: 2,
    },
  },
}));

export default function ChipsArray(props) {
  const classes = useStyles();
  const { chipData, handleDelete, isEditable, avatar } = props;
  // const [chipData, setChipData] = React.useState([
  //   { key: 0, label: "Angular" },
  //   // { key: 1, label: "jQuery" },
  //   // { key: 2, label: "Polymer" },
  //   // { key: 3, label: "React" },
  //   // { key: 4, label: "Vue.js" },
  // ]);

  // const handleDelete = (chipToDelete) => () => {
  //   console.log({ chipToDelete });
  //   // setChipData((chips) =>
  //   //   chips.filter((chip) => chip.label !== chipToDelete.label)
  //   // );
  // };
  // React.useEffect(() => {
  //   console.log(chipData);
  // }, [chipData]);

  return (
    <>
      {chipData.map((data) => {
        // let icon;

        // if (data.label === "React") {
        //   icon = <TagFacesIcon />;
        // }

        return (
          <Chip
            key={data.key}
            className={classes.chip}
            label={data.label}
            // variant="outlined"
            onDelete={isEditable && handleDelete(data)}
            avatar={avatar && <Avatar src="" />}
          />
          // <Chip
          //     icon={icon}
          //     label={data.label}
          //     onDelete={data.label === 'React' ? undefined : handleDelete(data)}
          //     className={classes.chip}
          //   />
        );
      })}
    </>
  );
}
