import { Pagination } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  ul: {
    "& .MuiPaginationItem-root": {
      color: "#fff",
    },
  },
}));
const CustomPagination = ({ setPage, noOfPages = 10 }) => {
  const classes = useStyles();
  const pageChangeHandler = (page) => {
    setPage(page);
    window.scroll(0, 0);
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        marginTop: 10,
      }}
    >
      <Pagination
        classes={{ ul: classes.ul }}
        count={noOfPages}
        onChange={(e) => pageChangeHandler(e.target.textContent)}
        color="primary"
        hideNextButton
        hidePrevButton
      />
    </div>
  );
};

export default CustomPagination;
